"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  PencilLine,
  Sparkles,
} from "lucide-react";
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
  electricityPriceRappen: 30,
  feedInTariffRappen: 10,
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
      <div className="surface-glass relative overflow-hidden rounded-3xl">
        <div className="border-b border-border/60 px-6 pt-6 pb-5 lg:px-8 lg:pt-8">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div>
              <p className="eyebrow">Solarrechner</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                Erstauswertung in 60 Sekunden
              </h2>
            </div>
            <ol className="flex flex-wrap items-center gap-y-2">
              {[...stepConfig.map((s) => s.label), "Ergebnis"].map((label, i) => {
                const isActive = i === step && !result;
                const isDone = i < step || Boolean(result);
                return (
                  <li key={label} className="flex items-center">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className={`mx-1.5 hidden h-px w-5 sm:block ${
                          i <= step || result
                            ? "bg-[color:var(--solar-emerald)]/50"
                            : "bg-border"
                        }`}
                      />
                    )}
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                        isActive
                          ? "bg-[color:var(--solar-leaf)]/60 font-medium text-[color:var(--solar-ink)]"
                          : isDone
                            ? "text-[color:var(--solar-emerald)]"
                            : "text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="size-3.5 shrink-0" />
                      ) : (
                        <span className="stat-mono text-[11px]">0{i + 1}</span>
                      )}
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
            className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-border/70"
          >
            <div
              className="h-full rounded-full bg-[color:var(--solar-emerald)] transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!result ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-6 lg:px-8 lg:py-8"
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
                      <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--solar-gold)]/50 bg-[color:var(--solar-gold)]/10 px-4 py-3">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-orange)]" />
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
                      <div className="rounded-2xl border border-border bg-white/70 p-5 lg:p-6">
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
                        className="ring-focus flex items-center gap-2 self-start rounded-md text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        <PencilLine className="size-3.5" />
                        {showManualOverride
                          ? "Manuelle Werte ausblenden"
                          : "Werte manuell überschreiben (selten nötig)"}
                      </button>
                    )}

                    {hasSonnendach && showManualOverride && (
                      <div className="rounded-2xl border border-dashed border-border bg-background/40 p-5">
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
                      <div className="flex items-start gap-3 rounded-2xl border border-[color:var(--solar-emerald)]/30 bg-[color:var(--solar-emerald)]/5 px-4 py-3">
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-emerald)]" />
                        <div className="text-sm">
                          <p className="font-medium text-foreground">
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
                            className={`ring-focus flex min-h-12 flex-col items-start gap-0.5 rounded-2xl border p-4 text-left transition-colors ${
                              values.buildingType === b.value
                                ? "border-[color:var(--solar-ink)] bg-[color:var(--solar-ink)] text-[color:var(--solar-navy-foreground)]"
                                : "border-border bg-card hover:bg-secondary"
                            }`}
                          >
                            <span className="text-sm font-semibold">{b.label}</span>
                            <span className="text-xs opacity-80">{b.description}</span>
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
                        EFH 4’000–6’000, mit Wärmepumpe + EV 8’000–14’000.
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
                            className={`ring-focus min-h-12 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                              values.wantsBattery === o.value
                                ? "border-[color:var(--solar-emerald)] bg-[color:var(--solar-emerald)]/10"
                                : "border-border bg-card hover:bg-secondary"
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
                      className="ring-focus flex items-center gap-2 self-start rounded-md text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      <ChevronDown
                        className={`size-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      />
                      {showAdvanced ? "Erweiterte Optionen ausblenden" : "Erweiterte Optionen"}
                    </button>

                    {showAdvanced && (
                      <div className="rounded-2xl border border-dashed border-border bg-background/40 p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="electricityPriceRappen">
                              Strompreis (Rp./kWh)
                            </FieldLabel>
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
                                className={`ring-focus min-h-12 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                                  values.financingInterest === o.value
                                    ? "border-[color:var(--solar-ink)] bg-[color:var(--solar-ink)] text-[color:var(--solar-navy-foreground)]"
                                    : "border-border bg-card hover:bg-secondary"
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
                    <div className="rounded-2xl border border-[color:var(--solar-emerald)]/25 bg-[color:var(--solar-emerald)]/5 p-5">
                      <p className="eyebrow text-[color:var(--solar-emerald)]">
                        Letzter Schritt
                      </p>
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
                      <div className="rounded-2xl border border-border bg-card/60 px-4 py-3 text-xs text-muted-foreground">
                        <p className="font-medium text-foreground">Adresse aus Schritt 1</p>
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
                          <a href="/datenschutz" className="underline underline-offset-4">
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
              <div className="mt-6 grid gap-3 rounded-2xl border border-dashed border-border bg-background/40 p-4 text-xs text-muted-foreground sm:grid-cols-3">
                <span className="flex items-baseline justify-between gap-2 sm:flex-col sm:gap-0.5">
                  Anlage
                  <strong className="stat-mono text-sm font-semibold text-foreground">
                    {livePreview.recommendedKwp} kWp
                  </strong>
                </span>
                <span className="flex items-baseline justify-between gap-2 sm:flex-col sm:gap-0.5">
                  Jahresproduktion
                  <strong className="stat-mono text-sm font-semibold text-foreground">
                    {Intl.NumberFormat("de-CH").format(
                      livePreview.annualProductionKwh.realistic,
                    )}{" "}
                    kWh
                  </strong>
                </span>
                <span className="flex items-baseline justify-between gap-2 sm:flex-col sm:gap-0.5">
                  Ersparnis pro Jahr
                  <strong className="stat-mono text-sm font-semibold text-foreground">
                    CHF{" "}
                    {Intl.NumberFormat("de-CH").format(livePreview.annualSavingsChf.realistic)}
                  </strong>
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0 || submitting}
                className="btn-ghost min-h-12 justify-center px-3 disabled:pointer-events-none disabled:opacity-40 sm:justify-start"
              >
                <ArrowLeft className="size-4" /> Zurück
              </button>

              {step < stepConfig.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary w-full sm:w-auto"
                >
                  Weiter <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting || !isValid || !leadValid}
                  className="btn-primary w-full disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Wird gesendet …
                    </>
                  ) : (
                    <>
                      Anfrage senden & auswerten <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        ) : (
          <div ref={resultRef} className="px-6 py-8 lg:px-8 lg:py-10">
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
