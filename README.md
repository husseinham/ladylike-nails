# Ladylike Nails

Website für **Ladylike Nails Kojic Slavica**, Stans.

## Entwicklung

```sh
bun install
bun run dev
```

## Prüfung

```sh
bun run lint
bun run build
```

## Konfiguration

Bestätigte Unternehmensdaten befinden sich zentral in `src/lib/business.ts`.

- `PUBLIC_SITE_URL`: optionale Produktionsadresse für Canonical URL, Open Graph und Sitemap
- `CONTACT_FORM_ENDPOINT`: optionaler Versand-Endpunkt für das Anfrageformular

Ohne `CONTACT_FORM_ENDPOINT` bleibt der Versand deaktiviert und das Formular wird sichtbar als
Demo gekennzeichnet. Bilder im Projekt sind Inspirations- und Platzhalterbilder und dürfen erst
nach Freigabe als Studiofotografie bezeichnet werden.
