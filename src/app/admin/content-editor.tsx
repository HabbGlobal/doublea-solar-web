"use client";

import { useState } from "react";
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

export function ContentEditor({ initialContent }: Props) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState<string | null>(null);

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function save<K extends keyof SiteContent>(
    section: K,
    label: string,
  ): Promise<void> {
    setSaving(section);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: section, value: content[section] }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error || "Speichern fehlgeschlagen.");
      }
      toast.success(`${label} gespeichert & veröffentlicht.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Fehler beim Speichern.");
    } finally {
      setSaving(null);
    }
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
    </div>
  );
}

function SectionCard({
  title,
  description,
  onSave,
  saving,
  children,
}: {
  title: string;
  description: string;
  onSave: () => void;
  saving: boolean;
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
          disabled={saving}
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
