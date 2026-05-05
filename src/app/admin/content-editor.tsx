"use client";

import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
    <div className="grid gap-8">
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
              <FieldDescription>Wird mit Gold unterstrichen.</FieldDescription>
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
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Eintrag {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    patch(
                      "faq",
                      content.faq.filter((_, idx) => idx !== i),
                    )
                  }
                  className="ring-focus inline-flex items-center gap-1 rounded-md text-xs text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3.5" /> Entfernen
                </button>
              </div>
              <div className="mt-3 grid gap-3">
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
            className="ring-focus inline-flex items-center gap-2 self-start rounded-xl border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Plus className="size-4" /> Neuen Eintrag hinzufügen
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
    <section className="rounded-3xl border border-border bg-background p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="h-11 rounded-xl bg-[color:var(--solar-navy)] px-5 text-[color:var(--solar-navy-foreground)] hover:bg-[color:var(--solar-navy)]/95"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Speichere …
            </>
          ) : (
            "Speichern & veröffentlichen"
          )}
        </Button>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
