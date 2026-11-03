import { z } from "zod";

import { cantonCodes } from "@/lib/solar/canton-data";

const swissPhoneRegex = /^[+0-9 ()/-]{6,30}$/;

export const heatingTypes = [
  "oel",
  "gas",
  "waermepumpe",
  "fernwaerme",
  "holz",
  "elektro",
  "andere",
] as const;
export type HeatingType = (typeof heatingTypes)[number];

export const heatingTypeLabels: Record<HeatingType, string> = {
  oel: "Ölheizung",
  gas: "Gasheizung",
  waermepumpe: "Wärmepumpe",
  fernwaerme: "Fernwärme",
  holz: "Holz / Pellet",
  elektro: "Elektro",
  andere: "Andere",
};

/** Übersetzbare Validierungsmeldungen der Lead-/Kontaktformulare. */
export type LeadMessages = {
  name: string;
  email: string;
  phoneInvalid: string;
  phoneRequired: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  heatingType: string;
  householdSize: string;
  consent: string;
  message?: string;
};

/** Deutsche Standardmeldungen — werden von API-Routen (ohne Locale) genutzt. */
export const DE_MESSAGES: LeadMessages = {
  name: "Bitte geben Sie Ihren Namen an.",
  email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
  phoneInvalid: "Telefonnummer ungültig.",
  phoneRequired: "Telefon ist Pflicht für Offerten- und Beratungsanfragen.",
  street: "Bitte geben Sie die Strasse an.",
  houseNumber: "Nr. fehlt.",
  postalCode: "Gültige PLZ angeben (4-stellig).",
  city: "Bitte geben Sie den Ort an.",
  heatingType: "Bitte wählen Sie Ihre aktuelle Heizart.",
  householdSize: "Bitte geben Sie die Anzahl Personen im Haushalt an.",
  consent: "Bitte stimmen Sie der Datenschutzerklärung zu.",
};

/** Baut das Lead-Schema mit den übergebenen (übersetzten) Meldungen. */
export function buildLeadSchema(m: LeadMessages) {
  return z.object({
    name: z.string().trim().min(2, m.name).max(120),
    email: z.string().trim().email(m.email),
    phone: z
      .string()
      .trim()
      .regex(swissPhoneRegex, m.phoneInvalid)
      .optional()
      .or(z.literal("")),
    /** Zusammengesetzte Hausadresse (aus den Einzelfeldern generiert). */
    address: z.string().trim().max(240).optional().or(z.literal("")),
    /** Strukturierte Adresse — Einzelfelder, in allen Lead-Formularen Pflicht. */
    street: z.string().trim().max(120).optional().or(z.literal("")),
    houseNumber: z.string().trim().max(20).optional().or(z.literal("")),
    postalCode: z.string().trim().max(10).optional().or(z.literal("")),
    city: z.string().trim().max(80).optional().or(z.literal("")),
    /** Aktuelle Heizart — Pflicht auf der Offerten-Seite. */
    heatingType: z.enum(heatingTypes).optional(),
    /** Anzahl Personen im Haushalt — Pflicht bei Offerten/Beratungs-Anfragen. */
    householdSize: z.number().int().min(1).max(30).optional(),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    consent: z.boolean().refine((v) => v === true, m.consent),
    source: z.string().max(60).optional(),
    // Honeypot — muss leer bleiben.
    company_website: z.string().max(0).optional().or(z.literal("")),
  });
}

export const leadSchema = buildLeadSchema(DE_MESSAGES);

export type LeadInput = z.infer<typeof leadSchema>;

const swissPostalRegex = /^\d{4}$/;

type AddressData = {
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
};

/**
 * Fügt Pflichtfeld-Fehler für die strukturierte Adresse hinzu (Strasse, Nr.,
 * PLZ, Ort) — mit übersetzten Meldungen. Wird von Kontakt- und
 * Angebots-Formular geteilt, damit in allen Formularen eine vollständige,
 * exakte Adresse verlangt wird.
 */
export function addAddressIssuesWith(
  m: LeadMessages,
  data: AddressData,
  ctx: z.RefinementCtx,
) {
  if (!data.street || data.street.trim().length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["street"],
      message: m.street,
    });
  }
  if (!data.houseNumber || data.houseNumber.trim().length < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["houseNumber"],
      message: m.houseNumber,
    });
  }
  if (!data.postalCode || !swissPostalRegex.test(data.postalCode.trim())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["postalCode"],
      message: m.postalCode,
    });
  }
  if (!data.city || data.city.trim().length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["city"],
      message: m.city,
    });
  }
}

