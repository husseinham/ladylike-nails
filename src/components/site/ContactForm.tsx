import { useEffect, useState } from "react";
import { business, contactFormEndpoint } from "@/lib/business";
import { gallery } from "@/lib/inspiration";
import { useSavedLooks } from "@/hooks/useSavedLooks";

export function ContactForm() {
  const { saved, hydrated } = useSavedLooks();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hydrated && saved.length > 0 && !message) {
      setMessage("Ich interessiere mich für einen Look in dieser Richtung.");
    }
  }, [hydrated, saved.length, message]);

  const savedItems = gallery.filter((item) => saved.includes(item.id));

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactFormEndpoint) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      if (!response.ok) throw new Error("request-failed");
      setSubmitted(true);
    } catch {
      setError("Die Anfrage konnte nicht gesendet werden. Bitte rufe Ladylike Nails direkt an.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 border-t border-[color:var(--border)] py-14 md:py-20"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:gap-24 md:px-10">
        <div>
          <span className="eyebrow">05 — Kontakt</span>
          <h2 className="mt-4 font-serif text-5xl leading-[1.02] text-espresso md:text-7xl">
            Bereit für
            <br /> deinen nächsten
            <br /> <em className="font-serif italic text-burgundy">Look?</em>
          </h2>
          <p className="mt-6 max-w-md text-warmgrey">
            Kontaktiere Ladylike Nails direkt und frage deinen gewünschten Termin an.
          </p>
          <a
            href={business.phoneHref}
            className="mt-10 block border-y border-[color:var(--border)] py-6"
          >
            <span className="eyebrow">Direkt anrufen</span>
            <span className="mt-1 block font-serif text-3xl text-espresso md:text-4xl">
              {business.phoneDisplay}
            </span>
          </a>
          <address className="mt-6 not-italic text-sm leading-relaxed text-warmgrey">
            {business.brandName}
            <br />
            {business.street}
            <br />
            {business.postalCode} {business.city}
          </address>
          {!contactFormEndpoint && (
            <p className="mt-8 border-l-2 border-burgundy pl-4 text-sm leading-relaxed text-warmgrey">
              Demo-Formular – der Versand wird vor der Veröffentlichung eingerichtet. Bitte nutze
              bis dahin den Telefonbutton.
            </p>
          )}
        </div>

        <div>
          {submitted ? (
            <div
              className="border border-[color:var(--border)] bg-sand/60 p-8 md:p-12"
              role="status"
            >
              <span className="eyebrow">Anfrage versendet</span>
              <p className="mt-4 font-serif text-2xl leading-snug text-espresso md:text-3xl">
                Vielen Dank für deine Anfrage. Dein Termin ist noch nicht automatisch bestätigt.
                Ladylike Nails meldet sich bei dir.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Telefon" name="phone" type="tel" required />
              </div>
              <Field label="E-Mail optional" name="email" type="email" />
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Gewünschtes Datum" name="date" type="date" />
                <div>
                  <label htmlFor="time" className="eyebrow block">
                    Gewünschte Tageszeit
                  </label>
                  <select id="time" name="time" className="form-control" defaultValue="">
                    <option value="">Bitte wählen</option>
                    <option>Vormittag</option>
                    <option>Nachmittag</option>
                    <option>Abend</option>
                    <option>Flexibel</option>
                  </select>
                </div>
              </div>
              <fieldset>
                <legend className="eyebrow block">Anfragetyp</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Termin anfragen",
                    "Frage zum Angebot",
                    "Frage zu einem bestehenden Termin",
                    "Noch unsicher",
                  ].map((option) => (
                    <label
                      key={option}
                      className="cursor-pointer border border-[color:var(--border)] px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-espresso transition-colors has-[:checked]:bg-espresso has-[:checked]:text-ivory"
                    >
                      <input type="radio" name="topic" value={option} className="sr-only" />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="message" className="eyebrow block">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={4}
                  className="form-control"
                />
              </div>
              {hydrated && savedItems.length > 0 && (
                <div>
                  <span className="eyebrow">Gespeicherte Inspirationen</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-16 w-16 overflow-hidden border border-[color:var(--border)]"
                      >
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="h-full w-full object-cover"
                        />
                        <input type="hidden" name="looks[]" value={item.id} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <p role="alert" className="text-sm text-burgundy">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!contactFormEndpoint || sending}
              >
                {sending ? "Wird gesendet …" : "Anfrage senden"}{" "}
                <span className="arrow transition-transform">→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">
        {label}
        {required && " *"}
      </label>
      <input id={name} name={name} type={type} required={required} className="form-control" />
    </div>
  );
}
