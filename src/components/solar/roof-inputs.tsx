"use client";

import type { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SolarCalculatorFormInput } from "@/lib/validations/lead";

const orientations: { value: SolarCalculatorFormInput["orientation"]; label: string }[] = [
  { value: "sued", label: "Süd" },
  { value: "suedost", label: "Südost" },
  { value: "suedwest", label: "Südwest" },
  { value: "ost", label: "Ost" },
  { value: "west", label: "West" },
  { value: "flachdach", label: "Flachdach" },
  { value: "gemischt", label: "Gemischt" },
];

const tilts: { value: SolarCalculatorFormInput["tilt"]; label: string }[] = [
  { value: "0-10", label: "0 – 10°" },
  { value: "10-25", label: "10 – 25°" },
  { value: "25-40", label: "25 – 40°" },
  { value: "40+", label: "40° und mehr" },
];

const shadings: { value: SolarCalculatorFormInput["shading"]; label: string; description: string }[] = [
  { value: "keine", label: "Keine", description: "Freies Dach" },
  { value: "leicht", label: "Leicht", description: "Einzelne Bäume oder Gauben" },
  { value: "mittel", label: "Mittel", description: "Mehrere Verschattungsquellen" },
  { value: "stark", label: "Stark", description: "Grosse Schattenwürfe über den Tag" },
];

type Props = {
  form: UseFormReturn<SolarCalculatorFormInput>;
};

export function RoofInputs({ form }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const orientation = watch("orientation");
  const tilt = watch("tilt");
  const shading = watch("shading");
  const usable = watch("usableRoofPercent");

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="roofAreaM2">Dachfläche (m²)</FieldLabel>
        <FieldDescription>
          Schätzen Sie die gesamte Dachfläche – wir berücksichtigen nutzbare Anteile separat.
        </FieldDescription>
        <Input
          id="roofAreaM2"
          type="number"
          inputMode="numeric"
          min={10}
          max={5000}
          step={1}
          aria-invalid={!!errors.roofAreaM2}
          {...register("roofAreaM2", { valueAsNumber: true })}
          className="h-12"
        />
        <FieldError errors={errors.roofAreaM2 ? [errors.roofAreaM2] : undefined} />
      </Field>

      <Field>
        <FieldLabel htmlFor="usableRoofPercent">
          Nutzbarer Anteil:{" "}
          <span className="stat-mono text-foreground">
            {usable ?? 75} %
          </span>
        </FieldLabel>
        <FieldDescription>
          Anteil ohne Dachfenster, Kamine, Lukarnen, Abstandsflächen.
        </FieldDescription>
        <Slider
          id="usableRoofPercent"
          min={30}
          max={100}
          step={5}
          value={[usable ?? 75]}
          onValueChange={(v) => {
            const next = Array.isArray(v) ? (v[0] ?? 75) : v;
            setValue("usableRoofPercent", next, { shouldValidate: true });
          }}
          className="mt-2"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="orientation">Dachausrichtung</FieldLabel>
        <Select
          value={orientation}
          onValueChange={(v) => {
            if (typeof v !== "string") return;
            setValue("orientation", v as SolarCalculatorFormInput["orientation"], {
              shouldValidate: true,
            });
          }}
        >
          <SelectTrigger
            id="orientation"
            className="neu-in h-12 w-full rounded-2xl border-0 bg-background px-4 text-sm focus-visible:border-0"
          >
            <SelectValue placeholder="Wählen" />
          </SelectTrigger>
          <SelectContent>
            {orientations.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={errors.orientation ? [errors.orientation] : undefined} />
      </Field>

      <Field>
        <FieldLabel htmlFor="tilt">Dachneigung</FieldLabel>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tilts.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() =>
                setValue("tilt", t.value, { shouldValidate: true })
              }
              aria-pressed={tilt === t.value}
              className={`ring-focus neu-sm min-h-12 rounded-2xl px-3 py-2.5 text-sm font-medium transition-[box-shadow,color,transform] duration-150 ${
                tilt === t.value
                  ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                  : "text-foreground hover:-translate-y-px"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <FieldError errors={errors.tilt ? [errors.tilt] : undefined} />
      </Field>

      <Field>
        <FieldLabel>Verschattung</FieldLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {shadings.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() =>
                setValue("shading", s.value, { shouldValidate: true })
              }
              aria-pressed={shading === s.value}
              className={`ring-focus neu-sm flex min-h-12 flex-col items-start gap-0.5 rounded-2xl px-4 py-3 text-left transition-[box-shadow,color,transform] duration-150 ${
                shading === s.value
                  ? "shadow-[var(--neu-inset)] text-[color:var(--solar-gold-dark)]"
                  : "text-foreground hover:-translate-y-px"
              }`}
            >
              <span className="text-sm font-semibold">{s.label}</span>
              <span className="text-xs text-muted-foreground">{s.description}</span>
            </button>
          ))}
        </div>
        <FieldError errors={errors.shading ? [errors.shading] : undefined} />
      </Field>
    </FieldGroup>
  );
}
