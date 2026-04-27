/**
 * Central site configuration for SEO, social previews and metadata.
 * Edit these values to update Open Graph / Twitter Cards across the site.
 */

export type LocaleSeo = {
  title: string;
  description: string;
};

export const siteConfig = {
  /** Canonical site URL (no trailing slash). Used to build absolute URLs for OG images and canonical links. */
  siteUrl: "https://trpezasutomore.me",

  /** Brand name shown in OG site_name. */
  siteName: "Restaurant ТРПЕЗА",

  /** Default Twitter handle (with @). Leave empty if none. */
  twitterHandle: "",

  /** Absolute path (from public/) of the default 1200x630 OG image. */
  ogImagePath: "/og-image.jpg",

  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Restaurant ТРПЕЗА — Balkan cuisine and Adriatic seafood",

  /** Per-locale defaults used when a page does not provide its own. */
  defaults: {
    en: {
      title: "ТРПЕЗА — Balkan Cuisine & Adriatic Seafood",
      description:
        "Discover authentic Balkan flavors and the freshest Adriatic seafood. Reserve your table at ТРПЕЗА today.",
    },
    sr: {
      title: "ТРПЕЗА — Balkanska kuhinja i jadranski plodovi mora",
      description:
        "Otkrijte autentične balkanske ukuse i najsvežije plodove mora Jadrana. Rezervišite svoj sto u ТРПЕЗА još danas.",
    },
    ru: {
      title: "ТРПЕЗА — Балканская кухня и морепродукты Адриатики",
      description:
        "Откройте аутентичные балканские вкусы и свежайшие морепродукты Адриатики. Забронируйте столик в ТРПЕЗА сегодня.",
    },
  } satisfies Record<string, LocaleSeo>,
} as const;

export type SupportedSeoLocale = keyof typeof siteConfig.defaults;

/** Build an absolute URL from a path or pass through if already absolute. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}