/** Deutsche Variante (Standard) von addAddressIssuesWith. */
export function addAddressIssues(data: AddressData, ctx: z.RefinementCtx) {
  addAddressIssuesWith(DE_MESSAGES, data, ctx);
}

export const cantonEnum = z.enum(cantonCodes as readonly [string, ...string[]]);

export const sonnendachAggregateSchema = z.object({
  totalAreaM2: z.number().min(0).max(50_000),
  usableAreaM2: z.number().min(0).max(50_000),
  totalElectricityYieldKwhYear: z.number().min(0).max(5_000_000),
  weightedSpecificIrradiationKwhM2Year: z.number().min(200).max(2000),
  segmentCount: z.number().int().min(1).max(200),
  averageSuitabilityClass: z.number().min(1).max(5),
});

export const solarCalculatorSchema = z.object({
  buildingType: z.enum([
    "einfamilienhaus",
    "mehrfamilienhaus",
    "gewerbe",
    "landwirtschaft",
    "sonstiges",
  ]),
  canton: cantonEnum,
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{4}$/, "Bitte geben Sie eine gültige Schweizer Postleitzahl an.")
    .optional()
    .or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  address: z.string().trim().max(160).optional().or(z.literal("")),
  roofAreaM2: z.number().min(10, "Mindestens 10 m².").max(5000),
  usableRoofPercent: z.number().min(30).max(100),
  orientation: z.enum([
    "sued",
    "suedost",
    "suedwest",
    "ost",
    "west",
    "flachdach",
    "gemischt",
  ]),
  tilt: z.enum(["0-10", "10-25", "25-40", "40+"]),
  shading: z.enum(["keine", "leicht", "mittel", "stark"]),
  annualConsumptionKwh: z.number().min(500).max(500_000),
  hasHeatPump: z.boolean(),
  hasEv: z.boolean(),
  wantsBattery: z.enum(["ja", "nein", "unsicher"]),
  electricityPriceRappen: z.number().min(5).max(80).optional(),
  feedInTariffRappen: z.number().min(0).max(60).optional(),
  financingInterest: z.enum(["ja", "nein", "unsicher"]).optional(),
  sonnendach: sonnendachAggregateSchema.optional(),
});

export type SolarCalculatorFormInput = z.infer<typeof solarCalculatorSchema>;

export const solarCalculationRequestSchema = z.object({
  input: solarCalculatorSchema,
  contact: leadSchema.partial().optional(),
});

/**
 * Kontaktformular: Die vollständige Adresse (Strasse, Nr., PLZ, Ort) ist
 * immer Pflicht. Wenn topic === "offerte" (Offerten- oder Beratungs-Anfrage)
 * werden Telefon, Heizart und Haushaltsgrösse zusätzlich zu Pflichtfeldern.
 */
const swissPhoneRequired = /^[+0-9 ()/-]{6,30}$/;

export const contactTopics = [
  "allgemein",
  "offerte",
  "solarrechner",
  "service",
  "finanzierung",
  "gewerbe",
] as const;
export type ContactTopic = (typeof contactTopics)[number];

/** Baut das Kontaktformular-Schema mit den übergebenen (übersetzten) Meldungen. */
export function buildContactFormSchema(m: LeadMessages) {
  return buildLeadSchema(m)
    .extend({
      topic: z.enum(contactTopics),
    })
    .superRefine((data, ctx) => {
      // Exakte Adresse in jedem Fall Pflicht.
      addAddressIssuesWith(m, data, ctx);
      // Offerte/Beratung: zusätzlich Telefon, Heizart, Haushaltsgrösse.
      if (data.topic !== "offerte") return;
      if (!data.phone || !swissPhoneRequired.test(data.phone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: m.phoneRequired,
        });
      }
      if (!data.heatingType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["heatingType"],
          message: m.heatingType,
        });
      }
      if (!data.householdSize || data.householdSize < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["householdSize"],
          message: m.householdSize,
        });
      }
    });
}

export const contactFormSchema = buildContactFormSchema(DE_MESSAGES);

export type ContactFormInput = z.infer<typeof contactFormSchema>;
