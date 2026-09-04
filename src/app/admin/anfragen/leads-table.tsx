"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Lead = {
  id: string;
  createdAt: string;
  source: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  heatingType: string | null;
  householdSize: number | null;
  message: string | null;
  status: string;
};

const PAGE_SIZE = 25;

const STATUS_OPTIONS = [
  { value: "new", label: "Neu" },
  { value: "contacted", label: "Kontaktiert" },
  { value: "qualified", label: "Qualifiziert" },
  { value: "offer_sent", label: "Offerte gesendet" },
  { value: "won", label: "Gewonnen" },
  { value: "lost", label: "Verloren" },
] as const;

async function apiError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Anfrage fehlgeschlagen (${res.status}).`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const date = d.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date}, ${time}`;
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchPage = useCallback(async (offset: number): Promise<{
    leads: Lead[];
    total: number;
  }> => {
    const res = await fetch(
      `/api/admin/leads?limit=${PAGE_SIZE}&offset=${offset}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error(await apiError(res));
    return (await res.json()) as { leads: Lead[]; total: number };
  }, []);

  const load = useCallback(async () => {
    try {
      const data = await fetchPage(0);
      setLeads(data.leads);
      setTotal(data.total);
      setError(null);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Anfragen konnten nicht geladen werden.";
      toast.error(message);
      setError(message);
    }
  }, [fetchPage]);

  useEffect(() => {
    // Asynchron anstossen, damit kein setState synchron im Effect läuft.
    const t = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(t);
  }, [load]);

  async function loadMore() {
    if (!leads) return;
    setLoadingMore(true);
    try {
      const data = await fetchPage(leads.length);
      setLeads((prev) => [...(prev ?? []), ...data.leads]);
      setTotal(data.total);
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Weitere Anfragen konnten nicht geladen werden.",
      );
    } finally {
      setLoadingMore(false);
    }
  }

  async function updateStatus(lead: Lead, next: string) {
    const previous = lead.status;
    setLeads(
      (prev) =>
        prev?.map((l) => (l.id === lead.id ? { ...l, status: next } : l)) ??
        prev,
    );
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: lead.id, status: next }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Status aktualisiert.");
    } catch (e) {
      setLeads(
        (prev) =>
          prev?.map((l) =>
            l.id === lead.id ? { ...l, status: previous } : l,
          ) ?? prev,
      );
      toast.error(
        e instanceof Error ? e.message : "Status-Änderung fehlgeschlagen.",
      );
    }
  }

  if (error) {
    return (
      <div role="alert" className="neu-in rounded-2xl p-5 text-sm">
        <p className="text-foreground">{error}</p>
        <button
          type="button"
          className="btn-secondary mt-4 min-h-10 px-4"
          onClick={() => {
            setError(null);
            void load();
          }}
        >
          Erneut laden
        </button>
      </div>
    );
  }

  if (leads === null) {
    return (
      <div className="neu-in flex items-center gap-2 rounded-2xl p-5 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden /> Anfragen werden
        geladen …
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <p className="neu-in rounded-2xl p-5 text-sm text-muted-foreground">
        Noch keine Anfragen eingegangen.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">
          {leads.length} von {total} Anfragen
        </span>
      </div>

      <ul>
        {leads.map((lead) => (
          <LeadRow
            key={lead.id}
            lead={lead}
            expanded={expandedId === lead.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === lead.id ? null : lead.id))
            }
            onStatusChange={(next) => void updateStatus(lead, next)}
          />
        ))}
      </ul>

      {leads.length < total && (
        <div>
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={loadingMore}
            className="btn-secondary disabled:pointer-events-none disabled:opacity-60"
          >
            {loadingMore ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden /> Lädt …
              </>
            ) : (
              "Mehr laden"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

const LINK_CLASS =
  "ring-focus rounded-md underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 transition-colors duration-150 hover:text-[color:var(--solar-gold-dark)]";

function LeadRow({
  lead,
  expanded,
  onToggle,
  onStatusChange,
}: {
  lead: Lead;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (next: string) => void;
}) {
  return (
    <li className="neu-sm mb-3 rounded-2xl p-4 text-sm">
      <div className="grid gap-x-6 gap-y-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_auto] lg:items-center">
        {/* Wer */}
        <div className="min-w-0">
          <p className="stat-mono text-xs text-muted-foreground">
            {formatDate(lead.createdAt)}
            {lead.source ? ` · ${lead.source}` : ""}
          </p>
          <p className="mt-1 truncate font-semibold text-foreground">
            {lead.name || "—"}
          </p>
        </div>

        {/* Kontakt */}
        <div className="grid min-w-0 gap-1 text-foreground">
          <a href={`mailto:${lead.email}`} className={`${LINK_CLASS} truncate`}>
            {lead.email}
          </a>
          {lead.phone ? (
            <a
              href={`tel:${lead.phone.replace(/\s+/g, "")}`}
              className={`${LINK_CLASS} stat-mono self-start`}
            >
              {lead.phone}
            </a>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>

        {/* Status + Details */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={lead.status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label={`Status der Anfrage von ${lead.name || lead.email}`}
            className="ring-focus neu-in h-11 min-w-0 flex-1 rounded-xl bg-background px-3 text-sm text-foreground lg:flex-none"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className={
              expanded
                ? "btn-secondary min-h-11 px-4 text-sm shadow-[var(--neu-inset)] hover:translate-y-0"
                : "btn-secondary min-h-11 px-4 text-sm"
            }
          >
            {expanded ? "Schliessen" : "Details"}
          </button>
        </div>
      </div>

      {expanded && (
        <dl className="neu-in mt-4 grid gap-x-8 gap-y-3 rounded-2xl p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="eyebrow">Adresse</dt>
            <dd className="mt-1 text-foreground">{lead.address || "—"}</dd>
          </div>
          <div>
            <dt className="eyebrow">Heizart</dt>
            <dd className="mt-1 text-foreground">
              {lead.heatingType || "—"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Personen im Haushalt</dt>
            <dd className="stat-mono mt-1 text-foreground">
              {lead.householdSize != null ? lead.householdSize : "—"}
            </dd>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <dt className="eyebrow">Nachricht</dt>
            <dd className="mt-1 whitespace-pre-wrap text-foreground">
              {lead.message || "—"}
            </dd>
          </div>
        </dl>
      )}
    </li>
  );
}
