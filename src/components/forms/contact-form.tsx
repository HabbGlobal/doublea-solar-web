"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  AddressFields,
  composeSwissAddress,
} from "@/components/forms/address-fields";
import {
  contactFormSchema,
  heatingTypes,
  heatingTypeLabels,
  type ContactFormInput,
  type HeatingType,
} from "@/lib/validations/lead";

const topics: { value: ContactFormInput["topic"]; label: string }[] = [
  { value: "allgemein", label: "Allgemeine Anfrage" },
  { value: "offerte", label: "Offerte & Beratung" },
  { value: "solarrechner", label: "Solarrechner-Auswertung" },
  { value: "service", label: "Service & Bestandsanlage" },
  { value: "finanzierung", label: "Finanzierung" },
  { value: "gewerbe", label: "Gewerbeprojekt" },
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
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
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
        body: JSON.stringify({
          ...values,
          address: composeSwissAddress(values),
          source: `kontakt:${values.topic}`,
        }),
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
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
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
      <div className="neu-in rounded-2xl p-5">
        <p className="text-base font-semibold text-foreground">
          Vielen Dank für Ihre Nachricht.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Wir melden uns persönlich – Antwort innert eines Werktags.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-ghost mt-4 min-h-11 text-sm"
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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {topics.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() =>
                  setValue("topic", t.value, { shouldValidate: true })
                }
                aria-pressed={topic === t.value}
                className={cn(
                  "ring-focus neu-sm flex min-h-12 items-center justify-center rounded-2xl px-3 py-2 text-center text-[13px] font-medium leading-tight transition-[box-shadow,color,transform] duration-150 sm:text-sm",
                  topic === t.value
                    ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                    : "text-foreground hover:-translate-y-px",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Field>

        {requireOffer && (
          <div className="neu-in rounded-2xl p-5 text-sm">
            <p className="font-medium leading-relaxed text-foreground">
              Für eine fundierte Offerte oder Beratung brauchen wir zusätzlich
              Telefon, Heizart und Personen im Haushalt — so können wir gleich
              beim ersten Anruf konkret werden.
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
              className="h-12 px-4"
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
              className="h-12 px-4"
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
            className="h-12 px-4"
          />
          <FieldError errors={errors.phone ? [errors.phone] : undefined} />
        </Field>

        {/* Exakte Adresse — in jedem Fall Pflicht, mit Adresserkennung */}
        <AddressFields
          idPrefix="contact"
          register={(n) => register(n)}
          setFieldValue={(n, v) => setValue(n, v, { shouldValidate: true })}
          errors={{
            street: errors.street,
            houseNumber: errors.houseNumber,
            postalCode: errors.postalCode,
            city: errors.city,
          }}
        />

        {requireOffer && (
          <>
            <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
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
                        "ring-focus neu-sm flex min-h-12 items-center justify-center rounded-2xl px-2 py-2 text-center text-[13px] font-medium leading-tight transition-[box-shadow,color,transform] duration-150 sm:text-sm",
                        heatingType === h
                          ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                          : "text-foreground hover:-translate-y-px",
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
                  className="h-12 px-4"
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
            className="px-4 py-3"
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
              <a
                href="/datenschutz"
                className="ring-focus rounded-md underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4"
              >
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Wird gesendet …
          </>
        ) : (
          <>
            Nachricht senden
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
