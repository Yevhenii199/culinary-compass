/**
 * Sitemap configuration and generator for Restaurant ТРПЕЗА.
 *
 * Usage:
 *   import { generateSitemap } from "@/sitemap";
 *   const xml = generateSitemap();
 *
 * To write public/sitemap.xml at build time run:
 *   npx tsx src/sitemap.ts   (or import and call writeSitemap())
 */

import { siteConfig } from "./config/siteConfig";
import { supportedLanguages, type SupportedLanguage } from "./i18n";

export interface SitemapEntry {
  path: string;
  priority: number;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastmod?: string;
  alternates?: Record<SupportedLanguage, string>;
}

/** Base routes (without language prefix). */
const baseRoutes: SitemapEntry[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/gallery", priority: 0.8, changefreq: "weekly" },
  { path: "/menu", priority: 0.9, changefreq: "weekly" },
  { path: "/wine-list", priority: 0.9, changefreq: "weekly" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
];

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return `${base}${path}`;
}

/** Build the full list of localized sitemap entries. */
export function buildSitemapEntries(): SitemapEntry[] {
  const lastmod = todayIso();
  const entries: SitemapEntry[] = [];

  for (const route of baseRoutes) {
    const alternates: Record<string, string> = {};
    for (const lang of supportedLanguages) {
      const localizedPath = `/${lang}${route.path === "/" ? "" : route.path}`;
      alternates[lang] = absoluteUrl(localizedPath);
    }

    for (const lang of supportedLanguages) {
      entries.push({
        ...route,
        path: `/${lang}${route.path === "/" ? "" : route.path}`,
        lastmod,
        alternates,
      });
    }
  }

  return entries;
}

/** Generate a complete sitemap.xml string. */
export function generateSitemap(): string {
  const entries = buildSitemapEntries();
  const xmlns = "http://www.sitemaps.org/schemas/sitemap/0.9";
  const xhtml = "http://www.w3.org/1999/xhtml";

  const urlNodes = entries
    .map((entry) => {
      const loc = absoluteUrl(entry.path);
      const altLinks = entry.alternates
        ? Object.entries(entry.alternates)
            .map(
              ([lang, href]) =>
                `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`
            )
            .join("\n")
        : "";

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
${altLinks}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${xmlns}" xmlns:xhtml="${xhtml}">
${urlNodes}
</urlset>`;
}

/** Write the generated sitemap to public/sitemap.xml (Node.js only). */
export async function writeSitemap(filePath = "public/sitemap.xml") {
  if (typeof window !== "undefined") {
    console.warn("writeSitemap should only be called in a Node/build environment.");
    return;
  }
  const fs = await import("node:fs/promises");
  const xml = generateSitemap();
  await fs.writeFile(filePath, xml, "utf-8");
  console.log(`✅ Sitemap written to ${filePath}`);
}

/* Self-execution for CLI / build scripts */
if (import.meta.url === `file://${process.argv[1]}`) {
  writeSitemap();
}
