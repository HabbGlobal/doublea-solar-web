"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

type Package = {
  id: string;
  title: string;
  slug: string;
  kwp: number | null;
  targetGroup: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  includedFeatures: string[];
  optionalFeatures: string[];
  sortOrder: number;
};

async function apiError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Anfrage fehlgeschlagen (${res.status}).`;
}

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim().replace(",", ".");
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function linesToList(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function chf(n: number): string {
  return `CHF ${new Intl.NumberFormat("de-CH").format(n)}`;
}

type PackageFormValues = {
  title: string;
  kwp: string;
  targetGroup: string;
  priceFrom: string;
  priceTo: string;
  includedFeatures: string;
  optionalFeatures: string;
};

function emptyValues(): PackageFormValues {
  return {
    title: "",
    kwp: "",
    targetGroup: "",
    priceFrom: "",
    priceTo: "",
    includedFeatures: "",
    optionalFeatures: "",
  };
}

function valuesFromPackage(pkg: Package): PackageFormValues {
  return {
    title: pkg.title,
    kwp: pkg.kwp != null ? String(pkg.kwp) : "",
    targetGroup: pkg.targetGroup ?? "",
    priceFrom: pkg.priceFrom != null ? String(pkg.priceFrom) : "",
    priceTo: pkg.priceTo != null ? String(pkg.priceTo) : "",
    includedFeatures: pkg.includedFeatures.join("\n"),
    optionalFeatures: pkg.optionalFeatures.join("\n"),
  };
}

function payloadFromValues(values: PackageFormValues) {
  return {
    title: values.title.trim(),
    kwp: toNumberOrNull(values.kwp),
    targetGroup: values.targetGroup.trim() || null,
    priceFrom: toNumberOrNull(values.priceFrom),
    priceTo: toNumberOrNull(values.priceTo),
    includedFeatures: linesToList(values.includedFeatures),
    optionalFeatures: linesToList(values.optionalFeatures),
  };
}

function PackageFields({
  idPrefix,
  values,
  onChange,
}: {
  idPrefix: string;
  values: PackageFormValues;
  onChange: (v: PackageFormValues) => void;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-title`}>Titel *</FieldLabel>
          <Input
            id={`${idPrefix}-title`}
            value={values.title}
            onChange={(e) => onChange({ ...values, title: e.target.value })}
            className="h-11"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-kwp`}>Leistung (kWp)</FieldLabel>
          <Input
            id={`${idPrefix}-kwp`}
            type="number"
            min={0}
            step="0.1"
            inputMode="decimal"
            value={values.kwp}
            onChange={(e) => onChange({ ...values, kwp: e.target.value })}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-target`}>Zielgruppe</FieldLabel>
          <Input
            id={`${idPrefix}-target`}
            value={values.targetGroup}
            onChange={(e) =>
              onChange({ ...values, targetGroup: e.target.value })
            }
            className="h-11"
            placeholder="z.B. Einfamilienhaus"
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-price-from`}>Preis von</FieldLabel>
          <Input
            id={`${idPrefix}-price-from`}
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            value={values.priceFrom}
            onChange={(e) => onChange({ ...values, priceFrom: e.target.value })}
            className="h-11"
          />
          <FieldDescription>CHF, Richtpreis inkl. Montage.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-price-to`}>Preis bis</FieldLabel>
          <Input
            id={`${idPrefix}-price-to`}
            type="number"
            min={0}
            step="1"
            inputMode="numeric"
            value={values.priceTo}
            onChange={(e) => onChange({ ...values, priceTo: e.target.value })}
            className="h-11"
          />
          <FieldDescription>CHF, Richtpreis inkl. Montage.</FieldDescription>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-included`}>
            Leistungspunkte
          </FieldLabel>
          <Textarea
            id={`${idPrefix}-included`}
            rows={5}
            value={values.includedFeatures}
            onChange={(e) =>
              onChange({ ...values, includedFeatures: e.target.value })
            }
          />
          <FieldDescription>Eine Zeile pro Punkt.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-optional`}>Optionen</FieldLabel>
          <Textarea
            id={`${idPrefix}-optional`}
            rows={5}
            value={values.optionalFeatures}
            onChange={(e) =>
              onChange({ ...values, optionalFeatures: e.target.value })
            }
          />
          <FieldDescription>Eine Zeile pro Option.</FieldDescription>
        </Field>
      </div>
    </>
  );
}

function NewPackageForm({
  nextSortOrder,
  onCreated,
}: {
  nextSortOrder: number;
  onCreated: () => Promise<void>;
}) {
  const [values, setValues] = useState<PackageFormValues>(emptyValues());
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.title.trim()) {
      toast.error("Titel ist ein Pflichtfeld.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payloadFromValues(values),
          sortOrder: nextSortOrder,
        }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Paket angelegt.");
      setValues(emptyValues());
      await onCreated();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Anlegen fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="surface-glass">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-foreground">Neues Paket</h2>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 px-5 py-6 sm:px-6">
        <PackageFields idPrefix="pkg-new" values={values} onChange={setValues} />
        <div>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:pointer-events-none disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden /> Speichere …
              </>
            ) : (
              <>
                <Plus className="size-4" aria-hidden /> Paket anlegen
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function EditPackageForm({
  pkg,
  onSaved,
  onCancel,
}: {
  pkg: Package;
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<PackageFormValues>(
    valuesFromPackage(pkg),
  );
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.title.trim()) {
      toast.error("Titel ist ein Pflichtfeld.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pkg.id, ...payloadFromValues(values) }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Paket gespeichert.");
      await onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 border-t border-dashed border-border bg-secondary/50 px-4 py-5"
    >
      <PackageFields
        idPrefix={`pkg-edit-${pkg.id}`}
        values={values}
        onChange={setValues}
      />
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:pointer-events-none disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Speichere …
            </>
          ) : (
            "Speichern"
          )}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Abbrechen
        </button>
      </div>
    </form>
  );
}

