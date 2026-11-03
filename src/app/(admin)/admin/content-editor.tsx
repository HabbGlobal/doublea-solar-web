"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { SiteContent } from "@/lib/content/schema";

type Props = {
  initialContent: SiteContent;
};

type Hero = SiteContent["hero"];
type Faq = SiteContent["faq"];

/** Englische Hero-Felder — leer = deutscher Text wird angezeigt. */
type HeroEn = Record<keyof Hero, string>;

const HERO_KEYS: (keyof Hero)[] = [
  "eyebrow",
  "headlineLeading",
  "headlineHighlight",
  "headlineTrailing",
  "subclaim",
  "subheadline",
  "primaryCtaLabel",
  "secondaryCtaLabel",
];

function emptyHeroEn(): HeroEn {
  return {
    eyebrow: "",
    headlineLeading: "",
    headlineHighlight: "",
    headlineTrailing: "",
    subclaim: "",
    subheadline: "",
    primaryCtaLabel: "",
    secondaryCtaLabel: "",
  };
}

/** Teilobjekt aus der DB (alle Felder optional) in vollständige Formwerte überführen. */
function heroEnFromValue(value: unknown): HeroEn {
  const out = emptyHeroEn();
  if (!value || typeof value !== "object") return out;
  const v = value as Record<string, unknown>;
  for (const key of HERO_KEYS) {
    if (typeof v[key] === "string") out[key] = v[key] as string;
  }
  return out;
}

/** Nur gefüllte Felder speichern — leere Felder fallen auf Deutsch zurück. */
function heroEnPayload(hero: HeroEn): Partial<Hero> {
  const out: Partial<Hero> = {};
  for (const key of HERO_KEYS) {
    const v = hero[key].trim();
    if (v) out[key] = v;
  }
  return out;
}

function faqEnFromValue(value: unknown): Faq {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (it): it is { q: string; a: string } =>
        !!it &&
        typeof it === "object" &&
        typeof (it as { q?: unknown }).q === "string" &&
        typeof (it as { a?: unknown }).a === "string",
    )
    .map((it) => ({ q: it.q, a: it.a }));
}

async function apiError(res: Response): Promise<string> {
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  return data.error || "Speichern fehlgeschlagen.";
}

type EnLoadState = "loading" | "ready" | "error";

