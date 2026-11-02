import { useState } from "react";
import { moods, type MoodKey } from "@/lib/inspiration";

export function MoodFinder() {
  const [active, setActive] = useState<MoodKey>("soft");
  const current = moods.find((m) => m.key === active)!;

  return (
    <section
      id="nail-mood"
      aria-labelledby="mood-title"
      className="scroll-mt-24 border-t border-[color:var(--border)] bg-[color:var(--ivory)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-16">
          <span className="eyebrow">Nail Mood Finder</span>
          <div>
            <h2
              id="mood-title"
              className="font-serif text-4xl leading-[1.05] text-espresso md:text-6xl"
            >
              Choose your
              <br /> nail mood
            </h2>
            <p className="mt-4 max-w-md text-warmgrey">
              Welche Richtung passt zu deinem nächsten Look?
            </p>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <div
              role="tablist"
              aria-label="Nail Mood auswählen"
              className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]"
            >
              {moods.map((m) => {
                const isActive = m.key === active;
                return (
                  <button
                    key={m.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="mood-panel"
                    onClick={() => setActive(m.key)}
                    className="group flex min-h-20 w-full items-center gap-4 py-5 text-left md:gap-6"
                  >
                    <span className="text-[11px] tracking-[0.28em] text-warmgrey">{m.num}</span>
                    <span
                      className={`font-serif text-3xl transition-colors md:text-5xl ${isActive ? "text-burgundy" : "text-espresso"}`}
                    >
                      {m.title}
                    </span>
                    <span className="ml-auto hidden max-w-52 text-right text-sm text-warmgrey md:block">
                      {m.description}
                    </span>
                    <span
                      className={`ml-2 h-2 w-2 rounded-full ${isActive ? "bg-burgundy" : "bg-[color:var(--border)]"}`}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            <div id="mood-panel" role="tabpanel" className="mt-8" aria-live="polite">
              <div
                className="flex items-center gap-2"
                aria-label={`Farbpalette für ${current.title}`}
              >
                {current.swatches.map((colour) => (
                  <span
                    key={colour}
                    className="h-8 w-8 rounded-full border border-[color:var(--border)]"
                    style={{ backgroundColor: colour }}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-6 max-w-md font-serif text-2xl text-espresso">
                {current.description}
              </p>
              <p className="mt-3 text-xs text-warmgrey">
                Die Bilder dienen als Inspiration. Angebot und mögliche Umsetzung bitte direkt
                anfragen.
              </p>
              <a href="#kontakt" className="btn-primary mt-8">
                Look besprechen <span className="arrow transition-transform">→</span>
              </a>
            </div>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden bg-sand md:aspect-auto md:h-[480px]">
            {moods.map((m) => (
              <img
                key={m.key}
                src={m.image}
                alt={m.key === active ? `Inspiration für den Nail Mood ${m.title}` : ""}
                loading="lazy"
                width={1200}
                height={1500}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${m.key === active ? "opacity-100" : "opacity-0"}`}
                aria-hidden={m.key !== active}
                /* DEMO IMAGE – REPLACE WITH APPROVED LADYLIKE NAILS PHOTOGRAPHY */
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
