"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, MapPin, Search } from "lucide-react";

import type {
  GeocodeResult,
  SonnendachBuilding,
  SonnendachQueryResult,
  SonnendachSegment,
} from "@/lib/sonnendach/types";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

// MapLibre läuft nur im Browser, nicht im SSR.
const RoofMap = dynamic(
  () => import("./roof-map").then((m) => m.RoofMap),
  { ssr: false, loading: () => <MapSkeleton /> },
);

function MapSkeleton() {
  const t = useTranslations("calculator.address");
  return (
    <div className="neu-in flex h-72 w-full items-center justify-center rounded-2xl text-xs text-muted-foreground sm:h-80">
      {t("mapLoading")}
    </div>
  );
}

export type AddressStepSelection = {
  address: GeocodeResult;
  building: SonnendachBuilding;
  selectedSegmentIds: number[];
};

type Props = {
  initialQuery?: string;
  onSelect: (selection: AddressStepSelection) => void;
  /** Optional: wird aufgerufen, wenn der User die aktuelle Sonnendach-Auswahl löscht. */
  onClear?: () => void;
};

function useDebounced<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/**
 * Default-Auswahl-Filter: ALLE Dachseiten werden vorausgewählt — Süd, Ost,
 * West, Nord, Flachdach. Moderne PV-Anlagen nutzen das ganze Dach, weil
 * Ost-/Westflächen den Eigenverbrauch glätten und selbst Nordseiten in der
 * Schweiz noch 50–60 % des Süd-Ertrags liefern.
 *
 * Ausgeschlossen sind nur:
 * - Klasse 1 (Gering) — wirtschaftlich nicht sinnvoll
 * - Sehr kleine Segmente (< 3 m²) — keine Modulanordnung möglich
 *
 * Der User kann einzelne Segmente in der Detailansicht abwählen, falls er
 * z. B. eine Nordseite nicht belegen will.
 */
function isWorthSelecting(s: SonnendachSegment): boolean {
  if (s.suitabilityClass < 2) return false;
  if (s.areaM2 < 3) return false;
  return true;
}

function classToColor(klasse: number): string {
  if (klasse >= 4.5) return "bg-accent text-[#6E5510]";
  if (klasse >= 3.5) return "bg-accent text-[#6E5510]";
  if (klasse >= 2.5) return "bg-secondary text-foreground";
  return "bg-secondary text-muted-foreground";
}

/** Übersetzungsschlüssel (calculator.address.classes.*) für die Eignungsklasse. */
function classKey(klasse: number): "excellent" | "veryGood" | "good" | "medium" | "low" {
  if (klasse >= 4.5) return "excellent";
  if (klasse >= 3.5) return "veryGood";
  if (klasse >= 2.5) return "good";
  if (klasse >= 1.5) return "medium";
  return "low";
}

