"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

/** Weich erhabener Icon-Knopf (Sortieren, Bearbeiten, Löschen). */
const ICON_BUTTON =
  "ring-focus neu-sm inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-[box-shadow,color] duration-150 hover:text-foreground active:shadow-[var(--neu-inset)] disabled:pointer-events-none disabled:opacity-40";

type Stat = { label: string; value: string };

type Package = {
  id: string;
  title: string;
  slug: string;
  kwp: number | null;
  targetGroup: string | null;
  summary: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  stats: Stat[];
  includedFeatures: string[];
  optionalFeatures: string[];
  isFeatured: boolean;
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
  summary: string;
  priceFrom: string;
  priceTo: string;
  stats: Stat[];
  includedFeatures: string;
  optionalFeatures: string;
  isFeatured: boolean;
};

function emptyValues(): PackageFormValues {
  return {
    title: "",
    kwp: "",
    targetGroup: "",
    summary: "",
    priceFrom: "",
    priceTo: "",
    stats: [],
    includedFeatures: "",
    optionalFeatures: "",
    isFeatured: false,
  };
}

function valuesFromPackage(pkg: Package): PackageFormValues {
  return {
    title: pkg.title,
    kwp: pkg.kwp != null ? String(pkg.kwp) : "",
    targetGroup: pkg.targetGroup ?? "",
    summary: pkg.summary ?? "",
    priceFrom: pkg.priceFrom != null ? String(pkg.priceFrom) : "",
    priceTo: pkg.priceTo != null ? String(pkg.priceTo) : "",
    stats: pkg.stats.map((s) => ({ label: s.label, value: s.value })),
    includedFeatures: pkg.includedFeatures.join("\n"),
    optionalFeatures: pkg.optionalFeatures.join("\n"),
    isFeatured: pkg.isFeatured,
  };
}

/** Leere Zeilen werden verworfen, damit keine halben Eckwerte in die DB gelangen. */
function cleanStats(stats: Stat[]): Stat[] {
  return stats
    .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
    .filter((s) => s.label !== "" || s.value !== "");
}

function payloadFromValues(values: PackageFormValues) {
  return {
    title: values.title.trim(),
    kwp: toNumberOrNull(values.kwp),
    targetGroup: values.targetGroup.trim() || null,
    summary: values.summary.trim() || null,
    priceFrom: toNumberOrNull(values.priceFrom),
    priceTo: toNumberOrNull(values.priceTo),
    stats: cleanStats(values.stats),
    includedFeatures: linesToList(values.includedFeatures),
    optionalFeatures: linesToList(values.optionalFeatures),
    isFeatured: values.isFeatured,
  };
}

/* ---------- Englische Fassung (über /api/admin/i18n, Rückfall auf Deutsch) ---------- */

/** Gespeicherte englische Felder eines Pakets — leer = deutscher Wert. */
type PackageI18n = {
  title?: string;
  targetGroup?: string;
  summary?: string;
  stats?: Stat[];
  includedFeatures?: string[];
  optionalFeatures?: string[];
};

type PackageI18nMap = Record<string, PackageI18n>;

type PackageEnValues = {
  title: string;
  targetGroup: string;
  summary: string;
  stats: Stat[];
  includedFeatures: string;
  optionalFeatures: string;
};

function emptyEnValues(): PackageEnValues {
  return {
    title: "",
    targetGroup: "",
    summary: "",
    stats: [],
    includedFeatures: "",
    optionalFeatures: "",
  };
}

function enValuesFromI18n(e: PackageI18n | undefined): PackageEnValues {
  if (!e) return emptyEnValues();
  return {
    title: e.title ?? "",
    targetGroup: e.targetGroup ?? "",
    summary: e.summary ?? "",
    stats: (e.stats ?? []).map((s) => ({ label: s.label, value: s.value })),
    includedFeatures: (e.includedFeatures ?? []).join("\n"),
    optionalFeatures: (e.optionalFeatures ?? []).join("\n"),
  };
}

/** Payload für PATCH /api/admin/i18n — leere Felder löschen die Übersetzung. */
function enPayload(values: PackageEnValues): PackageI18n {
  return {
    title: values.title.trim(),
    targetGroup: values.targetGroup.trim(),
    summary: values.summary.trim(),
    stats: cleanStats(values.stats),
    includedFeatures: linesToList(values.includedFeatures),
    optionalFeatures: linesToList(values.optionalFeatures),
  };
}

