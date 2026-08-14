"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel } from "@/components/ui/field";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  kwp: number | null;
  storageKwh: number | null;
  annualProduction: number | null;
  selfConsumption: number | null;
  description: string | null;
  images: string[];
  isPublic: boolean;
  sortOrder: number;
};

const CATEGORIES = [
  { value: "efh", label: "Einfamilienhaus" },
  { value: "mfh_zev", label: "Mehrfamilienhaus / ZEV" },
  { value: "gewerbe", label: "Gewerbe" },
  { value: "landwirtschaft", label: "Landwirtschaft" },
  { value: "nachruestung", label: "Nachrüstung" },
  { value: "erweiterung", label: "Erweiterung" },
] as const;

function categoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

function imageUrl(path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/site-images/${path}`;
}

async function apiError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null;
  return data?.error || `Anfrage fehlgeschlagen (${res.status}).`;
}

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", "projects");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error(await apiError(res));
  const data = (await res.json()) as { path: string };
  return data.path;
}

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim().replace(",", ".");
  if (trimmed === "") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

function ImageField({
  id,
  label,
  file,
  onSelect,
  currentPath,
}: {
  id: string;
  label: string;
  file: File | null;
  onSelect: (f: File | null) => void;
  currentPath?: string | null;
}) {
  // Objekt-URL abgeleitet statt als State — vermeidet setState im Effect.
  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const shown = preview ?? (currentPath ? imageUrl(currentPath) : null);

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex items-center gap-3">
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shown}
            alt="Bildvorschau"
            className="h-16 w-20 shrink-0 border border-border object-cover"
          />
        ) : (
          <div className="flex h-16 w-20 shrink-0 items-center justify-center border border-border bg-secondary">
            <Upload className="size-4 text-muted-foreground" aria-hidden />
          </div>
        )}
        <input
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > MAX_UPLOAD_BYTES) {
              toast.error(
                "Bild ist zu gross (max. 4 MB). Bitte verkleinern und erneut wählen.",
              );
              e.target.value = "";
              onSelect(null);
              return;
            }
            onSelect(f);
          }}
          className="ring-focus w-full max-w-xs text-sm text-muted-foreground file:mr-3 file:border file:border-solid file:border-border file:bg-card file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-foreground"
        />
      </div>
    </div>
  );
}

/** Gemeinsame Formularfelder für Neu + Bearbeiten. */
type ProjectFormValues = {
  title: string;
  category: string;
  location: string;
  kwp: string;
  storageKwh: string;
  description: string;
};

function emptyValues(): ProjectFormValues {
  return {
    title: "",
    category: "efh",
    location: "",
    kwp: "",
    storageKwh: "",
    description: "",
  };
}

function ProjectFields({
  idPrefix,
  values,
  onChange,
}: {
  idPrefix: string;
  values: ProjectFormValues;
  onChange: (v: ProjectFormValues) => void;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
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
          <FieldLabel htmlFor={`${idPrefix}-category`}>Kategorie</FieldLabel>
          <select
            id={`${idPrefix}-category`}
            value={values.category}
            onChange={(e) => onChange({ ...values, category: e.target.value })}
            className="ring-focus h-11 w-full border border-input bg-card px-3 text-sm text-foreground"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-location`}>Region / Ort</FieldLabel>
          <Input
            id={`${idPrefix}-location`}
            value={values.location}
            onChange={(e) => onChange({ ...values, location: e.target.value })}
            className="h-11"
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
          <FieldLabel htmlFor={`${idPrefix}-storage`}>Speicher (kWh)</FieldLabel>
          <Input
            id={`${idPrefix}-storage`}
            type="number"
            min={0}
            step="0.1"
            inputMode="decimal"
            value={values.storageKwh}
            onChange={(e) => onChange({ ...values, storageKwh: e.target.value })}
            className="h-11"
          />
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-description`}>Beschreibung</FieldLabel>
        <Textarea
          id={`${idPrefix}-description`}
          rows={4}
          value={values.description}
          onChange={(e) => onChange({ ...values, description: e.target.value })}
        />
      </Field>
    </>
  );
}

function NewProjectForm({
  nextSortOrder,
  onCreated,
}: {
  nextSortOrder: number;
  onCreated: () => Promise<void>;
}) {
  const [values, setValues] = useState<ProjectFormValues>(emptyValues());
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.title.trim()) {
      toast.error("Titel ist ein Pflichtfeld.");
      return;
    }
    setSaving(true);
    try {
      let imagePath: string | undefined;
      if (file) imagePath = await uploadImage(file);
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title.trim(),
          category: values.category,
          location: values.location.trim() || null,
          kwp: toNumberOrNull(values.kwp),
          storageKwh: toNumberOrNull(values.storageKwh),
          description: values.description.trim() || null,
          images: imagePath ? [imagePath] : [],
          isPublic: false,
          sortOrder: nextSortOrder,
        }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Projekt angelegt (noch als Entwurf).");
      setValues(emptyValues());
      setFile(null);
      setFileKey((k) => k + 1);
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
        <h2 className="text-lg font-semibold text-foreground">Neues Projekt</h2>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 px-5 py-6 sm:px-6">
        <ProjectFields idPrefix="proj-new" values={values} onChange={setValues} />
        <ImageField
          key={fileKey}
          id="proj-new-image"
          label="Projektbild (JPG, PNG oder WebP, max. 4 MB)"
          file={file}
          onSelect={setFile}
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
                <Plus className="size-4" aria-hidden /> Projekt anlegen
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function EditProjectForm({
  project,
  onSaved,
  onCancel,
}: {
  project: Project;
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<ProjectFormValues>({
    title: project.title,
    category: project.category,
    location: project.location ?? "",
    kwp: project.kwp != null ? String(project.kwp) : "",
    storageKwh: project.storageKwh != null ? String(project.storageKwh) : "",
    description: project.description ?? "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.title.trim()) {
      toast.error("Titel ist ein Pflichtfeld.");
      return;
    }
    setSaving(true);
    try {
      let images: string[] | undefined;
      if (file) {
        const newPath = await uploadImage(file);
        // Erstes Bild ersetzen, weitere bestehende Pfade erhalten.
        images = [newPath, ...project.images.slice(1)];
      }
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          title: values.title.trim(),
          category: values.category,
          location: values.location.trim() || null,
          kwp: toNumberOrNull(values.kwp),
          storageKwh: toNumberOrNull(values.storageKwh),
          description: values.description.trim() || null,
          ...(images ? { images } : {}),
        }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Projekt gespeichert.");
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
      <ProjectFields
        idPrefix={`proj-edit-${project.id}`}
        values={values}
        onChange={setValues}
      />
      <ImageField
        id={`proj-edit-image-${project.id}`}
        label="Projektbild ersetzen (optional)"
        file={file}
        onSelect={setFile}
        currentPath={project.images[0] ?? null}
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

export function ProjekteEditor() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/projects", { cache: "no-store" });
      if (!res.ok) throw new Error(await apiError(res));
      const data = (await res.json()) as { projects: Project[] };
      setProjects(
        [...data.projects].sort((a, b) => a.sortOrder - b.sortOrder),
      );
      setError(null);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Projekte konnten nicht geladen werden.";
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

  async function togglePublic(project: Project, next: boolean) {
    setProjects(
      (prev) =>
        prev?.map((p) =>
          p.id === project.id ? { ...p, isPublic: next } : p,
        ) ?? prev,
    );
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id, isPublic: next }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success(
        next ? "Projekt veröffentlicht." : "Projekt auf Entwurf gesetzt.",
      );
    } catch (e) {
      setProjects(
        (prev) =>
          prev?.map((p) =>
            p.id === project.id ? { ...p, isPublic: !next } : p,
          ) ?? prev,
      );
      toast.error(e instanceof Error ? e.message : "Änderung fehlgeschlagen.");
    }
  }

  async function move(project: Project, dir: -1 | 1) {
    if (!projects) return;
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx < 0 || !projects[idx + dir]) return;

    // Ziel-Reihenfolge bilden, dann ALLE Einträge index-basiert neu
    // nummerieren — robust auch bei doppelten sortOrder-Werten.
    const reordered = [...projects];
    [reordered[idx], reordered[idx + dir]] = [
      reordered[idx + dir],
      reordered[idx],
    ];
    const renumbered = reordered.map((p, i) => ({ ...p, sortOrder: i }));
    const changed = renumbered.filter(
      (p, i) => p.sortOrder !== reordered[i].sortOrder,
    );

    setProjects(renumbered);

    try {
      const responses = await Promise.all(
        changed.map((p) =>
          fetch("/api/admin/projects", {
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

  async function remove(project: Project) {
    if (
      !window.confirm(
        "Projekt wirklich löschen? Zugehörige Bilder werden ebenfalls entfernt.",
      )
    ) {
      return;
    }
    setBusyId(project.id);
    try {
      const res = await fetch(
        `/api/admin/projects?id=${encodeURIComponent(project.id)}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error(await apiError(res));
      setProjects((prev) => prev?.filter((p) => p.id !== project.id) ?? prev);
      toast.success("Projekt gelöscht.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Löschen fehlgeschlagen.");
    } finally {
      setBusyId(null);
    }
  }

  const nextSortOrder =
    projects && projects.length > 0
      ? Math.max(...projects.map((p) => p.sortOrder)) + 1
      : 0;

  return (
    <div className="grid gap-10">
      <NewProjectForm nextSortOrder={nextSortOrder} onCreated={load} />

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Projekte</h2>
          {projects && (
            <span className="eyebrow">
              {projects.length} {projects.length === 1 ? "Eintrag" : "Einträge"}
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
        ) : projects === null ? (
          <div className="flex items-center gap-2 border-t border-border py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden /> Projekte
            werden geladen …
          </div>
        ) : projects.length === 0 ? (
          <p className="border-y border-border py-6 text-sm text-muted-foreground">
            Noch keine Projekte erfasst.
          </p>
        ) : (
          <ul>
            {projects.map((p, i) => (
              <li
                key={p.id}
                className="border-t border-border transition-colors duration-150 last:border-b hover:bg-card"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-2 py-4 sm:px-4">
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl(p.images[0])}
                      alt={p.title}
                      className="h-12 w-16 shrink-0 border border-border object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-16 shrink-0 items-center justify-center border border-border bg-secondary">
                      <span className="eyebrow">–</span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {p.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {categoryLabel(p.category)}
                      {p.location ? ` · ${p.location}` : ""}
                      {p.kwp != null ? ` · ${p.kwp} kWp` : ""}
                      {p.storageKwh != null ? ` · ${p.storageKwh} kWh Speicher` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="eyebrow">
                      {p.isPublic ? "Öffentlich" : "Entwurf"}
                    </span>
                    <Switch
                      checked={p.isPublic}
                      onCheckedChange={(checked) =>
                        void togglePublic(p, checked === true)
                      }
                      aria-label={`${p.title} ${p.isPublic ? "auf Entwurf setzen" : "veröffentlichen"}`}
                    />
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
                      disabled={i === projects.length - 1}
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
                  <EditProjectForm
                    project={p}
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
