"use client";

import { useTranslations } from "next-intl";
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

const orientationValues: SolarCalculatorFormInput["orientation"][] = [
  "sued",
  "suedost",
  "suedwest",
  "ost",
  "west",
  "flachdach",
  "gemischt",
];

const tiltValues: { value: SolarCalculatorFormInput["tilt"]; key: string }[] = [
  { value: "0-10", key: "t0_10" },
  { value: "10-25", key: "t10_25" },
  { value: "25-40", key: "t25_40" },
  { value: "40+", key: "t40plus" },
];

const shadingValues: SolarCalculatorFormInput["shading"][] = [
  "keine",
  "leicht",
  "mittel",
  "stark",
];

type Props = {
  form: UseFormReturn<SolarCalculatorFormInput>;
};

export function RoofInputs({ form }: Props) {
  const t = useTranslations("calculator.roof");
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
        <FieldLabel htmlFor="roofAreaM2">{t("area")}</FieldLabel>
        <FieldDescription>{t("areaDescription")}</FieldDescription>
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
          {t("usable")}{" "}
          <span className="stat-mono text-foreground">
            {usable ?? 75} %
          </span>
        </FieldLabel>
        <FieldDescription>{t("usableDescription")}</FieldDescription>
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
        <FieldLabel htmlFor="orientation">{t("orientation")}</FieldLabel>
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
            {/* Label statt Rohwert (base-ui zeigt sonst z.B. «sued») */}
            <SelectValue placeholder={t("orientationPlaceholder")}>
              {(v: string | null) =>
                v ? t(`orientations.${v}`) : t("orientationPlaceholder")
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {orientationValues.map((o) => (
              <SelectItem key={o} value={o}>
                {t(`orientations.${o}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError errors={errors.orientation ? [errors.orientation] : undefined} />
      </Field>

      <Field>
        <FieldLabel htmlFor="tilt">{t("tilt")}</FieldLabel>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tiltValues.map((tv) => (
            <button
              key={tv.value}
              type="button"
              onClick={() =>
                setValue("tilt", tv.value, { shouldValidate: true })
              }
              aria-pressed={tilt === tv.value}
              className={`ring-focus neu-sm min-h-12 rounded-2xl px-3 py-2.5 text-sm font-medium transition-[box-shadow,color,transform] duration-150 ${
                tilt === tv.value
                  ? "shadow-[var(--neu-inset)] font-semibold text-[color:var(--solar-gold-dark)]"
                  : "text-foreground hover:-translate-y-px"
              }`}
            >
              {t(`tilts.${tv.key}`)}
            </button>
          ))}
        </div>
        <FieldError errors={errors.tilt ? [errors.tilt] : undefined} />
      </Field>

      <Field>
        <FieldLabel>{t("shading")}</FieldLabel>
        <div className="grid gap-2 sm:grid-cols-2">
          {shadingValues.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setValue("shading", s, { shouldValidate: true })
              }
              aria-pressed={shading === s}
              className={`ring-focus neu-sm flex min-h-12 flex-col items-start gap-0.5 rounded-2xl px-4 py-3 text-left transition-[box-shadow,color,transform] duration-150 ${
                shading === s
                  ? "shadow-[var(--neu-inset)] text-[color:var(--solar-gold-dark)]"
                  : "text-foreground hover:-translate-y-px"
              }`}
            >
              <span className="text-sm font-semibold">{t(`shadings.${s}.label`)}</span>
              <span className="text-xs text-muted-foreground">
                {t(`shadings.${s}.description`)}
              </span>
            </button>
          ))}
        </div>
        <FieldError errors={errors.shading ? [errors.shading] : undefined} />
      </Field>
    </FieldGroup>
  );
}
