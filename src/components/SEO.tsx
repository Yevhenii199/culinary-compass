import { Helmet } from "react-helmet-async";
import { useParams, useLocation } from "react-router-dom";
import {
  siteConfig,
  absoluteUrl,
  type SupportedSeoLocale,
} from "@/config/siteConfig";

interface SEOProps {
  /** Page-specific title. Falls back to locale default. */
  title?: string;
  /** Page-specific description. Falls back to locale default. */
  description?: string;
  /** Override OG image (absolute URL or path under /public). */
  image?: string;
  /** OG type, defaults to "website". */
  type?: "website" | "article" | "restaurant";
  /** Optional canonical URL override. */
  canonical?: string;
}

const localeMap: Record<string, string> = {
  en: "en_US",
  sr: "sr_RS",
  ru: "ru_RU",
};

export default function SEO({
  title,
  description,
  image,
  type = "website",
  canonical,
}: SEOProps) {
  const { lang } = useParams<{ lang?: string }>();
  const { pathname } = useLocation();

  const locale = (lang && lang in siteConfig.defaults
    ? lang
    : "en") as SupportedSeoLocale;

  const defaults = siteConfig.defaults[locale];
  const finalTitle = title ?? defaults.title;
  const finalDescription = description ?? defaults.description;
  const finalImage = absoluteUrl(image ?? siteConfig.ogImagePath);
  const url = canonical ?? absoluteUrl(pathname || "/");

  return (
    <Helmet>
      <html lang={locale} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={localeMap[locale] ?? "en_US"} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:width" content={String(siteConfig.ogImageWidth)} />
      <meta property="og:image:height" content={String(siteConfig.ogImageHeight)} />
      <meta property="og:image:alt" content={siteConfig.ogImageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      {siteConfig.twitterHandle && (
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
      )}
    </Helmet>
  );
}
