"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  heatingTypes,
  heatingTypeLabels,
  type ContactFormInput,
  type HeatingType,
} from "@/lib/validations/lead";

const topics: { value: ContactFormInput["topic"]; label: string }[] = [
  { value: "allgemein", label: "Allgemeine Anfrage" },
  { value: "offerte", label: "Offerte / Beratung" },
  { value: "service", label: "Service / Bestandsanlage" },
  { value: "andere", label: "Anderes Thema" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      heatingType: undefined,
      householdSize: undefined,
      message: "",
      topic: "allgemein",
      consent: false,
      source: "kontakt-seite",
      company_website: "",
    },
  });

  const consent = watch("consent");
  const topic = watch("topic");
  const heatingType = watch("heatingType");
  const requireOffer = topic === "offerte";

  async function onSubmit(values: ContactFormInput) {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: `kontakt:${values.topic}` }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Anfrage konnte nicht gesendet werden.");
      }
      setSubmitted(true);
      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        heatingType: undefined,
        householdSize: undefined,
        message: "",
        topic: "allgemein",
        consent: false,
        source: "kontakt-seite",
        company_website: "",
      });
      toast.success("Vielen Dank – wir melden uns innert eines Werktags.");
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Etwas ist schiefgelaufen.",
      );
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[color:var(--solar-emerald)]/30 bg-[color:var(--solar-emerald)]/8 p-6">
        <p className="text-base font-semibold text-[color:var(--solar-emerald)]">
          Vielen Dank für Ihre Nachricht.
        </p>
        <p className="mt-2 text-sm text-foreground/80">
          Wir melden uns persönlich – in der Regel innerhalb eines Werktags.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-3 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel>Anliegen</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {topics.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() =>
                  setValue("topic", t.value, { shouldValidate: true })
                }
                aria-pressed={topic === t.value}
                className={`ring-focus rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                  topic === t.value
                    ? "border-[color:var(--solar-navy)] bg-[color:var(--solar-navy)] text-[color:var(--solar-navy-foreground)]"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Field>

        {requireOffer && (
          <div className="rounded-2xl border border-[color:var(--solar-emerald)]/30 bg-[color:var(--solar-emerald)]/5 p-4 text-sm">
            <p className="font-medium text-foreground">
              Für eine fundierte Offerte oder Beratung brauchen wir ein paar
              Eckdaten — bitte ergänzen Sie unten Adresse, Telefon, Heizart und
              Personen im Haushalt. So können wir gleich beim ersten Anruf
              konkret werden.
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-name">Name *</FieldLabel>
            <Input
              id="contact-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
              className="h-11"
            />
            <FieldError errors={errors.name ? [errors.name] : undefined} />
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-email">E-Mail *</FieldLabel>
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
              className="h-11"
            />
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="contact-phone">
            Telefon {requireOffer ? "*" : "(optional)"}
          </FieldLabel>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+41 …"
            aria-invalid={!!errors.phone}
            {...register("phone")}
            className="h-11"
          />
          <FieldError errors={errors.phone ? [errors.phone] : undefined} />
        </Field>

        {requireOffer && (
          <>
            <Field>
              <FieldLabel htmlFor="contact-address">Wohnadresse *</FieldLabel>
              <Input
                id="contact-address"
                autoComplete="street-address"
                placeholder="Strasse, PLZ, Ort"
                aria-invalid={!!errors.address}
                {...register("address")}
                className="h-11"
              />
              <FieldError
                errors={errors.address ? [errors.address] : undefined}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
              <Field>
                <FieldLabel>Aktuelle Heizart *</FieldLabel>
                <FieldDescription>
                  Hilft uns, Wärmepumpe und Eigenverbrauch realistisch
                  einzuplanen.
                </FieldDescription>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {heatingTypes.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() =>
                        setValue("heatingType", h as HeatingType, {
                          shouldValidate: true,
                        })
                      }
                      aria-pressed={heatingType === h}
                      className={cn(
                        "ring-focus rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                        heatingType === h
                          ? "border-[color:var(--solar-navy)] bg-[color:var(--solar-navy)] text-[color:var(--solar-navy-foreground)]"
                          : "border-border bg-card hover:bg-secondary",
                      )}
                    >
                      {heatingTypeLabels[h as HeatingType]}
                    </button>
                  ))}
                </div>
                <FieldError
                  errors={
                    errors.heatingType ? [errors.heatingType] : undefined
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="contact-household">
                  Personen im Haushalt *
                </FieldLabel>
                <FieldDescription>
                  Z. B. 4 Personen — wir leiten daraus den typischen Verbrauch ab.
                </FieldDescription>
                <Input
                  id="contact-household"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  step={1}
                  placeholder="4"
                  aria-invalid={!!errors.householdSize}
                  {...register("householdSize", { valueAsNumber: true })}
                  className="h-11"
                />
                <FieldError
                  errors={
                    errors.householdSize ? [errors.householdSize] : undefined
                  }
                />
              </Field>
            </div>
          </>
        )}

        <Field>
          <FieldLabel htmlFor="contact-message">
            Ihre Nachricht {requireOffer ? "(optional)" : ""}
          </FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            placeholder="Erzählen Sie uns kurz, worum es geht – Dachgrösse, Strom­verbrauch, Wünsche helfen uns enorm."
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website_c">Website</label>
          <input
            id="company_website_c"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company_website")}
          />
        </div>

        <Field orientation="horizontal">
          <Switch
            id="contact-consent"
            checked={consent}
            onCheckedChange={(v) =>
              setValue("consent", v, { shouldValidate: true })
            }
          />
          <FieldContent>
            <FieldLabel htmlFor="contact-consent">
              Ich bin mit der{" "}
              <a href="/datenschutz" className="underline underline-offset-4">
                Datenschutzerklärung
              </a>{" "}
              einverstanden. *
            </FieldLabel>
            <FieldDescription>
              Wir nutzen Ihre Daten ausschliesslich zur Bearbeitung Ihrer Anfrage.
            </FieldDescription>
            <FieldError errors={errors.consent ? [errors.consent] : undefined} />
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-[color:var(--solar-navy)] text-[color:var(--solar-navy-foreground)] hover:bg-[color:var(--solar-navy)]/95"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Wird gesendet …
          </>
        ) : (
          "Nachricht senden"
        )}
      </Button>
    </form>
  );
}
