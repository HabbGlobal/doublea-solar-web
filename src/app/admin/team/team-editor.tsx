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
import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel } from "@/components/ui/field";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imagePath: string | null;
  sortOrder: number;
  isPublished: boolean;
};

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
  fd.append("folder", "team");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error(await apiError(res));
  const data = (await res.json()) as { path: string };
  return data.path;
}

/** Datei-Auswahl mit Grössen-Validierung + lokaler Vorschau. */
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
          // Admin-Vorschau — schlichtes img genügt hier.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shown}
            alt="Bildvorschau"
            className="size-16 shrink-0 border border-border object-cover"
          />
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center border border-border bg-secondary">
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

function NewMemberForm({
  nextSortOrder,
  onCreated,
}: {
  nextSortOrder: number;
  onCreated: () => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      toast.error("Name und Funktion sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    try {
      let imagePath: string | undefined;
      if (file) imagePath = await uploadImage(file);
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          ...(imagePath ? { imagePath } : {}),
          sortOrder: nextSortOrder,
          isPublished: false,
        }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Mitglied angelegt (noch als Entwurf).");
      setName("");
      setRole("");
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
        <h2 className="text-lg font-semibold text-foreground">Neues Mitglied</h2>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 px-5 py-6 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="team-new-name">Name *</FieldLabel>
            <Input
              id="team-new-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="team-new-role">Funktion *</FieldLabel>
            <Input
              id="team-new-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-11"
              required
            />
          </Field>
        </div>
        <ImageField
          key={fileKey}
          id="team-new-image"
          label="Bild (JPG, PNG oder WebP, max. 4 MB)"
          file={file}
          onSelect={setFile}
        />
        <p className="text-xs text-muted-foreground">
          Empfohlen: Hochformat 3:4, mind. 800×1067 px. Sichtbar auf Startseite
          und ‹Über uns›, sobald ‹Veröffentlicht› aktiv ist.
        </p>
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
                <Plus className="size-4" aria-hidden /> Mitglied anlegen
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function EditMemberForm({
  member,
  onSaved,
  onCancel,
}: {
  member: TeamMember;
  onSaved: () => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      toast.error("Name und Funktion sind Pflichtfelder.");
      return;
    }
    setSaving(true);
    try {
      let imagePath: string | undefined;
      if (file) imagePath = await uploadImage(file);
      const res = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: member.id,
          name: name.trim(),
          role: role.trim(),
          ...(imagePath ? { imagePath } : {}),
        }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success("Mitglied gespeichert.");
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`team-edit-name-${member.id}`}>Name *</FieldLabel>
          <Input
            id={`team-edit-name-${member.id}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`team-edit-role-${member.id}`}>Funktion *</FieldLabel>
          <Input
            id={`team-edit-role-${member.id}`}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-11"
            required
          />
        </Field>
      </div>
      <ImageField
        id={`team-edit-image-${member.id}`}
        label="Bild ersetzen (optional)"
        file={file}
        onSelect={setFile}
        currentPath={member.imagePath}
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

export function TeamEditor() {
  const [members, setMembers] = useState<TeamMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/team", { cache: "no-store" });
      if (!res.ok) throw new Error(await apiError(res));
      const data = (await res.json()) as { members: TeamMember[] };
      setMembers([...data.members].sort((a, b) => a.sortOrder - b.sortOrder));
      setError(null);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Team konnte nicht geladen werden.";
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

  async function togglePublished(member: TeamMember, next: boolean) {
    setMembers(
      (prev) =>
        prev?.map((m) =>
          m.id === member.id ? { ...m, isPublished: next } : m,
        ) ?? prev,
    );
    try {
      const res = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id, isPublished: next }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success(
        next ? "Mitglied veröffentlicht." : "Mitglied auf Entwurf gesetzt.",
      );
    } catch (e) {
      setMembers(
        (prev) =>
          prev?.map((m) =>
            m.id === member.id ? { ...m, isPublished: !next } : m,
          ) ?? prev,
      );
      toast.error(e instanceof Error ? e.message : "Änderung fehlgeschlagen.");
    }
  }

  async function move(member: TeamMember, dir: -1 | 1) {
    if (!members) return;
    const idx = members.findIndex((m) => m.id === member.id);
    if (idx < 0 || !members[idx + dir]) return;

    // Ziel-Reihenfolge bilden, dann ALLE Einträge index-basiert neu
    // nummerieren — robust auch bei doppelten sortOrder-Werten.
    const reordered = [...members];
    [reordered[idx], reordered[idx + dir]] = [
      reordered[idx + dir],
      reordered[idx],
    ];
    const renumbered = reordered.map((m, i) => ({ ...m, sortOrder: i }));
    const changed = renumbered.filter(
      (m, i) => m.sortOrder !== reordered[i].sortOrder,
    );

    setMembers(renumbered);

    try {
      const responses = await Promise.all(
        changed.map((m) =>
          fetch("/api/admin/team", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: m.id, sortOrder: m.sortOrder }),
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

  async function remove(member: TeamMember) {
    if (
      !window.confirm(
        "Mitglied wirklich löschen? Das Bild wird ebenfalls entfernt.",
      )
    ) {
      return;
    }
    setBusyId(member.id);
    try {
      const res = await fetch(
        `/api/admin/team?id=${encodeURIComponent(member.id)}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error(await apiError(res));
      setMembers((prev) => prev?.filter((m) => m.id !== member.id) ?? prev);
      toast.success("Mitglied gelöscht.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Löschen fehlgeschlagen.");
    } finally {
      setBusyId(null);
    }
  }

  const nextSortOrder =
    members && members.length > 0
      ? Math.max(...members.map((m) => m.sortOrder)) + 1
      : 0;

  return (
    <div className="grid gap-10">
      <NewMemberForm nextSortOrder={nextSortOrder} onCreated={load} />

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Mitglieder</h2>
          {members && (
            <span className="eyebrow">
              {members.length} {members.length === 1 ? "Eintrag" : "Einträge"}
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
        ) : members === null ? (
          <div className="flex items-center gap-2 border-t border-border py-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden /> Team wird
            geladen …
          </div>
        ) : members.length === 0 ? (
          <p className="border-y border-border py-6 text-sm text-muted-foreground">
            Noch keine Mitglieder erfasst.
          </p>
        ) : (
          <ul>
            {members.map((m, i) => (
              <li
                key={m.id}
                className="border-t border-border transition-colors duration-150 last:border-b hover:bg-card"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-2 py-4 sm:px-4">
                  {m.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl(m.imagePath)}
                      alt={m.name}
                      className="size-12 shrink-0 border border-border object-cover"
                    />
                  ) : (
                    <div className="flex size-12 shrink-0 items-center justify-center border border-border bg-secondary">
                      <span className="eyebrow">–</span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {m.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="eyebrow">
                      {m.isPublished ? "Veröffentlicht" : "Entwurf"}
                    </span>
                    <Switch
                      checked={m.isPublished}
                      onCheckedChange={(checked) =>
                        void togglePublished(m, checked === true)
                      }
                      aria-label={`${m.name} ${m.isPublished ? "auf Entwurf setzen" : "veröffentlichen"}`}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void move(m, -1)}
                      disabled={i === 0}
                      aria-label={`${m.name} nach oben verschieben`}
                      className="ring-focus inline-flex size-8 items-center justify-center border border-border text-sm text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => void move(m, 1)}
                      disabled={i === members.length - 1}
                      aria-label={`${m.name} nach unten verschieben`}
                      className="ring-focus inline-flex size-8 items-center justify-center border border-border text-sm text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingId((prev) => (prev === m.id ? null : m.id))
                      }
                      className="ring-focus inline-flex h-8 items-center border border-border px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
                    >
                      {editingId === m.id ? "Schliessen" : "Bearbeiten"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(m)}
                      disabled={busyId === m.id}
                      className="ring-focus inline-flex h-8 items-center gap-1 border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-destructive disabled:pointer-events-none disabled:opacity-50"
                    >
                      {busyId === m.id ? (
                        <Loader2 className="size-3.5 animate-spin" aria-hidden />
                      ) : (
                        <Trash2 className="size-3.5" aria-hidden />
                      )}
                      Löschen
                    </button>
                  </div>
                </div>
                {editingId === m.id && (
                  <EditMemberForm
                    member={m}
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