export function ContentEditor({ initialContent }: Props) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState<string | null>(null);

  // Englische Fassungen — kommen nicht über page.tsx, sondern per GET beim Mount.
  const [heroEn, setHeroEn] = useState<HeroEn>(emptyHeroEn());
  const [faqEn, setFaqEn] = useState<Faq>([]);
  const [enState, setEnState] = useState<EnLoadState>("loading");

  const loadEn = useCallback(async () => {
    setEnState("loading");
    try {
      const [heroRes, faqRes] = await Promise.all([
        fetch("/api/admin/content?key=hero_en", { cache: "no-store" }),
        fetch("/api/admin/content?key=faq_en", { cache: "no-store" }),
      ]);
      if (!heroRes.ok) throw new Error(await apiError(heroRes));
      if (!faqRes.ok) throw new Error(await apiError(faqRes));
      const heroData = (await heroRes.json()) as { value: unknown };
      const faqData = (await faqRes.json()) as { value: unknown };
      setHeroEn(heroEnFromValue(heroData.value));
      setFaqEn(faqEnFromValue(faqData.value));
      setEnState("ready");
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Englische Fassung konnte nicht geladen werden.",
      );
      setEnState("error");
    }
  }, []);

  useEffect(() => {
    // Asynchron anstossen, damit kein setState synchron im Effect läuft.
    const t = setTimeout(() => {
      void loadEn();
    }, 0);
    return () => clearTimeout(t);
  }, [loadEn]);

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function saveValue(
    key: string,
    value: unknown,
    label: string,
  ): Promise<void> {
    setSaving(key);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error(await apiError(res));
      toast.success(`${label} gespeichert & veröffentlicht.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Fehler beim Speichern.");
    } finally {
      setSaving(null);
    }
  }

  async function save<K extends keyof SiteContent>(
    section: K,
    label: string,
  ): Promise<void> {
    await saveValue(section, content[section], label);
  }

  /** Englische Karten: Ladezustand statt Felder, solange die Daten fehlen. */
  function enGate(children: React.ReactNode): React.ReactNode {
    if (enState === "loading") {
      return (
        <div className="neu-in flex items-center gap-2 rounded-2xl p-5 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden /> Englische
          Fassung wird geladen …
        </div>
      );
    }
    if (enState === "error") {
      return (
        <div role="alert" className="neu-in rounded-2xl p-5 text-sm">
          <p className="text-foreground">
            Englische Fassung konnte nicht geladen werden.
          </p>
          <button
            type="button"
            className="btn-secondary mt-4 min-h-10 px-4"
            onClick={() => void loadEn()}
          >
            Erneut laden
          </button>
        </div>
      );
    }
    return children;
  }

  return (
    <div className="grid gap-10">
      {/* HERO */}
      <SectionCard
        title="Hero-Sektion (Startseite oben)"
        description="Headline, Subheadline und Button-Beschriftungen."
        onSave={() => save("hero", "Hero")}
        saving={saving === "hero"}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="hero-eyebrow">
              Eyebrow (Mini-Text über der Headline)
            </FieldLabel>
            <Input
              id="hero-eyebrow"
              value={content.hero.eyebrow}
              onChange={(e) =>
                patch("hero", { ...content.hero, eyebrow: e.target.value })
              }
              className="h-11"
            />
          </Field>
          <div className="grid gap-4 lg:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="hero-h-leading">Headline – Anfang</FieldLabel>
              <Input
                id="hero-h-leading"
                value={content.hero.headlineLeading}
                onChange={(e) =>
                  patch("hero", {
                    ...content.hero,
                    headlineLeading: e.target.value,
                  })
                }
                className="h-11"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="hero-h-highlight">
                Headline – Hervorhebung
              </FieldLabel>
              <Input
                id="hero-h-highlight"
                value={content.hero.headlineHighlight}
                onChange={(e) =>
                  patch("hero", {
                    ...content.hero,
                    headlineHighlight: e.target.value,
                  })
                }
                className="h-11"
              />
              <FieldDescription>Teil der Headline (eine Zeile).</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="hero-h-trailing">Headline – Schluss</FieldLabel>
              <Input
                id="hero-h-trailing"
                value={content.hero.headlineTrailing}
                onChange={(e) =>
                  patch("hero", {
                    ...content.hero,
                    headlineTrailing: e.target.value,
                  })
                }
                className="h-11"
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="hero-subclaim">
              Subclaim (zweite Zeile unter der Headline)
            </FieldLabel>
            <Input
              id="hero-subclaim"
              value={content.hero.subclaim}
              onChange={(e) =>
                patch("hero", { ...content.hero, subclaim: e.target.value })
              }
              className="h-11"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="hero-sub">Subheadline</FieldLabel>
            <Textarea
              id="hero-sub"
              rows={3}
              value={content.hero.subheadline}
              onChange={(e) =>
                patch("hero", { ...content.hero, subheadline: e.target.value })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="hero-cta-1">Primärer Button</FieldLabel>
              <Input
                id="hero-cta-1"
                value={content.hero.primaryCtaLabel}
                onChange={(e) =>
                  patch("hero", {
                    ...content.hero,
                    primaryCtaLabel: e.target.value,
                  })
                }
                className="h-11"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="hero-cta-2">Sekundärer Button</FieldLabel>
              <Input
                id="hero-cta-2"
                value={content.hero.secondaryCtaLabel}
                onChange={(e) =>
                  patch("hero", {
                    ...content.hero,
                    secondaryCtaLabel: e.target.value,
                  })
                }
                className="h-11"
              />
            </Field>
          </div>
        </FieldGroup>
      </SectionCard>

      {/* HERO — ENGLISCH */}
      <SectionCard
        title="Hero — Englisch"
        description="Englische Fassung der Hero-Sektion (/en). Leer lassen = deutscher Text wird angezeigt."
        onSave={() => saveValue("hero_en", heroEnPayload(heroEn), "Hero (Englisch)")}
        saving={saving === "hero_en"}
        disabled={enState !== "ready"}
      >
        {enGate(
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="hero-en-eyebrow">
                Eyebrow (Mini-Text über der Headline)
              </FieldLabel>
              <Input
                id="hero-en-eyebrow"
                value={heroEn.eyebrow}
                onChange={(e) =>
                  setHeroEn({ ...heroEn, eyebrow: e.target.value })
                }
                placeholder={content.hero.eyebrow}
                className="h-11"
              />
            </Field>
            <div className="grid gap-4 lg:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="hero-en-h-leading">Headline – Anfang</FieldLabel>
                <Input
                  id="hero-en-h-leading"
                  value={heroEn.headlineLeading}
                  onChange={(e) =>
                    setHeroEn({ ...heroEn, headlineLeading: e.target.value })
                  }
                  placeholder={content.hero.headlineLeading}
                  className="h-11"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-en-h-highlight">
                  Headline – Hervorhebung
                </FieldLabel>
                <Input
                  id="hero-en-h-highlight"
                  value={heroEn.headlineHighlight}
                  onChange={(e) =>
                    setHeroEn({ ...heroEn, headlineHighlight: e.target.value })
                  }
                  placeholder={content.hero.headlineHighlight}
                  className="h-11"
                />
                <FieldDescription>Teil der Headline (eine Zeile).</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-en-h-trailing">Headline – Schluss</FieldLabel>
                <Input
                  id="hero-en-h-trailing"
                  value={heroEn.headlineTrailing}
                  onChange={(e) =>
                    setHeroEn({ ...heroEn, headlineTrailing: e.target.value })
                  }
                  placeholder={content.hero.headlineTrailing}
                  className="h-11"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="hero-en-subclaim">
                Subclaim (zweite Zeile unter der Headline)
              </FieldLabel>
              <Input
                id="hero-en-subclaim"
                value={heroEn.subclaim}
                onChange={(e) =>
                  setHeroEn({ ...heroEn, subclaim: e.target.value })
                }
                placeholder={content.hero.subclaim}
                className="h-11"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="hero-en-sub">Subheadline</FieldLabel>
              <Textarea
                id="hero-en-sub"
                rows={3}
                value={heroEn.subheadline}
                onChange={(e) =>
                  setHeroEn({ ...heroEn, subheadline: e.target.value })
                }
                placeholder={content.hero.subheadline}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="hero-en-cta-1">Primärer Button</FieldLabel>
                <Input
                  id="hero-en-cta-1"
                  value={heroEn.primaryCtaLabel}
                  onChange={(e) =>
                    setHeroEn({ ...heroEn, primaryCtaLabel: e.target.value })
                  }
                  placeholder={content.hero.primaryCtaLabel}
                  className="h-11"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="hero-en-cta-2">Sekundärer Button</FieldLabel>
                <Input
                  id="hero-en-cta-2"
                  value={heroEn.secondaryCtaLabel}
                  onChange={(e) =>
                    setHeroEn({ ...heroEn, secondaryCtaLabel: e.target.value })
                  }
                  placeholder={content.hero.secondaryCtaLabel}
                  className="h-11"
                />
              </Field>
            </div>
            <FieldDescription>
              Leer lassen = deutscher Text wird angezeigt. Der Platzhalter zeigt
              den aktuellen deutschen Wert.
            </FieldDescription>
          </FieldGroup>,
        )}
      </SectionCard>

      {/* CONTACT */}
      <SectionCard
        title="Kontaktdaten"
        description="Werden im Header, Footer, Kontaktformular und in den Suchmaschinen-Daten verwendet."
        onSave={() => save("contact", "Kontaktdaten")}
        saving={saving === "contact"}
      >
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contact-phone">Telefon</FieldLabel>
              <Input
                id="contact-phone"
                value={content.contact.phone}
                onChange={(e) =>
                  patch("contact", { ...content.contact, phone: e.target.value })
                }
                className="h-11"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-email">E-Mail</FieldLabel>
              <Input
                id="contact-email"
                type="email"
                value={content.contact.email}
                onChange={(e) =>
                  patch("contact", { ...content.contact, email: e.target.value })
                }
                className="h-11"
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="contact-street">Strasse + Nr.</FieldLabel>
            <Input
              id="contact-street"
              value={content.contact.addressStreet}
              onChange={(e) =>
                patch("contact", {
                  ...content.contact,
                  addressStreet: e.target.value,
                })
              }
              className="h-11"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <Field>
              <FieldLabel htmlFor="contact-plz">PLZ</FieldLabel>
              <Input
                id="contact-plz"
                value={content.contact.addressPostalCode}
                onChange={(e) =>
                  patch("contact", {
                    ...content.contact,
                    addressPostalCode: e.target.value,
                  })
                }
                className="h-11"
                maxLength={4}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-city">Ort</FieldLabel>
              <Input
                id="contact-city"
                value={content.contact.addressCity}
                onChange={(e) =>
                  patch("contact", {
                    ...content.contact,
                    addressCity: e.target.value,
                  })
                }
                className="h-11"
              />
            </Field>
          </div>
        </FieldGroup>
      </SectionCard>

      {/* FAQ */}
      <SectionCard
        title="FAQ-Einträge"
        description="Frage und Antwort, in der Reihenfolge wie sie auf der Startseite erscheinen."
        onSave={() => save("faq", "FAQ")}
        saving={saving === "faq"}
      >
        <FieldGroup>
          {content.faq.map((item, i) => (
            <div key={i} className="neu-sm rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">Eintrag {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    patch(
                      "faq",
                      content.faq.filter((_, idx) => idx !== i),
                    )
                  }
                  aria-label={`FAQ-Eintrag ${i + 1} entfernen`}
                  className="ring-focus neu-sm inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-muted-foreground transition-[box-shadow,color] duration-150 hover:text-destructive active:shadow-[var(--neu-inset)]"
                >
                  <Trash2 className="size-3.5" aria-hidden /> Entfernen
                </button>
              </div>
              <div className="mt-4 grid gap-4">
                <Field>
                  <FieldLabel htmlFor={`faq-q-${i}`}>Frage</FieldLabel>
                  <Input
                    id={`faq-q-${i}`}
                    value={item.q}
                    onChange={(e) =>
                      patch(
                        "faq",
                        content.faq.map((it, idx) =>
                          idx === i ? { ...it, q: e.target.value } : it,
                        ),
                      )
                    }
                    className="h-11"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`faq-a-${i}`}>Antwort</FieldLabel>
                  <Textarea
                    id={`faq-a-${i}`}
                    rows={3}
                    value={item.a}
                    onChange={(e) =>
                      patch(
                        "faq",
                        content.faq.map((it, idx) =>
                          idx === i ? { ...it, a: e.target.value } : it,
                        ),
                      )
                    }
                  />
                </Field>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              patch("faq", [...content.faq, { q: "Neue Frage", a: "Antwort …" }])
            }
            className="btn-secondary min-h-11 self-start px-5 text-sm"
          >
            <Plus className="size-4" aria-hidden /> Neuen Eintrag hinzufügen
          </button>
        </FieldGroup>
      </SectionCard>

      {/* FAQ — ENGLISCH */}
      <SectionCard
        title="FAQ — Englisch"
        description="Englische FAQ-Einträge (/en). Keine Einträge = die englischen Standard-FAQ werden angezeigt."
        onSave={() => saveValue("faq_en", faqEn, "FAQ (Englisch)")}
        saving={saving === "faq_en"}
        disabled={enState !== "ready"}
      >
        {enGate(
          <FieldGroup>
            {faqEn.map((item, i) => (
              <div key={i} className="neu-sm rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow">Eintrag {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => setFaqEn(faqEn.filter((_, idx) => idx !== i))}
                    aria-label={`Englischen FAQ-Eintrag ${i + 1} entfernen`}
                    className="ring-focus neu-sm inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-muted-foreground transition-[box-shadow,color] duration-150 hover:text-destructive active:shadow-[var(--neu-inset)]"
                  >
                    <Trash2 className="size-3.5" aria-hidden /> Entfernen
                  </button>
                </div>
                <div className="mt-4 grid gap-4">
                  <Field>
                    <FieldLabel htmlFor={`faq-en-q-${i}`}>Frage</FieldLabel>
                    <Input
                      id={`faq-en-q-${i}`}
                      value={item.q}
                      onChange={(e) =>
                        setFaqEn(
                          faqEn.map((it, idx) =>
                            idx === i ? { ...it, q: e.target.value } : it,
                          ),
                        )
                      }
                      placeholder={content.faq[i]?.q}
                      className="h-11"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`faq-en-a-${i}`}>Antwort</FieldLabel>
                    <Textarea
                      id={`faq-en-a-${i}`}
                      rows={3}
                      value={item.a}
                      onChange={(e) =>
                        setFaqEn(
                          faqEn.map((it, idx) =>
                            idx === i ? { ...it, a: e.target.value } : it,
                          ),
                        )
                      }
                      placeholder={content.faq[i]?.a}
                    />
                  </Field>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFaqEn([...faqEn, { q: "New question", a: "Answer …" }])
              }
              className="btn-secondary min-h-11 self-start px-5 text-sm"
            >
              <Plus className="size-4" aria-hidden /> Neuen Eintrag hinzufügen
            </button>
            <FieldDescription>
              Sind hier Einträge erfasst, ersetzen sie die englischen
              Standard-FAQ auf /en vollständig. Der Platzhalter zeigt den
              deutschen Eintrag an gleicher Stelle.
            </FieldDescription>
          </FieldGroup>,
        )}
      </SectionCard>
    </div>
  );
}

function SectionCard({
  title,
  description,
  onSave,
  saving,
  disabled = false,
  children,
}: {
  title: string;
  description: string;
  onSave: () => void;
  saving: boolean;
  /** Speichern sperren, solange z.B. die Daten noch nicht geladen sind. */
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="neu p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving || disabled}
          className="btn-primary min-h-11 w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Speichere …
            </>
          ) : (
            "Speichern & veröffentlichen"
          )}
        </button>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