export function PaketeEditor() {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/packages", { cache: "no-store" });
      if (!res.ok) throw new Error(await apiError(res));
      const data = (await res.json()) as { packages: Package[] };
      setPackages(
        [...data.packages].sort((a, b) => a.sortOrder - b.sortOrder),
      );
      setError(null);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Pakete konnten nicht geladen werden.";
      toast.error(message);
      setError(message);
    }
  }, []);

  useEffect(() => {
    // Asynchron anstossen, damit kein setState synchron im Effect läuft.
    const t = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(t);
  }, [load]);

  async function move(pkg: Package, dir: -1 | 1) {
    if (!packages) return;
    const idx = packages.findIndex((p) => p.id === pkg.id);
    if (idx < 0 || !packages[idx + dir]) return;

    // Ziel-Reihenfolge bilden, dann ALLE Einträge index-basiert neu
    // nummerieren — robust auch bei doppelten sortOrder-Werten.
    const reordered = [...packages];
    [reordered[idx], reordered[idx + dir]] = [
      reordered[idx + dir],
      reordered[idx],
    ];
    const renumbered = reordered.map((p, i) => ({ ...p, sortOrder: i }));
    const changed = renumbered.filter(
      (p, i) => p.sortOrder !== reordered[i].sortOrder,
    );

    setPackages(renumbered);

    try {
      const responses = await Promise.all(
        changed.map((p) =>
          fetch("/api/admin/packages", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: p.id, sortOrder: p.sortOrder }),
          }),
        ),
      );
      for (const res of responses) {
        if (!res.ok) throw new Error(await apiError(res));
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Sortierung fehlgeschlagen.",
      );
      await load();
    }
  }

  async function remove(pkg: Package) {
    if (!window.confirm("Paket wirklich löschen?")) return;
    setBusyId(pkg.id);
    try {
      const res = await fetch(
        `/api/admin/packages?id=${encodeURIComponent(pkg.id)}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error(await apiError(res));
      setPackages((prev) => prev?.filter((p) => p.id !== pkg.id) ?? prev);
      toast.success("Paket gelöscht.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Löschen fehlgeschlagen.");
    } finally {
      setBusyId(null);
    }
  }

  const nextSortOrder =
    packages && packages.length > 0
      ? Math.max(...packages.map((p) => p.sortOrder)) + 1
      : 0;

  return (
    <div className="grid gap-10">
      <div className="border border-border bg-secondary px-4 py-3">
        <p className="eyebrow">Hinweis</p>
        <p className="mt-1 text-sm text-foreground">
          Sind hier Pakete erfasst, ersetzen sie die Standard-Pakete auf /pakete
          vollständig.
        </p>
      </div>

      <NewPackageForm nextSortOrder={nextSortOrder} onCreated={load} />

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pakete</h2>
          {packages && (
            <span className="eyebrow">
              {packages.length} {packages.length === 1 ? "Eintrag" : "Einträge"}
            </span>
          )}
        </div>

        {error ? (
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
        ) : packages === null ? (
          <div className="flex items-center gap-2 border-t border-border py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden /> Pakete
            werden geladen …
          </div>
        ) : packages.length === 0 ? (
          <p className="border-y border-border py-6 text-sm text-muted-foreground">
            Noch keine Pakete erfasst — auf /pakete gelten die Standard-Pakete.
          </p>
        ) : (
          <ul>
            {packages.map((p, i) => (
              <li
                key={p.id}
                className="border-t border-border transition-colors duration-150 last:border-b hover:bg-card"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-2 py-4 sm:px-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {p.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.kwp != null ? `${p.kwp} kWp` : "kWp offen"}
                      {p.targetGroup ? ` · ${p.targetGroup}` : ""}
                      {p.priceFrom != null && p.priceTo != null
                        ? ` · ${chf(p.priceFrom)} – ${chf(p.priceTo)}`
                        : p.priceFrom != null
                          ? ` · ab ${chf(p.priceFrom)}`
                          : ""}
                      {` · ${p.includedFeatures.length} Leistungspunkte`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void move(p, -1)}
                      disabled={i === 0}
                      aria-label={`${p.title} nach oben verschieben`}
                      className="ring-focus inline-flex size-8 items-center justify-center border border-border text-sm text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => void move(p, 1)}
                      disabled={i === packages.length - 1}
                      aria-label={`${p.title} nach unten verschieben`}
                      className="ring-focus inline-flex size-8 items-center justify-center border border-border text-sm text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingId((prev) => (prev === p.id ? null : p.id))
                      }
                      className="ring-focus inline-flex h-8 items-center border border-border px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
                    >
                      {editingId === p.id ? "Schliessen" : "Bearbeiten"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(p)}
                      disabled={busyId === p.id}
                      className="ring-focus inline-flex h-8 items-center gap-1 border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                    >
                      {busyId === p.id ? (
                        <Loader2 className="size-3.5 animate-spin" aria-hidden />
                      ) : (
                        <Trash2 className="size-3.5" aria-hidden />
                      )}
                      Löschen
                    </button>
                  </div>
                </div>
                {editingId === p.id && (
                  <EditPackageForm
                    pkg={p}
                    onSaved={async () => {
                      setEditingId(null);
                      await load();
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
