"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Loader2, MapPin, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type AddressFieldName = "street" | "houseNumber" | "postalCode" | "city";

type Suggestion = {
  label: string;
  street: string;
  postalCode: string;
  city: string;
};

type AddressFieldsProps = {
  /** Präfix für IDs, damit mehrere Instanzen kollisionsfrei bleiben. */
  idPrefix: string;
  register: (name: AddressFieldName) => UseFormRegisterReturn;
  setFieldValue: (name: AddressFieldName, value: string) => void;
  errors: Partial<Record<AddressFieldName, { message?: string } | undefined>>;
};

/**
 * Trennt einen zusammengesetzten Strassenstring in Strasse + Hausnummer.
 * "Oelirain 1a" → { street: "Oelirain", houseNumber: "1a" }.
 */
export function splitStreetNumber(full: string): {
  street: string;
  houseNumber: string;
} {
  const trimmed = full.trim();
  const m = trimmed.match(
    /^(.+?)[\s,]+(\d+\s*[a-zA-Z]?(?:\s*[-–/]\s*\d+\s*[a-zA-Z]?)?)$/,
  );
  if (m) return { street: m[1].trim(), houseNumber: m[2].replace(/\s+/g, "") };
  return { street: trimmed, houseNumber: "" };
}

/** Setzt eine Schweizer Adresse aus Einzelfeldern zu einem Klartext zusammen. */
export function composeSwissAddress(v: {
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
}): string {
  const line1 = [v.street, v.houseNumber]
    .map((s) => s?.trim())
    .filter(Boolean)
    .join(" ");
  const line2 = [v.postalCode, v.city]
    .map((s) => s?.trim())
    .filter(Boolean)
    .join(" ");
  return [line1, line2].filter(Boolean).join(", ");
}

/**
 * Adressblock mit automatischer Adresserkennung über den offiziellen
 * Schweizer Bundes-Geocoder (api3.geo.admin.ch, via /api/geocode) und
 * separaten Pflichtfeldern für Strasse, Nr., PLZ und Ort. Die Suche füllt
 * die Einzelfelder automatisch; sie bleiben jederzeit manuell editierbar.
 */
export function AddressFields({
  idPrefix,
  register,
  setFieldValue,
  errors,
}: AddressFieldsProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  // Debouncte Abfrage des Bundes-Geocoders. Alle State-Updates laufen im
  // Timer-Callback (asynchron), damit kein synchrones setState im Effect steht.
  useEffect(() => {
    const q = query.trim();
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (q.length < 3) {
        if (!cancelled) {
          setResults([]);
          setOpen(false);
          setLoading(false);
        }
        return;
      }
      if (!cancelled) setLoading(true);
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
        const data = (await res.json()) as { results?: Suggestion[] };
        if (cancelled) return;
        const list = data.results ?? [];
        setResults(list);
        setOpen(list.length > 0);
        setActive(-1);
      } catch {
        if (!cancelled) {
          setResults([]);
          setOpen(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, q.length < 3 ? 0 : 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Klick ausserhalb schliesst die Vorschlagsliste
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function choose(s: Suggestion) {
    const { street, houseNumber } = splitStreetNumber(s.street);
    setFieldValue("street", street);
    setFieldValue("houseNumber", houseNumber);
    setFieldValue("postalCode", s.postalCode);
    setFieldValue("city", s.city);
    setQuery("");
    setResults([]);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const err = (name: AddressFieldName) => {
    const e = errors[name];
    return e ? [e] : undefined;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Automatische Adresserkennung */}
      <div ref={boxRef} className="relative">
        <FieldLabel htmlFor={`${idPrefix}-address-search`}>
          Adresse suchen
        </FieldLabel>
        <FieldDescription>
          Adresse eintippen – wir übernehmen Strasse, Nr., PLZ und Ort
          automatisch (offizielle Schweizer Adressdaten).
        </FieldDescription>
        <div className="relative mt-1.5">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id={`${idPrefix}-address-search`}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="z. B. Oelirain 1A, 2540 Grenchen"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => results.length > 0 && setOpen(true)}
            className="h-12 rounded-xl pl-10 pr-10"
          />
          {loading && (
            <Loader2
              aria-hidden
              className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
            />
          )}
        </div>
        {open && results.length > 0 && (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-20 mt-1.5 max-h-64 w-full overflow-auto rounded-xl border border-border bg-popover p-1 shadow-[0_20px_50px_-24px_rgba(17,19,21,0.35)]"
          >
            {results.map((s, i) => (
              <li key={`${s.label}-${i}`} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onClick={() => choose(s)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "ring-focus flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm leading-snug transition-colors",
                    i === active ? "bg-secondary" : "hover:bg-secondary/70",
                  )}
                >
                  <MapPin
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-[color:var(--solar-emerald)]"
                  />
                  <span className="text-foreground">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Einzelne Pflichtfelder — bleiben manuell editierbar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
        <Field className="sm:col-span-4">
          <FieldLabel htmlFor={`${idPrefix}-street`}>Strasse *</FieldLabel>
          <Input
            id={`${idPrefix}-street`}
            autoComplete="address-line1"
            aria-invalid={!!errors.street}
            className="h-12 rounded-xl px-4"
            {...register("street")}
          />
          <FieldError errors={err("street")} />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor={`${idPrefix}-houseNumber`}>Nr. *</FieldLabel>
          <Input
            id={`${idPrefix}-houseNumber`}
            inputMode="text"
            aria-invalid={!!errors.houseNumber}
            className="h-12 rounded-xl px-4"
            {...register("houseNumber")}
          />
          <FieldError errors={err("houseNumber")} />
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor={`${idPrefix}-postalCode`}>PLZ *</FieldLabel>
          <Input
            id={`${idPrefix}-postalCode`}
            inputMode="numeric"
            maxLength={4}
            autoComplete="postal-code"
            aria-invalid={!!errors.postalCode}
            className="h-12 rounded-xl px-4"
            {...register("postalCode")}
          />
          <FieldError errors={err("postalCode")} />
        </Field>
        <Field className="sm:col-span-4">
          <FieldLabel htmlFor={`${idPrefix}-city`}>Ort *</FieldLabel>
          <Input
            id={`${idPrefix}-city`}
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            className="h-12 rounded-xl px-4"
            {...register("city")}
          />
          <FieldError errors={err("city")} />
        </Field>
      </div>
    </div>
  );
}
