import "server-only";

/**
 * Übersetzt Supabase-Fehler in Meldungen, die im Admin direkt weiterhelfen.
 *
 * Der häufigste Fall in einem frisch aufgesetzten Projekt: Die Migration aus
 * `supabase/schema.sql` wurde noch nicht ausgeführt — dann fehlen Tabelle oder
 * Storage-Bucket. Eine generische «Speicherung fehlgeschlagen»-Meldung lässt
 * die Redaktion in diesem Fall im Dunkeln.
 */

type SupabaseLikeError = {
  code?: string;
  message?: string;
  status?: number;
} | null;

/** Fehlt die Tabelle (Migration nicht eingespielt)? */
function isMissingTable(error: SupabaseLikeError): boolean {
  if (!error) return false;
  // 42P01 = undefined_table (Postgres), PGRST205 = unbekannt im Schema-Cache
  if (error.code === "42P01" || error.code === "PGRST205") return true;
  const m = error.message?.toLowerCase() ?? "";
  return m.includes("could not find the table") || m.includes("does not exist");
}

/**
 * Liefert die Fehlermeldung für eine Datenbank-Operation im Admin.
 * `fallback` wird verwendet, wenn es kein bekannter Setup-Fehler ist.
 */
export function describeDbError(
  error: SupabaseLikeError,
  fallback: string,
  tabelle: string,
): string {
  if (isMissingTable(error)) {
    return `Die Tabelle «${tabelle}» existiert noch nicht. Bitte einmalig supabase/schema.sql im Supabase-SQL-Editor ausführen — danach funktioniert dieser Bereich.`;
  }
  return fallback;
}

/** Analog für Storage-Uploads (fehlender Bucket, Grössen-/Typ-Limit). */
export function describeStorageError(
  error: SupabaseLikeError,
  fallback: string,
): string {
  const m = error?.message?.toLowerCase() ?? "";
  if (m.includes("bucket not found") || m.includes("not found")) {
    return "Der Bild-Speicher «site-images» existiert noch nicht. Bitte einmalig supabase/schema.sql im Supabase-SQL-Editor ausführen (legt den Bucket an).";
  }
  if (m.includes("exceeded") || m.includes("too large")) {
    return "Das Bild ist zu gross (maximal 4 MB).";
  }
  if (m.includes("mime") || m.includes("content type")) {
    return "Dateiformat nicht unterstützt — bitte JPEG, PNG oder WebP verwenden.";
  }
  return fallback;
}
