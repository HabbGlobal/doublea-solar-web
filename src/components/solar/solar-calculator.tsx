"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  solarCalculatorSchema,
  type SolarCalculatorFormInput,
} from "@/lib/validations/lead";
import {
  calculateSolar,
  type SolarCalculatorResult,
} from "@/lib/solar/calculate";
import { cantonCodes, type CantonCode } from "@/lib/solar/canton-data";
import { CantonSelect } from "./canton-select";
import { RoofInputs } from "./roof-inputs";
import { CalculatorResultCard } from "./calculator-result-card";
import { AddressStep, type AddressStepSelection } from "./address-step";

const buildingTypes: {
  value: SolarCalculatorFormInput["buildingType"];
  label: string;
  description: string;
}[] = [
  { value: "einfamilienhaus", label: "Einfamilienhaus", description: "Privat, 1 Haushalt" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus", description: "Mehrere Wohneinheiten / ZEV" },
  { value: "gewerbe", label: "Gewerbe", description: "Büro, Industrie, Logistik" },
  { value: "landwirtschaft", label: "Landwirtschaft", description: "Stall, Scheune, Reithalle" },
  { value: "sonstiges", label: "Sonstiges", description: "Anderes Objekt" },
];

const wantsBatteryOptions: {
  value: SolarCalculatorFormInput["wantsBattery"];
  label: string;
}[] = [
  { value: "ja", label: "Ja, gewünscht" },
  { value: "nein", label: "Nein" },
  { value: "unsicher", label: "Beratung erwünscht" },
];

const financingOptions: {
  value: NonNullable<SolarCalculatorFormInput["financingInterest"]>;
  label: string;
}[] = [
  { value: "ja", label: "Ja" },
  { value: "nein", label: "Nein" },
  { value: "unsicher", label: "Beratung" },
];

const stepConfig = [
  {
    id: 0,
    label: "Standort & Dach",
    fields: [
      "canton",
      "roofAreaM2",
      "usableRoofPercent",
      "orientation",
      "tilt",
      "shading",
    ],
  },
  {
    id: 1,
    label: "Verbrauch",
    fields: ["buildingType", "annualConsumptionKwh", "wantsBattery"],
  },
  {
    id: 2,
    label: "Kontakt",
    fields: [],
  },
] as const;

type StepKey = (typeof stepConfig)[number]["fields"][number];

type LeadFields = {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
};

const defaultValues: SolarCalculatorFormInput = {
  buildingType: "einfamilienhaus",
  canton: "SO",
  postalCode: "",
  city: "",
  address: "",
  roofAreaM2: 80,
  usableRoofPercent: 75,
  orientation: "sued",
  tilt: "25-40",
  shading: "keine",
  annualConsumptionKwh: 5500,
  hasHeatPump: false,
  hasEv: false,
  wantsBattery: "unsicher",
  electricityPriceRappen: 27,
  feedInTariffRappen: 7,
  financingInterest: "unsicher",
};

export function SolarCalculator() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SolarCalculatorResult | null>(null);
  const [showManualOverride, setShowManualOverride] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lead, setLead] = useState<LeadFields>({
    name: "",
    email: "",
    phone: "",
    consent: false,
  });
  const resultRef = useRef<HTMLDivElement | null>(null);

  const leadValid =
    lead.name.trim().length >= 2 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email.trim()) &&
    /^[+0-9 ()/-]{6,30}$/.test(lead.phone.trim()) &&
    lead.consent;

  const form = useForm<SolarCalculatorFormInput>({
    resolver: zodResolver(solarCalculatorSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const values = watch();
  const hasSonnendach = Boolean(values.sonnendach);

  // Live-Vorschau für die Schnellanzeige im Header.
  const livePreview = useMemo(() => {
    try {
      const parsed = solarCalculatorSchema.safeParse(values);
      if (!parsed.success) return null;
      return calculateSolar(parsed.data);
    } catch {
      return null;
    }
  }, [values]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const totalSteps = stepConfig.length + 1;
  const progress = ((step + 1) / totalSteps) * 100;

  async function nextStep() {
    const cfg = stepConfig[step];
    if (!cfg) return;
    if (cfg.fields.length > 0) {
      const ok = await trigger(cfg.fields as readonly StepKey[] as StepKey[]);
      if (!ok) return;
    }
    setStep((s) => Math.min(s + 1, stepConfig.length));
  }

  function prevStep() {
    setStep((s) => Math.max(0, s - 1));
  }

  function applySonnendachSelection(selection: AddressStepSelection) {
    const { address, building, selectedSegmentIds } = selection;
    const segs = building.segments.filter((s) => selectedSegmentIds.includes(s.id));
    if (segs.length === 0) {
      // Keine Auswahl mehr → Sonnendach-State löschen
      setValue("sonnendach", undefined as never, { shouldValidate: false });
      return;
    }
    const totalArea = segs.reduce((s, x) => s + x.areaM2, 0);
    const totalUsable = segs.reduce((s, x) => s + x.usableAreaM2, 0);
    const totalYield = segs.reduce((s, x) => s + x.electricityYieldKwhYear, 0);
    const weightedIrr =
      segs.reduce((s, x) => s + x.specificIrradiationKwhM2Year * x.areaM2, 0) /
      Math.max(totalArea, 1);
    const avgClass =
      segs.reduce((s, x) => s + x.suitabilityClass * x.areaM2, 0) /
      Math.max(totalArea, 1);

    const ct = (address.canton ?? "").toUpperCase();
    const cantonValue = (cantonCodes as readonly string[]).includes(ct)
      ? (ct as CantonCode)
      : values.canton;

    setValue("canton", cantonValue, { shouldValidate: true });
    if (address.postalCode) setValue("postalCode", address.postalCode, { shouldValidate: false });
    if (address.city) setValue("city", address.city, { shouldValidate: false });
    setValue("address", address.label, { shouldValidate: false });
    // roofAreaM2 / usableRoofPercent halten wir konsistent zur Anzeige —
    // calculate() nutzt aber direkt sonnendach.usableAreaM2.
    setValue("roofAreaM2", Math.max(10, Math.round(totalArea)), { shouldValidate: true });
    setValue(
      "usableRoofPercent",
      Math.max(30, Math.min(100, Math.round((totalUsable / Math.max(totalArea, 1)) * 100))),
      { shouldValidate: true },
    );
    setValue("sonnendach", {
      totalAreaM2: Math.round(totalArea * 10) / 10,
      usableAreaM2: Math.round(totalUsable * 10) / 10,
      totalElectricityYieldKwhYear: Math.round(totalYield),
      weightedSpecificIrradiationKwhM2Year: Math.round(weightedIrr),
      segmentCount: segs.length,
      averageSuitabilityClass: Math.round(avgClass * 10) / 10,
    });
    setShowManualOverride(false);
  }

  function clearSonnendach() {
    setValue("sonnendach", undefined as never, { shouldValidate: false });
    setValue("address", "", { shouldValidate: false });
  }

  async function onSubmit(data: SolarCalculatorFormInput) {
    if (!leadValid) {
      toast.error("Bitte füllen Sie Ihre Kontaktdaten vollständig aus.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/solar-calculation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: data,
          contact: {
            name: lead.name,
            email: lead.email,
            phone: lead.phone || undefined,
            consent: lead.consent,
            source: "solarrechner",
          },
        }),
      });
      if (!res.ok) {
        const local = calculateSolar(data);
        setResult(local);
        toast.warning(
          "Server konnte die Berechnung nicht speichern – wir zeigen Ihnen die lokale Auswertung. Wir haben Ihre Anfrage nicht erhalten — bitte kontaktieren Sie uns direkt.",
        );
        return;
      }
      const payload = (await res.json()) as { result: SolarCalculatorResult };
      setResult(payload.result);
      toast.success("Anfrage gesendet — wir melden uns innert eines Werktags.");
    } catch {
      const local = calculateSolar(data);
      setResult(local);
      toast.warning("Verbindung gestört – wir zeigen Ihnen die lokale Auswertung.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setResult(null);
    setStep(0);
    setShowManualOverride(false);
    setShowAdvanced(false);
    setLead({ name: "", email: "", phone: "", consent: false });
    form.reset(defaultValues);
  }

  const oversize =
    livePreview &&
    values.buildingType === "einfamilienhaus" &&
    livePreview.recommendedKwp > 25;

  return (
    <div className="flex flex-col gap-6">
      <div className="neu relative p-6 sm:p-7 lg:p-8">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
            <div>
              <p className="eyebrow">Solarrechner</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                Erstauswertung in 60 Sekunden
              </h2>
            </div>
            <ol className="flex flex-wrap items-center gap-2">
              {[...stepConfig.map((s) => s.label), "Ergebnis"].map((label, i) => {
                const isActive = i === step && !result;
                const isDone = i < step || Boolean(result);
                return (
                  <li key={label}>
                    <span
                      className={`inline-flex min-h-9 items-center gap-2 rounded-full bg-background px-3.5 text-xs transition-[box-shadow,color] duration-150 ${
                        isActive
                          ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                          : isDone
                            ? "shadow-[var(--neu-raise-sm)] font-medium text-foreground"
                            : "shadow-[var(--neu-raise-sm)] text-muted-foreground"
                      }`}
                    >
                      <span className="stat-mono text-[11px]">0{i + 1}</span>
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <div
            role="progressbar"
            aria-label="Fortschritt im Solarrechner"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            className="neu-in mt-6 h-3 w-full overflow-hidden rounded-full p-0.5"
          >
            <div
              className="h-full rounded-full bg-[linear-gradient(135deg,#ddb955,#b8912a)] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!result ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: reduce ? 0 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -16 }}
                transition={{ duration: reduce ? 0 : 0.25 }}
              >
                {step === 0 && (
                  <div className="flex flex-col gap-6">
                    <AddressStep
                      initialQuery={values.address}
                      onSelect={applySonnendachSelection}
                      onClear={clearSonnendach}
                    />

                    {/* Sanity-Warnung wenn unrealistisch grosse Anlage */}
                    {hasSonnendach && oversize && (
                      <div className="neu-in rounded-2xl p-5">
                        <div className="text-sm">
                          <p className="font-medium text-foreground">
                            Sehr grosse Auswahl für ein Einfamilienhaus
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Die ausgewählten Dachflächen ergeben über 25 kWp – das ist mehr
                            als typisch für ein EFH. Bitte prüfen Sie, ob alle gewählten
                            Segmente tatsächlich zu Ihrer Liegenschaft gehören (in Sonnendach
                            werden manchmal benachbarte Gebäude oder Garagen mitgruppiert).
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Manueller Fallback / Override */}
                    {!hasSonnendach && (
                      <div className="neu p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="eyebrow">Manuelle Eingabe</p>
                            <p className="mt-2 text-sm font-medium text-foreground">
                              Dachdaten selbst erfassen
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              Wenn die Adresse nicht in Sonnendach.ch registriert ist oder Sie
                              die Werte selbst kennen, tragen Sie sie hier ein.
                            </p>
                          </div>
                        </div>
                        <div className="mt-5">
                          <ManualRoofInputs
                            form={form}
                            register={register}
                            errors={errors}
                            values={values}
                            setValue={setValue}
                          />
                        </div>
                      </div>
                    )}

                    {hasSonnendach && (
                      <button
                        type="button"
                        onClick={() => setShowManualOverride((s) => !s)}
                        className="btn-ghost min-h-11 self-start text-sm"
                      >
                        {showManualOverride
                          ? "Manuelle Werte ausblenden"
                          : "Werte manuell überschreiben (selten nötig)"}
                      </button>
                    )}

                    {hasSonnendach && showManualOverride && (
                      <div className="neu p-6">
                        <ManualRoofInputs
                          form={form}
                          register={register}
                          errors={errors}
                          values={values}
                          setValue={setValue}
                        />
                        <p className="mt-3 text-xs text-muted-foreground">
                          Hinweis: Bei aktiven Bundesdaten werden Ausrichtung, Neigung und
                          Verschattung nicht für die Berechnung verwendet — die Sonnendach-
                          Werte sind genauer. Die Felder sind nur für Ihre Übersicht.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {step === 1 && (
                  <FieldGroup>
                    {hasSonnendach && (
                      <div className="neu-in rounded-2xl p-5">
                        <div className="text-sm">
                          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E5510]">
                            Bundesdaten
                          </span>
                          <p className="mt-2 font-medium text-foreground">
                            Bundesdaten aktiv für {values.address}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Wir rechnen mit {values.sonnendach?.usableAreaM2.toFixed(0)} m²
                            nutzbarer Modulfläche aus Sonnendach.ch.
                          </p>
                        </div>
                      </div>
                    )}

                    <FieldSet>
                      <FieldLegend>
                        <span className="eyebrow">Gebäudetyp</span>
                      </FieldLegend>
                      <FieldDescription>
                        Wählen Sie die Kategorie, die am besten zu Ihrem Objekt passt.
                      </FieldDescription>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {buildingTypes.map((b) => (
                          <button
                            type="button"
                            key={b.value}
                            onClick={() =>
                              setValue("buildingType", b.value, { shouldValidate: true })
                            }
                            aria-pressed={values.buildingType === b.value}
                            className={`ring-focus neu-sm flex min-h-12 flex-col items-start gap-0.5 rounded-2xl p-4 text-left transition-[box-shadow,color,transform] duration-150 ${
                              values.buildingType === b.value
                                ? "shadow-[var(--neu-inset)] text-[color:var(--solar-gold-dark)]"
                                : "text-foreground hover:-translate-y-px"
                            }`}
                          >
                            <span className="text-sm font-semibold">{b.label}</span>
                            <span className="text-xs text-muted-foreground">{b.description}</span>
                          </button>
                        ))}
                      </div>
                    </FieldSet>

                    <Field>
                      <FieldLabel htmlFor="annualConsumptionKwh">
                        Jährlicher Stromverbrauch (kWh)
                      </FieldLabel>
                      <FieldDescription>
                        Sie finden den Wert auf Ihrer letzten Stromrechnung. Typisch:
                        EFH ca. 4’500 kWh, mit Elektroboiler ca. 7’500 kWh; mit
                        Wärmepumpe und Elektroauto 8’000–16’000 kWh (ElCom-Profile).
                      </FieldDescription>
                      <Input
                        id="annualConsumptionKwh"
                        type="number"
                        inputMode="numeric"
                        min={500}
                        max={500000}
                        step={100}
                        aria-invalid={!!errors.annualConsumptionKwh}
                        {...register("annualConsumptionKwh", { valueAsNumber: true })}
                        className="h-12"
                      />
                      <FieldError
                        errors={
                          errors.annualConsumptionKwh ? [errors.annualConsumptionKwh] : undefined
                        }
                      />
                    </Field>

                    <FieldSet>
                      <FieldLegend variant="label">
                        <span className="eyebrow">Elektrische Lasten</span>
                      </FieldLegend>
                      <Field orientation="horizontal">
                        <Switch
                          id="hasHeatPump"
                          checked={values.hasHeatPump}
                          onCheckedChange={(v) =>
                            setValue("hasHeatPump", v, { shouldValidate: true })
                          }
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="hasHeatPump">Wärmepumpe vorhanden</FieldLabel>
                          <FieldDescription>
                            Erhöht den möglichen Eigenverbrauch und beeinflusst die Auslegung.
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                      <Field orientation="horizontal">
                        <Switch
                          id="hasEv"
                          checked={values.hasEv}
                          onCheckedChange={(v) => setValue("hasEv", v, { shouldValidate: true })}
                        />
                        <FieldContent>
                          <FieldLabel htmlFor="hasEv">Elektroauto vorhanden</FieldLabel>
                          <FieldDescription>
                            Mit Wallbox und PV-Überschuss steigt der Eigenverbrauch deutlich.
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldSet>

                    <FieldSet>
                      <FieldLegend variant="label">
                        <span className="eyebrow">Batteriespeicher</span>
                      </FieldLegend>
                      <div className="grid grid-cols-3 gap-2">
                        {wantsBatteryOptions.map((o) => (
                          <button
                            key={o.value}
                            type="button"
                            onClick={() =>
                              setValue("wantsBattery", o.value, { shouldValidate: true })
                            }
                            aria-pressed={values.wantsBattery === o.value}
                            className={`ring-focus neu-sm min-h-12 rounded-2xl px-3 py-2.5 text-sm font-medium transition-[box-shadow,color,transform] duration-150 ${
                              values.wantsBattery === o.value
                                ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                                : "text-foreground hover:-translate-y-px"
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </FieldSet>

                    {/* Erweiterte Optionen — collapsible */}
                    <button
                      type="button"
                      onClick={() => setShowAdvanced((s) => !s)}
                      className="ring-focus flex min-h-11 items-center gap-2 self-start rounded-md text-sm font-semibold text-foreground transition-colors hover:text-[color:var(--solar-gold-dark)]"
                    >
                      <ChevronDown
                        className={`size-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      />
                      {showAdvanced ? "Erweiterte Optionen ausblenden" : "Erweiterte Optionen"}
                    </button>

                    {showAdvanced && (
                      <div className="neu p-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="electricityPriceRappen">
                              Strompreis (Rp./kWh, Gesamtpreis inkl. MwSt)
                            </FieldLabel>
                            <FieldDescription>
                              Grund- und Messgebühren Ihres Netzbetreibers bleiben fix
                              und lassen sich mit PV nicht vermeiden.
                            </FieldDescription>
                            <Input
                              id="electricityPriceRappen"
                              type="number"
                              inputMode="decimal"
                              min={5}
                              max={80}
                              step={0.5}
                              {...register("electricityPriceRappen", { valueAsNumber: true })}
                              className="h-12"
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="feedInTariffRappen">
                              Einspeisetarif (Rp./kWh)
                            </FieldLabel>
                            <FieldDescription>
                              Ohne Herkunftsnachweis-Vergütung; viele Netzbetreiber
                              vergüten HKN zusätzlich (ca. 1–2.5 Rp./kWh).
                            </FieldDescription>
                            <Input
                              id="feedInTariffRappen"
                              type="number"
                              inputMode="decimal"
                              min={0}
                              max={60}
                              step={0.5}
                              {...register("feedInTariffRappen", { valueAsNumber: true })}
                              className="h-12"
                            />
                          </Field>
                        </div>

                        <FieldSet className="mt-5">
                          <FieldLegend variant="label">
                            <span className="eyebrow">Finanzierung</span>
                          </FieldLegend>
                          <div className="grid grid-cols-3 gap-2">
                            {financingOptions.map((o) => (
                              <button
                                key={o.value}
                                type="button"
                                onClick={() =>
                                  setValue("financingInterest", o.value, {
                                    shouldValidate: true,
                                  })
                                }
                                aria-pressed={values.financingInterest === o.value}
                                className={`ring-focus neu-sm min-h-12 rounded-2xl px-3 py-2.5 text-sm font-medium transition-[box-shadow,color,transform] duration-150 ${
                                  values.financingInterest === o.value
                                    ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                                    : "text-foreground hover:-translate-y-px"
                                }`}
                              >
                                {o.label}
                              </button>
                            ))}
                          </div>
                        </FieldSet>
                      </div>
                    )}
                  </FieldGroup>
                )}

                {step === 2 && (
                  <FieldGroup>
                    <div className="neu-in rounded-2xl p-5">
                      <p className="eyebrow">Letzter Schritt</p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        Ihre Kontaktdaten für die persönliche Auswertung
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Wir senden Ihnen die persönliche Auswertung an Ihre E-Mail und melden
                        uns innert eines Werktags für die nächsten Schritte. Ihre Anfrage wird
                        gleichzeitig in unserem System erfasst.
                      </p>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="lead-name">Name *</FieldLabel>
                      <Input
                        id="lead-name"
                        autoComplete="name"
                        placeholder="Vor- und Nachname"
                        value={lead.name}
                        onChange={(e) =>
                          setLead((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="h-12"
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="lead-email">E-Mail *</FieldLabel>
                        <Input
                          id="lead-email"
                          type="email"
                          autoComplete="email"
                          placeholder="ihre.adresse@example.ch"
                          value={lead.email}
                          onChange={(e) =>
                            setLead((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="h-12"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="lead-phone">Telefon *</FieldLabel>
                        <Input
                          id="lead-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+41 …"
                          value={lead.phone}
                          onChange={(e) =>
                            setLead((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          className="h-12"
                        />
                      </Field>
                    </div>

                    {(values.address || values.postalCode || values.city) && (
                      <div className="neu-in rounded-2xl px-5 py-4 text-xs text-muted-foreground">
                        <p className="eyebrow">Adresse aus Schritt 1</p>
                        <p className="mt-0.5">
                          {values.address ||
                            `${values.postalCode || ""} ${values.city || ""}`.trim() ||
                            "—"}
                        </p>
                      </div>
                    )}

                    <Field orientation="horizontal">
                      <Switch
                        id="lead-consent"
                        checked={lead.consent}
                        onCheckedChange={(v) =>
                          setLead((prev) => ({ ...prev, consent: v }))
                        }
                      />
                      <FieldContent>
                        <FieldLabel htmlFor="lead-consent">
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
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Live-Quick-Stats */}
            {livePreview && (
              <div className="neu-in mt-8 grid gap-4 rounded-2xl p-5 sm:grid-cols-3">
                <div>
                  <p className="eyebrow">Anlage</p>
                  <p className="stat-mono mt-1 text-lg text-foreground">
                    {livePreview.recommendedKwp} kWp
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Jahresproduktion</p>
                  <p className="stat-mono mt-1 text-lg text-foreground">
                    {Intl.NumberFormat("de-CH").format(
                      livePreview.annualProductionKwh.realistic,
                    )}{" "}
                    kWh
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Ersparnis pro Jahr</p>
                  <p className="stat-mono mt-1 text-lg text-foreground">
                    CHF{" "}
                    {Intl.NumberFormat("de-CH").format(livePreview.annualSavingsChf.realistic)}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0 || submitting}
                className="btn-secondary w-full disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
              >
                Zurück
              </button>

              {step < stepConfig.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary w-full sm:w-auto"
                >
                  Weiter <ArrowRight className="size-4" aria-hidden />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || !isValid || !leadValid}
                  className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden /> Wird gesendet …
                    </>
                  ) : (
                    <>
                      Anfrage senden & auswerten <ArrowRight className="size-4" aria-hidden />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        ) : (
          <div ref={resultRef} className="mt-8">
            <CalculatorResultCard result={result} onReset={reset} />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Eingebetteter Block für die manuellen Dachdaten — wird im Step 0
 * eingeblendet wenn keine Sonnendach-Daten vorliegen oder der User
 * sie überschreiben will.
 */
function ManualRoofInputs(props: {
  form: ReturnType<typeof useForm<SolarCalculatorFormInput>>;
  register: ReturnType<typeof useForm<SolarCalculatorFormInput>>["register"];
  errors: ReturnType<typeof useForm<SolarCalculatorFormInput>>["formState"]["errors"];
  values: SolarCalculatorFormInput;
  setValue: ReturnType<typeof useForm<SolarCalculatorFormInput>>["setValue"];
}) {
  const { form, register, errors, values, setValue } = props;
  return (
    <FieldGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="canton">Kanton</FieldLabel>
          <CantonSelect
            id="canton"
            value={values.canton}
            onValueChange={(v) => setValue("canton", v, { shouldValidate: true })}
            invalid={!!errors.canton}
          />
          <FieldError errors={errors.canton ? [errors.canton] : undefined} />
        </Field>
        <Field>
          <FieldLabel htmlFor="postalCode">PLZ (optional)</FieldLabel>
          <Input
            id="postalCode"
            inputMode="numeric"
            maxLength={4}
            placeholder="2540"
            aria-invalid={!!errors.postalCode}
            {...register("postalCode")}
            className="h-12"
          />
          <FieldError errors={errors.postalCode ? [errors.postalCode] : undefined} />
        </Field>
      </div>
      <RoofInputs form={form} />
    </FieldGroup>
  );
}
