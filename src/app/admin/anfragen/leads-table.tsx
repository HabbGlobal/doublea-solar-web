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
      <div
        role="alert"
        className="border-l-2 border-[color:var(--destructive)] bg-secondary p-4 text-sm"
      >
        <p className="text-foreground">{error}</p>
        <button
          type="button"
          className="btn-secondary mt-3 min-h-10 px-4"
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
      <div className="flex items-center gap-2 border-t border-border py-6 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden /> Anfragen werden
        geladen …
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <p className="border-y border-border py-6 text-sm text-muted-foreground">
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

      <div className="surface-glass overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium">
                Datum
              </th>
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium">
                Name
              </th>
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium">
                E-Mail
              </th>
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium">
                Telefon
              </th>
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium">
                Quelle
              </th>
              <th scope="col" className="eyebrow px-3 py-3 text-left font-medium">
                Status
              </th>
              <th scope="col" className="px-3 py-3">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>

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
    <>
      <tr className="border-t border-border align-middle transition-colors duration-150 hover:bg-secondary">
        <td className="stat-mono whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
          {formatDate(lead.createdAt)}
        </td>
        <td className="px-3 py-3 font-medium text-foreground">
          {lead.name || "—"}
        </td>
        <td className="px-3 py-3">
          <a
            href={`mailto:${lead.email}`}
            className="ring-focus underline decoration-[color:var(--solar-line)] underline-offset-4 transition-colors duration-150 hover:decoration-[color:var(--solar-ink)]"
          >
            {lead.email}
          </a>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          {lead.phone ? (
            <a
              href={`tel:${lead.phone.replace(/\s+/g, "")}`}
              className="ring-focus underline decoration-[color:var(--solar-line)] underline-offset-4 transition-colors duration-150 hover:decoration-[color:var(--solar-ink)]"
            >
              {lead.phone}
            </a>
          ) : (
            "—"
          )}
        </td>
        <td className="px-3 py-3 text-xs text-muted-foreground">
          {lead.source || "—"}
        </td>
        <td className="px-3 py-3">
          <select
            value={lead.status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label={`Status der Anfrage von ${lead.name || lead.email}`}
            className="ring-focus h-9 border border-input bg-card px-2 text-xs text-foreground"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </td>
        <td className="px-3 py-3 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="ring-focus inline-flex h-8 items-center border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
          >
            {expanded ? "Schliessen" : "Details"}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-t border-dashed border-border bg-secondary/60">
          <td colSpan={7} className="px-3 py-4">
            <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
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
          </td>
        </tr>
      )}
    </>
  );
}
