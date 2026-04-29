import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { supportedLanguages, type SupportedLanguage } from "@/i18n";
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

/** Set or create a <meta> tag by name or property attribute. */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function setAlternate(lang: SupportedLanguage, url: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${lang}"]`
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", lang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function setXDefault(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="alternate"][hreflang="x-default"]'
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", "x-default");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function localizedPath(pathname: string, targetLang: SupportedLanguage) {
  const cleanPath = pathname.replace(/^\/(en|sr|ru)(?=\/|$)/, "") || "/";
  return `/${targetLang}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Imperatively syncs <head> meta tags. No external deps, no provider needed.
 */
export default function SEO({
  title,
  description,
  image,
  type = "website",
  canonical,
}: SEOProps) {
  const { lang } = useParams<{ lang?: string }>();
  const { pathname } = useLocation();

  useEffect(() => {
    const locale = (lang && lang in siteConfig.defaults
      ? lang
      : "en") as SupportedSeoLocale;

    const defaults = siteConfig.defaults[locale];
    const finalTitle = title ?? defaults.title;
    const finalDescription = description ?? defaults.description;
    const finalImage = absoluteUrl(image ?? siteConfig.ogImagePath);
    const url = canonical ?? absoluteUrl(pathname || "/");
    const alternatePaths = supportedLanguages.reduce((acc, supportedLang) => {
      acc[supportedLang] = absoluteUrl(localizedPath(pathname || "/", supportedLang));
      return acc;
    }, {} as Record<SupportedLanguage, string>);

    document.title = finalTitle;
    document.documentElement.lang = locale;

    setMeta("name", "description", finalDescription);
    setCanonical(url);
    supportedLanguages.forEach((supportedLang) => {
      setAlternate(supportedLang, alternatePaths[supportedLang]);
    });
    setXDefault(alternatePaths.en);

    // Open Graph
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:description", finalDescription);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", siteConfig.siteName);
    setMeta("property", "og:locale", localeMap[locale] ?? "en_US");
    setMeta("property", "og:image", finalImage);
    setMeta("property", "og:image:secure_url", finalImage);
    setMeta("property", "og:image:width", String(siteConfig.ogImageWidth));
    setMeta("property", "og:image:height", String(siteConfig.ogImageHeight));
    setMeta("property", "og:image:alt", siteConfig.ogImageAlt);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:description", finalDescription);
    setMeta("name", "twitter:image", finalImage);
    if (siteConfig.twitterHandle) {
      setMeta("name", "twitter:site", siteConfig.twitterHandle);
    }
  }, [title, description, image, type, canonical, lang, pathname]);

  return null;
}
