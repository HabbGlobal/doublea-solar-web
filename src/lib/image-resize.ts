/**
 * Verkleinert ein Bild im Browser, bevor es hochgeladen wird.
 *
 * Hintergrund: Handy-Fotos sind schnell 3–8 MB gross. Für Porträts (max.
 * ~400 px Anzeige) und Projektbilder ist das um Faktor 100 zu viel — es
 * kostet Speicher, Ladezeit und läuft ins 4-MB-Upload-Limit.
 *
 * Die Funktion arbeitet rein clientseitig über ein Canvas (keine
 * Abhängigkeit), behält das Seitenverhältnis und liefert JPEG. Schlägt
 * etwas fehl (exotisches Format, kein Canvas), wird die Originaldatei
 * unverändert zurückgegeben — der Upload bricht nie an dieser Stelle ab.
 */
export async function resizeImageFile(
  file: File,
  maxKante = 1400,
  qualitaet = 0.85,
): Promise<File> {
  if (typeof document === "undefined") return file;
  if (!file.type.startsWith("image/")) return file;
  // Kleine Dateien lohnen den Aufwand nicht.
  if (file.size < 300 * 1024) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const faktor = Math.min(1, maxKante / Math.max(width, height));
    if (faktor >= 1 && file.size < 1.5 * 1024 * 1024) {
      bitmap.close?.();
      return file;
    }

    const zielW = Math.round(width * faktor);
    const zielH = Math.round(height * faktor);
    const canvas = document.createElement("canvas");
    canvas.width = zielW;
    canvas.height = zielH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, zielW, zielH);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", qualitaet),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
}
