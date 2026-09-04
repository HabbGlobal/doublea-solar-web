import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionTitle } from "@/components/site/section-head";
import { getPublishedTeamMembers, teamImageUrl } from "@/lib/data/team";

type TeamSectionProps = {
  /** "home" zeigt max. 4 Mitglieder + Verweis auf /ueber-uns. */
  variant?: "home" | "full";
  /** Historisch: Sektionsnummer — im Soft-Solar-System ohne Wirkung. */
  nr?: string;
  /** Historisch: Sektionslabel — im Soft-Solar-System ohne Wirkung. */
  label?: string;
};

/**
 * Öffentlicher Team-Block (Server Component). Lädt publizierte Mitglieder
 * aus der Datenbank; ohne erfasstes Team wird NICHTS gerendert — es gibt
 * bewusst kein Platzhalter-Fake-Team.
 */
export async function TeamSection({ variant = "full" }: TeamSectionProps) {
  const members = await getPublishedTeamMembers();
  if (members.length === 0) {
    return null;
  }

  const shown = variant === "home" ? members.slice(0, 4) : members;

  return (
    <section
      id="team"
      aria-labelledby="team-titel"
      className="py-14 sm:py-20"
    >
      <div className="container-page">
        <SectionTitle
          id="team-titel"
          title={
            variant === "home"
              ? "Die Menschen hinter den Anlagen."
              : "Unser Team"
          }
          lead="Persönlich erreichbar — vom Erstgespräch bis zur Abnahme."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((member) => {
            const src = teamImageUrl(member.imagePath);
            return (
              <figure key={member.id} className="neu m-0 p-4">
                {src ? (
                  <div className="neu-photo">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={src}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="neu-in flex aspect-[3/4] items-center justify-center">
                    <span className="eyebrow">Foto folgt</span>
                  </div>
                )}
                <figcaption className="mt-4 px-1">
                  <p className="text-[15px] font-semibold leading-snug text-foreground">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {variant === "home" && (
          <div className="mt-10">
            <Link href="/ueber-uns" className="btn-ghost min-h-11">
              Mehr über uns
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