export function AddressStep({ initialQuery = "", onSelect, onClear }: Props) {
  const t = useTranslations("calculator.address");
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounced(query, 280);

  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedAddress, setSelectedAddress] = useState<GeocodeResult | null>(null);
  const [roofs, setRoofs] = useState<SonnendachQueryResult | null>(null);
  const [loadingRoofs, setLoadingRoofs] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<Set<number>>(new Set());

  // Adress-Suche
  useEffect(() => {
    if (debouncedQuery.trim().length < 3 || selectedAddress) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setSearching(true);
    setError(null);
    fetch(`/api/geocode?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((d: { results?: GeocodeResult[]; error?: string }) => {
        if (cancelled) return;
        if (d.error) setError(d.error);
        setResults(d.results ?? []);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : t("searchFailed"));
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
    return () => {
      cancelled = true;
    };
    // t bewusst nicht in Deps — stabile Übersetzungsfunktion, Effect bleibt wie vorher.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedAddress]);

  // Sonnendach-Lookup nach Adress-Auswahl
  useEffect(() => {
    if (!selectedAddress) {
      setRoofs(null);
      return;
    }
    let cancelled = false;
    setLoadingRoofs(true);
    setRoofs(null);
    fetch(
      `/api/sonnendach?lat=${selectedAddress.lat}&lon=${selectedAddress.lon}`,
    )
      .then((r) => r.json())
      .then((d: SonnendachQueryResult) => {
        if (cancelled) return;
        setRoofs(d);
        // Auto-Select des grössten Gebäudes (mit höchstem Stromertrag).
        // Default-Segmente: nur die wirklich PV-tauglichen (Klasse ≥ 3 = Gut+
        // und Orientierung nicht nach Norden), damit wir keine ungeeigneten
        // Flächen ungewollt mitziehen.
        if (d.buildings[0]) {
          setSelectedBuildingId(d.buildings[0].buildingId);
          setSelectedSegmentIds(
            new Set(
              d.buildings[0].segments
                .filter((s) => isWorthSelecting(s))
                .map((s) => s.id),
            ),
          );
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : t("sonnendachFailed"));
      })
      .finally(() => {
        if (!cancelled) setLoadingRoofs(false);
      });
    return () => {
      cancelled = true;
    };
    // t bewusst nicht in Deps — stabile Übersetzungsfunktion, Effect bleibt wie vorher.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress]);

  const selectedBuilding = useMemo(() => {
    return roofs?.buildings.find((b) => b.buildingId === selectedBuildingId) ?? null;
  }, [roofs, selectedBuildingId]);

  const selectedAggregate = useMemo(() => {
    if (!selectedBuilding) return null;
    const segs = selectedBuilding.segments.filter((s) =>
      selectedSegmentIds.has(s.id),
    );
    if (segs.length === 0) return null;
    const totalArea = segs.reduce((s, x) => s + x.areaM2, 0);
    const totalUsable = segs.reduce((s, x) => s + x.usableAreaM2, 0);
    const totalYield = segs.reduce((s, x) => s + x.electricityYieldKwhYear, 0);
    const weightedIrr =
      segs.reduce((s, x) => s + x.specificIrradiationKwhM2Year * x.areaM2, 0) /
      Math.max(totalArea, 1);
    const avgClass =
      segs.reduce((s, x) => s + x.suitabilityClass * x.areaM2, 0) /
      Math.max(totalArea, 1);
    return {
      totalAreaM2: Math.round(totalArea * 10) / 10,
      usableAreaM2: Math.round(totalUsable * 10) / 10,
      totalElectricityYieldKwhYear: Math.round(totalYield),
      weightedSpecificIrradiationKwhM2Year: Math.round(weightedIrr),
      averageSuitabilityClass: Math.round(avgClass * 10) / 10,
      segmentCount: segs.length,
    };
  }, [selectedBuilding, selectedSegmentIds]);

  function pickAddress(addr: GeocodeResult) {
    setSelectedAddress(addr);
    setQuery(addr.label);
    setResults([]);
  }

  function clearAddress() {
    setSelectedAddress(null);
    setRoofs(null);
    setSelectedBuildingId(null);
    setSelectedSegmentIds(new Set());
    onClear?.();
  }

  function toggleSegment(id: number) {
    setSelectedSegmentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Auto-Apply: jede Änderung der Auswahl propagiert sofort an den Parent.
  // So muss der User keinen extra Confirm-Button drücken.
  useEffect(() => {
    if (!selectedAddress || !selectedBuilding) return;
    onSelect({
      address: selectedAddress,
      building: selectedBuilding,
      selectedSegmentIds: Array.from(selectedSegmentIds),
    });
    // onSelect bewusst nicht in Deps — würde bei Parent-Re-Renders zu Loop führen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress, selectedBuilding, selectedSegmentIds]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Field>
          <FieldLabel htmlFor="addr-search">{t("label")}</FieldLabel>
          <FieldDescription>{t("description")}</FieldDescription>
          <div className="relative">
            <Input
              id="addr-search"
              autoComplete="off"
              placeholder={t("placeholder")}
              value={query}
              onChange={(e) => {
                if (selectedAddress) clearAddress();
                setQuery(e.target.value);
              }}
              className="h-12 pl-11 pr-11"
            />
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            {searching && (
              <Loader2
                aria-hidden
                className="absolute right-4 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
              />
            )}
          </div>
        </Field>

        {/* Result-Liste */}
        {results.length > 0 && !selectedAddress && (
          <ul className="neu rounded-2xl p-2">
            {results.map((r, i) => (
              <li key={`${r.lat}-${r.lon}-${i}`}>
                <button
                  type="button"
                  onClick={() => pickAddress(r)}
                  className="ring-focus flex min-h-12 w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition-[box-shadow] duration-150 hover:shadow-[var(--neu-inset)]"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {r.street || r.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {r.postalCode} {r.city}
                      {r.canton && ` · ${r.canton}`}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p className="neu-in rounded-2xl px-4 py-3 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>

      {/* Sonnendach-Resultate */}
      {selectedAddress && (
        <div className="flex flex-col gap-4">
          <div className="neu-in flex items-start justify-between gap-3 rounded-2xl px-5 py-4">
            <div className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {selectedAddress.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedAddress.canton &&
                    t("cantonPrefix", { canton: selectedAddress.canton })}
                  {t("clickHint")}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearAddress}
              className="btn-ghost min-h-11 shrink-0 text-sm"
            >
              {t("change")}
            </button>
          </div>

          <RoofMap
            lat={selectedAddress.lat}
            lon={selectedAddress.lon}
            showSonnendach
            onMapClick={(newLat, newLon) => {
              // Karten-Klick: nur die Koordinaten anpassen, Adress-Label
              // bleibt gleich. So kann der User ein Nachbar-/Hinterhaus
              // anwählen, dessen Adresse formal nicht im Geocoder steht.
              setSelectedAddress({
                ...selectedAddress,
                lat: newLat,
                lon: newLon,
              });
            }}
          />

          {loadingRoofs && (
            <div className="neu-in flex items-center gap-2 rounded-2xl px-5 py-4 text-sm text-muted-foreground">
              <Loader2 aria-hidden className="size-4 animate-spin" />
              {t("loading")}
            </div>
          )}

          {!loadingRoofs && roofs && roofs.empty && (
            <div className="neu-in rounded-2xl p-5 text-sm text-foreground">
              <p className="font-medium">{t("noData")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("noDataText")}</p>
            </div>
          )}

          {selectedBuilding && selectedAggregate && (
            <div className="neu-in rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6E5510]">
                    {t("badge")}
                  </span>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {t("detected", {
                      quality: t(`classes.${classKey(selectedAggregate.averageSuitabilityClass)}`),
                    })}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    <span className="stat-mono text-foreground">
                      {selectedAggregate.usableAreaM2.toFixed(0)} m²
                    </span>{" "}
                    {t("usableArea")}{" "}
                    <span className="stat-mono text-foreground">
                      {Intl.NumberFormat("de-CH").format(selectedAggregate.totalElectricityYieldKwhYear)}{" "}
                      kWh
                    </span>{" "}
                    {t("modelYield")}
                  </p>
                </div>
              </div>

              <details className="mt-4 group">
                <summary className="ring-focus inline-flex min-h-11 cursor-pointer select-none items-center rounded-md text-sm font-semibold text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 transition-colors hover:text-[color:var(--solar-gold-dark)]">
                  {t("adjustSegments", { count: selectedBuilding.segments.length })}
                </summary>
                <ul className="mt-3 grid gap-2">
                  {selectedBuilding.segments.map((s) => {
                    const checked = selectedSegmentIds.has(s.id);
                    return (
                      <li key={s.id}>
                        <SegmentRow
                          segment={s}
                          checked={checked}
                          onToggle={() => toggleSegment(s.id)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SegmentRow({
  segment,
  checked,
  onToggle,
}: {
  segment: SonnendachSegment;
  checked: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("calculator.address");

  function orientationKey(
    deg: number,
    tilt: number,
  ): "flat" | "s" | "sw" | "w" | "nw" | "n" | "ne" | "e" | "se" {
    if (tilt < 5) return "flat";
    const a = ((deg + 360) % 360);
    if (a >= 337.5 || a < 22.5) return "s";
    if (a < 67.5) return "sw";
    if (a < 112.5) return "w";
    if (a < 157.5) return "nw";
    if (a < 202.5) return "n";
    if (a < 247.5) return "ne";
    if (a < 292.5) return "e";
    return "se";
  }

  return (
    <label
      className={cn(
        "ring-focus neu-sm group flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition-[box-shadow,transform] duration-150",
        checked
          ? "shadow-[var(--neu-inset)]"
          : "hover:-translate-y-px",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="ring-focus size-4 cursor-pointer rounded accent-[color:var(--solar-gold-dark)]"
      />
      <div className="flex flex-1 flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-sm font-medium text-foreground">
          {t("segment", { nr: String(segment.segmentNr) })}{" "}
          <span className="stat-mono">{segment.areaM2.toFixed(0)} m²</span>
        </span>
        <span className="text-xs text-muted-foreground">
          {t(`orientations.${orientationKey(segment.orientationDeg, segment.tiltDeg)}`)} ·{" "}
          {segment.tiltDeg}
          {t("tiltSuffix")}{" "}
          {Intl.NumberFormat("de-CH").format(segment.specificIrradiationKwhM2Year)}{" "}
          {t("irradiationUnit")}
        </span>
        <span className="stat-mono text-xs text-muted-foreground">
          → {Intl.NumberFormat("de-CH").format(segment.electricityYieldKwhYear)} {t("yieldUnit")}
        </span>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
          classToColor(segment.suitabilityClass),
        )}
      >
        {t(`classes.${classKey(segment.suitabilityClass)}`)}
      </span>
    </label>
  );
}
