import { createFileRoute } from "@tanstack/react-router";
import heroHand from "@/assets/hero-hand.jpg";
import studioDetail from "@/assets/studio-detail.jpg";
import detailMoment from "@/assets/detail-moment.jpg";
import portrait from "@/assets/portrait.jpg";
import { business, mapsUrl, navItems, publicSiteUrl } from "@/lib/business";
import { colourEdit } from "@/lib/inspiration";
import { Nav } from "@/components/site/Nav";
import { MoodFinder } from "@/components/site/MoodFinder";
import { Lookbook } from "@/components/site/Lookbook";
import { ContactForm } from "@/components/site/ContactForm";

const pageTitle = "Ladylike Nails | Nagelstudio in Stans";
const pageDescription =
  "Ladylike Nails in Stans – Inspiration für gepflegte Nägel und deinen persönlichen Look. Angebot und Termine direkt anfragen.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      ...(publicSiteUrl ? [{ property: "og:url", content: publicSiteUrl }] : []),
      ...(publicSiteUrl ? [{ property: "og:image", content: `${publicSiteUrl}/og.png` }] : []),
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      ...(publicSiteUrl ? [{ name: "twitter:image", content: `${publicSiteUrl}/og.png` }] : []),
    ],
    links: publicSiteUrl ? [{ rel: "canonical", href: publicSiteUrl }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NailSalon",
          name: business.brandName,
          legalName: business.legalName,
          telephone: business.phoneInternational,
          address: {
            "@type": "PostalAddress",
            streetAddress: business.street,
            postalCode: business.postalCode,
            addressLocality: business.city,
            addressRegion: business.cantonCode,
            addressCountry: business.countryCode,
          },
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <div id="top" className="min-h-dvh bg-ivory text-espresso">
      <Nav />
      <main>
        <Hero />
        <SignatureLine />
        <Studio />
        <MoodFinder />
        <Lookbook />
        <Offer />
        <SignatureMoment />
        <ColourEditSection />
        <About />
        <Note />
        <ContactForm />
        <Location />
        <Legal />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-6 px-6 md:px-10">
        <div className="col-span-12 md:col-span-7">
          <span className="eyebrow rise rise-1">Nail Studio · Stans</span>
          <h1 className="mt-6 font-serif text-[16vw] uppercase leading-[0.84] tracking-[-0.04em] text-espresso md:mt-10 md:text-[8vw] xl:text-[7.5rem]">
            <span className="block rise rise-1">Deine Nägel.</span>
            <span className="block rise rise-2">
              Dein <em className="font-serif italic text-burgundy">Style.</em>
            </span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-warmgrey rise rise-3">
            Inspiration für gepflegte Nägel und einen Look, der zu dir passt – bei Ladylike Nails in
            Stans.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6 rise rise-4">
            <a href="#kontakt" className="btn-primary">
              Termin anfragen <span className="arrow transition-transform">→</span>
            </a>
            <a
              href="#inspiration"
              className="link-hair text-[11px] tracking-[0.22em] uppercase text-espresso"
            >
              Looks entdecken ↓
            </a>
          </div>
          <div className="mt-14 text-[11px] tracking-[0.28em] uppercase text-warmgrey">
            {business.street}
            <br />
            {business.postalCode} {business.city}
          </div>
        </div>

        <div className="relative col-span-12 mt-8 md:col-span-5 md:mt-0">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden bg-sand grain">
            {/* DEMO IMAGE – REPLACE WITH APPROVED LADYLIKE NAILS PHOTOGRAPHY */}
            <img
              src={heroHand}
              alt="Nagellook als Inspiration in sanften Rosétönen"
              width={1024}
              height={1536}
              fetchPriority="high"
              className="h-full w-full object-cover rise"
            />
          </div>
          <div className="pointer-events-none absolute right-3 top-6 hidden flex-col gap-2 text-right text-[10px] tracking-[0.32em] uppercase text-espresso md:flex">
            <span>Soft</span>
            <span>Classic</span>
            <span>Colour</span>
            <span>Bold</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignatureLine() {
  const text = "LADYLIKE · NAILS · STANS · STYLE · DETAIL · BEAUTY · ";
  return (
    <div
      aria-label={text}
      className="overflow-hidden border-y border-[color:var(--border)] bg-[color:var(--blush)] py-6"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap font-serif text-2xl italic leading-normal text-espresso md:text-3xl">
        {[0, 1].map((group) => (
          <div key={group} className="flex min-w-[100vw] shrink-0 items-center justify-around" aria-hidden={group === 1 ? true : undefined}>
            {[0, 1, 2].map((item) => (
              <span key={item} className="block shrink-0 px-6">{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-10">
        <div>
          <span className="eyebrow">01 — Ladylike Nails</span>
          <h2 className="mt-6 font-serif text-5xl leading-[0.98] text-espresso md:text-7xl">
            Kleine Details.
            <br />
            <em className="italic text-burgundy">Starker Look.</em>
          </h2>
          <p className="mt-8 max-w-md text-warmgrey">
            Ladylike Nails ist ein Nagelstudio in Stans. Im Mittelpunkt stehen gepflegte Nägel,
            persönliche Inspiration und ein Look, der zum eigenen Stil passt.
          </p>
          <p className="mt-4 max-w-md text-warmgrey">
            Für Informationen zum aktuellen Angebot und zu verfügbaren Terminen kannst du Ladylike
            Nails direkt kontaktieren.
          </p>
        </div>
        <div className="relative">
          <div className="relative ml-auto aspect-[5/4] w-full overflow-hidden bg-sand">
            {/* DEMO IMAGE – REPLACE WITH APPROVED LADYLIKE NAILS PHOTOGRAPHY */}
            <img
              src={studioDetail}
              alt="Editoriale Detailaufnahme als Studio-Inspiration"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -left-2 -top-4 hidden font-serif text-8xl text-espresso/10 md:block">
            01
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const activeServices = business.services.filter((service) => service.active);
  return (
    <section id="angebot" className="border-t border-[color:var(--border)] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-[auto_1fr] md:gap-24 md:px-10">
        <span className="eyebrow">03 — Angebot</span>
        <div className="max-w-2xl">
          <h2 className="font-serif text-5xl leading-[1.02] text-espresso md:text-7xl">
            Was darf es
            <br />
            für dich sein?
          </h2>
          {activeServices.length > 0 && (
            <ul className="mt-10 divide-y divide-[color:var(--border)]">
              {activeServices.map((service) => (
                <li key={service.id} className="py-5">
                  {service.name}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-8 text-warmgrey">
            Für Informationen zum aktuellen Angebot, zu Preisen und zu verfügbaren Terminen
            kontaktiere Ladylike Nails bitte direkt.
          </p>
          <a href="#kontakt" className="btn-primary mt-10">
            Angebot anfragen <span className="arrow transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function SignatureMoment() {
  return (
    <section className="relative overflow-hidden bg-espresso py-14 text-ivory md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16 md:px-10">
        <div>
          <span className="text-[11px] tracking-[0.28em] uppercase text-rose">
            The Ladylike Moment
          </span>
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] md:text-7xl">
            Dein Look
            <br />
            beginnt im <em className="italic text-rose">Detail.</em>
          </h2>
          <p className="mt-8 max-w-md text-ivory/70">
            Manchmal verändert ein kleines Detail das ganze Gefühl.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* DEMO IMAGE – REPLACE WITH APPROVED LADYLIKE NAILS PHOTOGRAPHY */}
          <img
            src={detailMoment}
            alt="Detail eines eleganten Nagellooks als Inspiration"
            loading="lazy"
            width={1600}
            height={1008}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ColourEditSection() {
  return (
    <section className="border-t border-[color:var(--border)] py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div>
            <span className="eyebrow">The Colour Edit</span>
            <h2 className="mt-4 font-serif text-4xl text-espresso md:text-6xl">
              Farbstimmungen für
              <br />
              deinen nächsten Look.
            </h2>
          </div>
          <p className="max-w-md text-warmgrey md:ml-auto">
            Die Auswahl dient als Inspiration. Verfügbarkeit bitte direkt anfragen.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-5 md:gap-8">
          {colourEdit.map((colour) => (
            <div key={colour.name}>
              <div
                className="aspect-square w-full rounded-full border border-[color:var(--border)]"
                style={{ backgroundColor: colour.hex }}
                aria-hidden
              />
              <div className="mt-4 font-serif text-xl text-espresso">{colour.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="ueber-uns"
      className="scroll-mt-24 border-t border-[color:var(--border)] bg-blush/35 py-14 md:py-20"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-10">
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-[5/4] w-full overflow-hidden bg-sand">
            {/* OWNER PORTRAIT PLACEHOLDER – REPLACE WITH APPROVED PHOTOGRAPHY */}
            <img
              src={portrait}
              alt="Platzhalter für ein künftiges Portrait von Slavica Kojic"
              loading="lazy"
              width={1200}
              height={1504}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-warmgrey">
            Portrait-Platzhalter · Bild noch nicht freigegeben
          </p>
        </div>
        <div className="order-1 md:order-2 md:self-center">
          <span className="eyebrow">04 — Behind Ladylike</span>
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-espresso md:text-7xl">
            Hallo,
            <br />
            ich bin <em className="italic text-burgundy">Slavica.</em>
          </h2>
          {/* OWNER STORY PLACEHOLDER – REPLACE WITH APPROVED CONTENT FROM SLAVICA KOJIC */}
          <p className="mt-8 max-w-md text-warmgrey">
            Ladylike Nails wird von Slavica Kojic geführt. Hier kann später ihre persönliche
            Geschichte und die Idee hinter Ladylike Nails ergänzt werden.
          </p>
          <p className="mt-4 max-w-md text-warmgrey">
            Was ihr an ihrer Arbeit besonders wichtig ist und welche Looks sie am liebsten umsetzt,
            kann nach einem persönlichen Gespräch ergänzt werden.
          </p>
        </div>
      </div>
    </section>
  );
}

function Note() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="border border-[color:var(--border)] bg-ivory p-10 md:p-16">
          <span className="eyebrow">A note from Slavica</span>
          {/* REPLACE WITH APPROVED OWNER MESSAGE */}
          <p className="mt-6 font-serif text-2xl leading-snug text-espresso md:text-3xl">
            Hier kann später eine persönliche Nachricht von Slavica an ihre Kundinnen ergänzt
            werden.
          </p>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="border-t border-[color:var(--border)] bg-blush/30 py-14 md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-2 md:gap-24 md:px-10">
        <div>
          <div className="font-serif text-[23vw] uppercase leading-none text-espresso md:text-[9rem]">
            Stans
          </div>
          <div className="mt-2 text-[11px] tracking-[0.28em] uppercase text-warmgrey">
            6370 · Nidwalden
          </div>
          <h2 className="mt-10 font-serif text-4xl leading-[1.05] text-espresso md:text-6xl">
            Dein Nagelstudio
            <br />
            in Stans.
          </h2>
          <address className="mt-8 not-italic text-warmgrey">
            {business.brandName}
            <br />
            {business.street}
            <br />
            {business.postalCode} {business.city}
            <br />
            <a href={business.phoneHref} className="link-hair mt-3 inline-block text-espresso">
              {business.phoneDisplay}
            </a>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Route planen <span className="arrow transition-transform">→</span>
            </a>
            <a href={business.phoneHref} className="btn-outline">
              Anrufen
            </a>
          </div>
          <p className="mt-6 text-xs text-warmgrey">
            Termine und Verfügbarkeit bitte direkt anfragen.
          </p>
        </div>
        <div className="overflow-hidden border border-[color:var(--border)] bg-ivory md:self-stretch">
          <iframe
            title="Ladylike Nails – Standort in Stans"
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${business.brandName}, ${business.street}, ${business.postalCode} ${business.city}`)}&output=embed`}
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0 md:h-full md:min-h-[420px]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function Legal() {
  return (
    <section className="border-t border-[color:var(--border)] py-20">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 md:grid-cols-2 md:px-10">
        <article id="impressum" className="scroll-mt-24">
          <span className="eyebrow">Impressum</span>
          <h2 className="mt-4 font-serif text-3xl text-espresso">{business.legalName}</h2>
          <address className="mt-6 not-italic leading-relaxed text-warmgrey">
            Inhaberin: {business.ownerName}
            <br />
            {business.street}
            <br />
            {business.postalCode} {business.city}
            <br />
            {business.country}
            <br />
            <br />
            Telefon:{" "}
            <a href={business.phoneHref} className="link-hair text-espresso">
              {business.phoneDisplay}
            </a>
          </address>
        </article>
        <article id="datenschutz" className="scroll-mt-24">
          <span className="eyebrow">Datenschutz</span>
          <h2 className="mt-4 font-serif text-3xl text-espresso">Hinweise zur Datenverarbeitung</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-warmgrey">
            <p>
              Diese Website verwendet derzeit keine Analyse- oder Marketingdienste. Im Standortbereich ist Google Maps eingebunden. Beim Laden der Karte wird eine Verbindung zu Google aufgebaut; dabei können IP-Adresse und technische Browserdaten übermittelt werden. Für die Verarbeitung durch Google gilt die Datenschutzerklärung von Google.
            </p>
            <p>
              Gespeicherte Looks werden ausschliesslich lokal im Browser deines Geräts gespeichert.
              Du kannst sie jederzeit über „Meine Looks“ entfernen.
            </p>
            <p>
              Das Anfrageformular übermittelt ohne eingerichteten Versand-Endpunkt keine Daten und
              ist sichtbar als Demo gekennzeichnet. Für eine Kontaktaufnahme steht der Telefonlink
              zur Verfügung.
            </p>
            <p>
              Die verwendeten Schriften werden von Google Fonts geladen. Dabei kann eine Verbindung
              zu Servern von Google aufgebaut werden.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--border)] bg-espresso pb-24 pt-24 text-ivory md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="font-serif text-[20vw] uppercase leading-none md:text-[10rem]">
              {business.displayName}
            </div>
            <div className="mt-2 text-[11px] tracking-[0.28em] uppercase text-ivory/60">
              {business.wordmarkLine}
            </div>
          </div>
          <div className="md:pt-6">
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Welcher Look
              <br />
              darf es als
              <br />
              <em className="italic text-rose">Nächstes sein?</em>
            </h2>
            <a
              href="#kontakt"
              className="mt-8 inline-flex min-h-12 items-center border border-ivory px-6 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-ivory hover:text-espresso"
            >
              Termin anfragen →
            </a>
          </div>
        </div>
        <div className="mt-20 grid gap-10 border-t border-ivory/15 pt-10 text-sm md:grid-cols-3">
          <div className="text-ivory/70">
            {business.street}
            <br />
            {business.postalCode} {business.city}
            <br />
            <a href={business.phoneHref} className="mt-2 inline-block text-ivory">
              {business.phoneDisplay}
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-ivory/70 md:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-hair">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="text-ivory/70">
            <li>
              <a href="#impressum" className="link-hair">
                Impressum
              </a>
            </li>
            <li className="mt-2">
              <a href="#datenschutz" className="link-hair">
                Datenschutz
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-12 text-[11px] tracking-[0.16em] uppercase text-ivory/50">
          © {year} {business.brandName}. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
