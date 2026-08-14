import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHead, SectionTitle } from "@/components/site/section-head";
import { getPublishedTeamMembers, teamImageUrl } from "@/lib/data/team";

type TeamSectionProps = {
  /** "home" zeigt max. 4 Mitglieder + Verweis auf /ueber-uns. */
  variant?: "home" | "full";
  /** Sektionsnummer für den SectionHead; ohne nr wird kein Head gerendert. */
  nr?: string;
  label?: string;
};

/**
 * Öffentlicher Team-Block (Server Component). Lädt publizierte Mitglieder
 * aus der Datenbank; ohne erfasstes Team wird NICHTS gerendert — es gibt
 * bewusst kein Platzhalter-Fake-Team.
 */
export async function TeamSection({
  variant = "full",
  nr,
  label = "Team",
}: TeamSectionProps) {
  const members = await getPublishedTeamMembers();
  if (members.length === 0) {
    return null;
  }

  const shown = variant === "home" ? members.slice(0, 4) : members;

  return (
    <>
      {nr && <SectionHead nr={nr} label={label} />}
      <section aria-labelledby="team-titel" className="container-page py-14 sm:py-20">
        <SectionTitle
          id="team-titel"
          title={
            variant === "home"
              ? "Die Menschen hinter den Anlagen."
              : "Unser Team"
          }
          lead="Persönlich erreichbar — vom Erstgespräch bis zur Abnahme."
        />

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((member) => {
            const src = teamImageUrl(member.imagePath);
            return (
              <figure key={member.id}>
                <div className="relative aspect-[3/4] overflow-hidden border border-border bg-card">
                  {src ? (
                    <Image
                      src={src}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, var(--solar-line) 0 1px, transparent 1px 9px)",
                      }}
                    >
                      <span className="eyebrow bg-card px-3 py-1.5">
                        Foto folgt
                      </span>
                    </div>
                  )}
                </div>
                <figcaption className="mt-3">
                  <p className="text-[15px] font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="eyebrow mt-1">{member.role}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {variant === "home" && (
          <Link href="/ueber-uns" className="btn-ghost mt-10 min-h-12">
            Mehr über uns
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </section>
    </>
  );
}