function hasEnContent(values: PackageEnValues): boolean {
  const p = enPayload(values);
  return Boolean(
    p.title ||
      p.targetGroup ||
      p.summary ||
      (p.stats && p.stats.length > 0) ||
      (p.includedFeatures && p.includedFeatures.length > 0) ||
      (p.optionalFeatures && p.optionalFeatures.length > 0),
  );
}

async function savePackageEn(id: string, values: PackageEnValues): Promise<void> {
  const res = await fetch("/api/admin/i18n", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "packages", id, fields: enPayload(values) }),
  });
  if (!res.ok) throw new Error(await apiError(res));
}

/** Dynamische Label/Wert-Liste für die Eckwerte eines Pakets. */
function StatRows({
  idPrefix,
  stats,
  onChange,
}: {
  idPrefix: string;
  stats: Stat[];
  onChange: (next: Stat[]) => void;
}) {
  return (
    <div className="grid gap-2">
      {stats.map((stat, index) => (
        <div
          // Eckwerte haben keine ID; der Index ist hier der stabile Schlüssel.
          key={index}
          className="flex flex-wrap items-center gap-2"
        >
          <Input
            id={`${idPrefix}-stat-label-${index}`}
            aria-label={`Eckwert ${index + 1} – Bezeichnung`}
            value={stat.label}
            onChange={(e) =>
              onChange(
                stats.map((s, i) =>
                  i === index ? { ...s, label: e.target.value } : s,
                ),
              )
            }
            className="h-11 min-w-0 flex-1"
            placeholder="z.B. Amortisation"
          />
          <Input
            id={`${idPrefix}-stat-value-${index}`}
            aria-label={`Eckwert ${index + 1} – Wert`}
            value={stat.value}
            onChange={(e) =>
              onChange(
                stats.map((s, i) =>
                  i === index ? { ...s, value: e.target.value } : s,
                ),
              )
            }
            className="h-11 min-w-0 flex-1"
            placeholder="z.B. 9–12 Jahre"
          />
          <button
            type="button"
            aria-label={`Eckwert ${index + 1} entfernen`}
            onClick={() => onChange(stats.filter((_, i) => i !== index))}
            className={cn(ICON_BUTTON, "size-11 hover:text-destructive")}
          >
            <Trash2 className="size-4" aria-hidden />
          </button>
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={() => onChange([...stats, { label: "", value: "" }])}
          className="btn-secondary min-h-10 px-4"
        >
          Eckwert hinzufügen
        </button>
      </div>
    </div>
  );
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
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-summary`}>
          Zusammenfassung
        </FieldLabel>
        <Textarea
          id={`${idPrefix}-summary`}
          rows={2}
          value={values.summary}
          onChange={(e) => onChange({ ...values, summary: e.target.value })}
        />
        <FieldDescription>
          Ein bis zwei Sätze, die das Paket einordnen.
        </FieldDescription>
      </Field>
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
      <Field>
        <FieldTitle>Eckwerte</FieldTitle>
        <StatRows
          idPrefix={idPrefix}
          stats={values.stats}
          onChange={(stats) => onChange({ ...values, stats })}
        />
        <FieldDescription>
          Je Zeile ein Label/Wert-Paar, z.B. «Amortisation» / «9–12 Jahre».
        </FieldDescription>
      </Field>
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
      <div className="flex items-center gap-3">
        <Switch
          id={`${idPrefix}-featured`}
          checked={values.isFeatured}
          onCheckedChange={(checked) =>
            onChange({ ...values, isFeatured: checked === true })
          }
        />
        <label
          htmlFor={`${idPrefix}-featured`}
          className="text-sm font-medium text-foreground"
        >
          Meistgewählt hervorheben
        </label>
      </div>
    </>
  );
}

/** Aufklappbarer Block «Englische Fassung» — Platzhalter = deutscher Wert. */
function PackageEnglishFields({
  idPrefix,
  de,
  values,
  onChange,
  open,
  onToggle,
}: {
  idPrefix: string;
  de: PackageFormValues;
  values: PackageEnValues;
  onChange: (v: PackageEnValues) => void;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `${idPrefix}-en-panel`;
  return (
    <div className="neu-sm rounded-2xl p-4 sm:p-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="ring-focus flex w-full items-center justify-between gap-3 rounded-xl text-left"
      >
        <span className="min-w-0">
          <span className="block text-sm font-medium text-foreground">
            Englische Fassung
          </span>
          <span className="block text-xs text-muted-foreground">
            Leer lassen = deutscher Text wird auf /en angezeigt.
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div id={panelId} className="mt-4 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${idPrefix}-en-title`}>Titel</FieldLabel>
              <Input
                id={`${idPrefix}-en-title`}
                value={values.title}
                onChange={(e) => onChange({ ...values, title: e.target.value })}
                className="h-11"
                placeholder={de.title}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${idPrefix}-en-target`}>Zielgruppe</FieldLabel>
              <Input
                id={`${idPrefix}-en-target`}
                value={values.targetGroup}
                onChange={(e) =>
                  onChange({ ...values, targetGroup: e.target.value })
                }
                className="h-11"
                placeholder={de.targetGroup || "z.B. Single-family home"}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-en-summary`}>
              Zusammenfassung
            </FieldLabel>
            <Textarea
              id={`${idPrefix}-en-summary`}
              rows={2}
              value={values.summary}
              onChange={(e) => onChange({ ...values, summary: e.target.value })}
              placeholder={de.summary}
            />
          </Field>
          <Field>
            <FieldTitle>Eckwerte</FieldTitle>
            <StatRows
              idPrefix={`${idPrefix}-en`}
              stats={values.stats}
              onChange={(stats) => onChange({ ...values, stats })}
            />
            <FieldDescription>
              Englische Label/Wert-Paare. Keine Zeilen = deutsche Eckwerte
              werden angezeigt.
            </FieldDescription>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${idPrefix}-en-included`}>
                Leistungspunkte
              </FieldLabel>
              <Textarea
                id={`${idPrefix}-en-included`}
                rows={5}
                value={values.includedFeatures}
                onChange={(e) =>
                  onChange({ ...values, includedFeatures: e.target.value })
                }
                placeholder={de.includedFeatures}
              />
              <FieldDescription>Eine Zeile pro Punkt.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor={`${idPrefix}-en-optional`}>Optionen</FieldLabel>
              <Textarea
                id={`${idPrefix}-en-optional`}
                rows={5}
                value={values.optionalFeatures}
                onChange={(e) =>
                  onChange({ ...values, optionalFeatures: e.target.value })
                }
                placeholder={de.optionalFeatures}
              />
              <FieldDescription>Eine Zeile pro Option.</FieldDescription>
            </Field>
          </div>
        </div>
      )}
    </div>
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
  const [en, setEn] = useState<PackageEnValues>(emptyEnValues());
  const [enOpen, setEnOpen] = useState(false);
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
      // Englische Fassung erst mit der neuen id speichern — Fehler hier
      // lassen das bereits angelegte Paket bestehen.
      if (hasEnContent(en)) {
        const created = (await res.json().catch(() => null)) as {
          package?: { id?: string };
        } | null;
        const newId = created?.package?.id;
        if (newId) {
          try {
            await savePackageEn(newId, en);
          } catch (err) {
            toast.error(
              err instanceof Error
                ? `Englische Fassung nicht gespeichert: ${err.message}`
                : "Englische Fassung nicht gespeichert.",
            );
          }
        } else {
          toast.error(
            "Englische Fassung nicht gespeichert — bitte beim Paket nachtragen.",
          );
        }
      }
      setValues(emptyValues());
      setEn(emptyEnValues());
      setEnOpen(false);
      await onCreated();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Anlegen fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="neu p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground">Neues Paket</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <PackageFields idPrefix="pkg-new" values={values} onChange={setValues} />
        <PackageEnglishFields
          idPrefix="pkg-new"
          de={values}
          values={en}
          onChange={setEn}
          open={enOpen}
          onToggle={() => setEnOpen((o) => !o)}
        />
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
  enInitial,
  onSaved,
  onCancel,
}: {
  pkg: Package;
  /** Bereits gespeicherte englische Fassung (undefined = keine). */
  enInitial: PackageI18n | undefined;
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<PackageFormValues>(
    valuesFromPackage(pkg),
  );
  const [en, setEn] = useState<PackageEnValues>(enValuesFromI18n(enInitial));
  // Mit Inhalt direkt aufgeklappt, damit die Übersetzung sichtbar ist.
  const [enOpen, setEnOpen] = useState(() => hasEnContent(enValuesFromI18n(enInitial)));
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
      // Englische Fassung separat — nur wenn geändert (leer = löschen).
      const enBefore = JSON.stringify(enPayload(enValuesFromI18n(enInitial)));
      if (JSON.stringify(enPayload(en)) !== enBefore) {
        await savePackageEn(pkg.id, en);
      }
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
      className="neu-in mt-4 grid gap-4 rounded-2xl p-4 sm:p-5"
    >
      <PackageFields
        idPrefix={`pkg-edit-${pkg.id}`}
        values={values}
        onChange={setValues}
      />
      <PackageEnglishFields
        idPrefix={`pkg-edit-${pkg.id}`}
        de={values}
        values={en}
        onChange={setEn}
        open={enOpen}
        onToggle={() => setEnOpen((o) => !o)}
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
  // Englische Fassungen je Paket (aus /api/admin/i18n).
  const [i18n, setI18n] = useState<PackageI18nMap>({});

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

  const loadI18n = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/i18n", { cache: "no-store" });
      if (!res.ok) throw new Error(await apiError(res));
      const data = (await res.json()) as {
        i18n?: { packages?: PackageI18nMap };
      };
      setI18n(data.i18n?.packages ?? {});
    } catch (e) {
      toast.error(
        e instanceof Error
          ? `Englische Fassungen nicht geladen: ${e.message}`
          : "Englische Fassungen konnten nicht geladen werden.",
      );
    }
  }, []);

  /** Pakete und englische Fassungen gemeinsam neu laden. */
  const reloadAll = useCallback(async () => {
    await Promise.all([load(), loadI18n()]);
  }, [load, loadI18n]);

  useEffect(() => {
    // Asynchron anstossen, damit kein setState synchron im Effect läuft.
    const t = setTimeout(() => {
      void reloadAll();
    }, 0);
    return () => clearTimeout(t);
  }, [reloadAll]);

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
      <div className="neu-in rounded-2xl p-5">
        <p className="eyebrow">Hinweis</p>
        <p className="mt-1 text-sm text-foreground">
          Sind hier Pakete erfasst, ersetzen sie die Standard-Pakete auf /pakete
          vollständig. Diese Angaben erscheinen 1:1 auf der Seite Pakete &
          Preise.
        </p>
      </div>

      <NewPackageForm nextSortOrder={nextSortOrder} onCreated={reloadAll} />

      <section>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Pakete</h2>
          {packages && (
            <span className="eyebrow">
              {packages.length} {packages.length === 1 ? "Eintrag" : "Einträge"}
            </span>
          )}
        </div>

        {error ? (
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
        ) : packages === null ? (
          <div className="neu-in flex items-center gap-2 rounded-2xl p-5 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden /> Pakete
            werden geladen …
          </div>
        ) : packages.length === 0 ? (
          <p className="neu-in rounded-2xl p-5 text-sm text-muted-foreground">
            Noch keine Pakete erfasst — auf /pakete gelten die Standard-Pakete.
          </p>
        ) : (
          <ul>
            {packages.map((p, i) => (
              <li key={p.id} className="neu-sm mb-3 rounded-2xl p-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
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
                      {p.isFeatured ? " · Meistgewählt" : ""}
                      {i18n[p.id] ? " · EN gepflegt" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void move(p, -1)}
                      disabled={i === 0}
                      aria-label={`${p.title} nach oben verschieben`}
                      className={ICON_BUTTON}
                    >
                      <ArrowUp className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => void move(p, 1)}
                      disabled={i === packages.length - 1}
                      aria-label={`${p.title} nach unten verschieben`}
                      className={ICON_BUTTON}
                    >
                      <ArrowDown className="size-4" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingId((prev) => (prev === p.id ? null : p.id))
                      }
                      aria-label={
                        editingId === p.id
                          ? `Bearbeitung von ${p.title} schliessen`
                          : `${p.title} bearbeiten`
                      }
                      aria-expanded={editingId === p.id}
                      className={cn(
                        ICON_BUTTON,
                        editingId === p.id &&
                          "shadow-[var(--neu-inset)] text-[color:var(--solar-gold-dark)]",
                      )}
                    >
                      {editingId === p.id ? (
                        <X className="size-4" aria-hidden />
                      ) : (
                        <Pencil className="size-4" aria-hidden />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(p)}
                      disabled={busyId === p.id}
                      aria-label={`${p.title} löschen`}
                      className={cn(ICON_BUTTON, "hover:text-destructive")}
                    >
                      {busyId === p.id ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                      ) : (
                        <Trash2 className="size-4" aria-hidden />
                      )}
                    </button>
                  </div>
                </div>
                {editingId === p.id && (
                  <EditPackageForm
                    pkg={p}
                    enInitial={i18n[p.id]}
                    onSaved={async () => {
                      setEditingId(null);
                      await reloadAll();
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
