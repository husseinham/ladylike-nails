import { useEffect, useState } from "react";
import { business, navItems } from "@/lib/business";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bottomBar, setBottomBar] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 400) {
        setBottomBar(y < lastY || y - lastY < 4);
      } else {
        setBottomBar(false);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[color:var(--ivory)]/85 backdrop-blur-md border-b border-[color:var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" className="group leading-none">
            <div className="font-serif text-2xl tracking-tight text-espresso md:text-[28px]">
              {business.displayName}
            </div>
            <div className="mt-0.5 text-[10px] tracking-[0.28em] text-warmgrey">
              {business.wordmarkLine}
            </div>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-hair text-[12px] tracking-[0.22em] text-espresso uppercase"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#kontakt"
            className="hidden md:inline-flex items-center gap-3 rounded-full border border-espresso px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase text-espresso transition-colors hover:bg-espresso hover:text-ivory"
          >
            Termin anfragen
          </a>

          <button
            type="button"
            aria-label="Menü öffnen"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden flex h-11 w-11 items-center justify-center"
          >
            <span className="sr-only">Menü</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-6 bg-espresso" />
              <span className="block h-px w-6 bg-espresso" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-50 bg-[color:var(--ivory)] transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex h-dvh flex-col px-6 pb-[env(safe-area-inset-bottom)] pt-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif text-2xl text-espresso">{business.displayName}</div>
              <div className="mt-0.5 text-[10px] tracking-[0.28em] text-warmgrey">
                {business.wordmarkLine}
              </div>
            </div>
            <button
              type="button"
              aria-label="Menü schliessen"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-2xl text-espresso"
            >
              ×
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-6 border-b border-[color:var(--border)] pb-5"
                style={{ animation: `riseIn .6s ${i * 0.05}s both` }}
              >
                <span className="text-[11px] tracking-[0.28em] text-warmgrey">{item.num}</span>
                <span className="font-serif text-4xl text-espresso">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Termin anfragen <span className="arrow transition-transform">→</span>
            </a>
            <div className="mt-8 text-sm leading-relaxed text-warmgrey">
              {business.street}
              <br />
              {business.postalCode} {business.city}
              <br />
              <a href={business.phoneHref} className="link-hair mt-2 inline-block text-espresso">
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 md:hidden transition-transform duration-500 ${
          bottomBar && !open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-3 mb-3 grid grid-cols-2 gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--ivory)]/95 p-1.5 backdrop-blur-md shadow-[0_8px_30px_rgba(33,28,25,0.12)]">
          <a
            href={business.phoneHref}
            className="flex min-h-11 items-center justify-center rounded-full text-[12px] tracking-[0.22em] uppercase text-espresso"
          >
            Anrufen
          </a>
          <a
            href="#kontakt"
            className="flex min-h-11 items-center justify-center rounded-full bg-espresso text-[12px] tracking-[0.22em] uppercase text-ivory"
          >
            Termin
          </a>
        </div>
      </div>
    </>
  );
}
