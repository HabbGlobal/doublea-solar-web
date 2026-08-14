import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const ALLOWED_FOLDERS = new Set(["team", "projects"]);

const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB

export async function POST(request: Request) {
  const auth = await createSupabaseServerClient();
  const {
    data: { user },
  } = await auth.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nicht konfiguriert." },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Ungültige Formulardaten." },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Datei fehlt." }, { status: 400 });
  }

  const folderRaw = formData.get("folder");
  const folder =
    typeof folderRaw === "string" && ALLOWED_FOLDERS.has(folderRaw)
      ? folderRaw
      : "team";

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Nur JPEG, PNG oder WebP erlaubt." },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "Datei zu gross (max. 4 MB)." },
      { status: 400 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;

    const supabase = createServiceClient();
    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, buffer, { contentType: file.type });
    if (error) {
      console.error("[admin/upload] storage error", error);
      return NextResponse.json(
        { error: "Upload fehlgeschlagen." },
        { status: 502 },
      );
    }

    return NextResponse.json({ path });
  } catch (e) {
    console.error("[admin/upload] unexpected", e);
    return NextResponse.json({ error: "Unbekannter Fehler." }, { status: 500 });
  }
}
