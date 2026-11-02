import { useMemo, useState } from "react";
import { gallery, moods, type MoodKey } from "@/lib/inspiration";
import { useSavedLooks } from "@/hooks/useSavedLooks";

type Filter = "all" | MoodKey;

export function Lookbook() {
  const [filter, setFilter] = useState<Filter>("all");
  const { has, toggle, saved, remove, clear, hydrated } = useSavedLooks();
  const [openSaved, setOpenSaved] = useState(false);

  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.mood === filter)),
    [filter],
  );

  const savedItems = gallery.filter((g) => saved.includes(g.id));

  const goToContact = () => {
    setOpenSaved(false);
    // Prefill happens automatically via saved list read in ContactForm.
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inspiration" className="border-t border-[color:var(--border)] py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-16">
          <span className="eyebrow">02 — The Ladylike Edit</span>
          <h2 className="font-serif text-4xl leading-[1.05] text-espresso md:text-6xl">
            Looks für
            <br /> jede Stimmung.
          </h2>
          {hydrated && saved.length > 0 && (
            <button
              type="button"
              onClick={() => setOpenSaved(true)}
              className="link-hair flex min-h-11 items-center self-start text-[11px] tracking-[0.22em] uppercase text-espresso md:self-end"
            >
              {saved.length} Look{saved.length === 1 ? "" : "s"} gespeichert →
            </button>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: "Alle" },
              ...moods.map((m) => ({ key: m.key, label: m.title })),
            ] as { key: Filter; label: string }[]
          ).map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={active}
                className={`min-h-11 rounded-full border px-4 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors ${
                  active
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-[color:var(--border)] text-espresso hover:border-espresso"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {items.map((item, i) => {
            const spanClass =
              item.span === "tall"
                ? "md:row-span-2 aspect-[3/4] md:aspect-[3/5]"
                : item.span === "wide"
                  ? "md:col-span-2 aspect-square md:aspect-[16/10]"
                  : "aspect-square";
            const isSaved = hydrated && has(item.id);
            return (
              <figure
                key={item.id}
                className={`group relative overflow-hidden bg-sand ${spanClass}`}
                style={{ transform: i % 3 === 1 ? "translateY(24px)" : undefined }}
              >
                {/* DEMO INSPIRATION – NOT ACTUAL CLIENT WORK */}
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  width={1200}
                  height={1500}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-label={isSaved ? "Look aus Merkliste entfernen" : "Look speichern"}
                  aria-pressed={isSaved}
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--ivory)]/85 backdrop-blur-sm transition-colors hover:bg-[color:var(--ivory)]"
                >
                  <BookmarkIcon filled={isSaved} />
                </button>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="rounded-full bg-[color:var(--ivory)]/90 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-espresso backdrop-blur-sm">
                    {item.mood}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-warmgrey">
          Speichere Inspirationen, die dir gefallen, und zeige Ladylike Nails, welche Richtung du
          dir vorstellst.
        </p>
      </div>

      {/* Saved drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          openSaved ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!openSaved}
      >
        <div className="absolute inset-0 bg-espresso/50" onClick={() => setOpenSaved(false)} />
        <aside
          className={`absolute right-0 top-0 h-dvh w-full max-w-md overflow-y-auto bg-[color:var(--ivory)] p-6 shadow-2xl transition-transform ${
            openSaved ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Meine Looks"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="eyebrow">Meine Looks</span>
              <h3 className="mt-2 font-serif text-3xl text-espresso">
                {savedItems.length} Look{savedItems.length === 1 ? "" : "s"}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpenSaved(false)}
              aria-label="Schliessen"
              className="h-11 w-11 text-xl"
            >
              ×
            </button>
          </div>

          {savedItems.length === 0 ? (
            <p className="mt-8 text-sm text-warmgrey">
              Noch keine Looks gespeichert. Wähle bei einer Inspiration „Look speichern“.
            </p>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {savedItems.map((s) => (
                  <div key={s.id} className="relative aspect-[3/4] overflow-hidden bg-sand">
                    <img src={s.image} alt={s.alt} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => remove(s.id)}
                      aria-label="Look entfernen"
                      className="absolute right-2 top-2 h-11 w-11 rounded-full bg-[color:var(--ivory)]/90 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <button type="button" onClick={goToContact} className="btn-primary justify-center">
                  Zur Terminanfrage <span className="arrow transition-transform">→</span>
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="link-hair min-h-11 self-start text-[11px] tracking-[0.22em] uppercase text-warmgrey"
                >
                  Alle entfernen
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#76384A" : "none"}
      stroke="#76384A"
      strokeWidth="1.6"
      className="transition-all"
    >
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z" />
    </svg>
  );
}
