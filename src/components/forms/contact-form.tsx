"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { Link } from "@/i18n/navigation";
import {
  AddressFields,
  composeSwissAddress,
} from "@/components/forms/address-fields";
import {
  buildContactFormSchema,
  contactTopics,
  heatingTypes,
  type ContactFormInput,
  type HeatingType,
} from "@/lib/validations/lead";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("forms");

  // Validierungs-Schema mit übersetzten Meldungen (Regeln unverändert).
  const schema = useMemo(
    () =>
      buildContactFormSchema({
        name: t("errors.name"),
        email: t("errors.email"),
        phoneInvalid: t("errors.phoneInvalid"),
        phoneRequired: t("errors.phoneRequired"),
        street: t("errors.street"),
        houseNumber: t("errors.houseNumber"),
        postalCode: t("errors.postalCode"),
        city: t("errors.city"),
        heatingType: t("errors.heatingType"),
        householdSize: t("errors.householdSize"),
        consent: t("errors.consent"),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(schema),
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
        throw new Error(data.error || t("errors.submitFailed"));
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
      toast.success(t("common.toastSuccess"));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t("errors.generic"));
    }
  }

  if (submitted) {
    return (
      <div className="neu-in rounded-2xl p-5">
        <p className="text-base font-semibold text-foreground">
          {t("contact.successTitle")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("contact.successText")}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-ghost mt-4 min-h-11 text-sm"
        >
          {t("contact.successAgain")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel>{t("contact.topicLabel")}</FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {contactTopics.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setValue("topic", value, { shouldValidate: true })
                }
                aria-pressed={topic === value}
                className={cn(
                  "ring-focus neu-sm flex min-h-12 items-center justify-center rounded-2xl px-3 py-2 text-center text-[13px] font-medium leading-tight transition-[box-shadow,color,transform] duration-150 sm:text-sm",
                  topic === value
                    ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                    : "text-foreground hover:-translate-y-px",
                )}
              >
                {t(`topics.${value}`)}
              </button>
            ))}
          </div>
        </Field>

        {requireOffer && (
          <div className="neu-in rounded-2xl p-5 text-sm">
            <p className="font-medium leading-relaxed text-foreground">
              {t("contact.offerNotice")}
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-name">{t("common.name")}</FieldLabel>
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
            <FieldLabel htmlFor="contact-email">{t("common.email")}</FieldLabel>
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
            {requireOffer ? t("common.phoneRequired") : t("common.phoneOptional")}
          </FieldLabel>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("common.phonePlaceholder")}
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
                <FieldLabel>{t("contact.heatingLabel")}</FieldLabel>
                <FieldDescription>
                  {t("contact.heatingDescription")}
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
                      {t(`heatingTypes.${h}`)}
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
                  {t("contact.householdLabel")}
                </FieldLabel>
                <FieldDescription>
                  {t("contact.householdDescription")}
                </FieldDescription>
                <Input
                  id="contact-household"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  step={1}
                  placeholder={t("contact.householdPlaceholder")}
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
            {t("contact.messageLabel")} {requireOffer ? t("common.optional") : ""}
          </FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            placeholder={t("contact.messagePlaceholder")}
            aria-invalid={!!errors.message}
            {...register("message")}
            className="px-4 py-3"
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_website_c">{t("common.honeypotLabel")}</label>
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
              {t.rich("common.consent", {
                link: (chunks) => (
                  <Link
                    href="/datenschutz"
                    className="ring-focus rounded-md underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </FieldLabel>
            <FieldDescription>{t("common.consentHint")}</FieldDescription>
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
            {t("common.sending")}
          </>
        ) : (
          <>
            {t("contact.submit")}
            <ArrowRight className="size-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
