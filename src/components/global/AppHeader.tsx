import { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Globe } from "lucide-react";
import { supportedLanguages, type SupportedLanguage } from "@/i18n";

const langLabels: Record<SupportedLanguage, string> = {
  en: "EN",
  sr: "SR",
  ru: "RU",
};

const navKeys = ["home", "gallery", "menu", "about"] as const;
const navPaths: Record<string, string> = {
  home: "",
  gallery: "gallery",
  menu: "menu",
  about: "about",
};

export default function AppHeader() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = (lang && supportedLanguages.includes(lang as SupportedLanguage) ? lang : "en") as SupportedLanguage;

  const switchLanguage = (newLang: SupportedLanguage) => {
    i18n.changeLanguage(newLang);
    // Replace language prefix in current path
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (supportedLanguages.includes(pathSegments[0] as SupportedLanguage)) {
      pathSegments[0] = newLang;
    } else {
      pathSegments.unshift(newLang);
    }
    navigate("/" + pathSegments.join("/"));
    setMobileOpen(false);
  };

  const buildPath = (key: string) => {
    const base = `/${currentLang}`;
    const segment = navPaths[key];
    return segment ? `${base}/${segment}` : base;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to={`/${currentLang}`} className="font-display text-2xl font-bold tracking-widest text-primary">
          ТРПЕЗА
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navKeys.map((key) => (
            <Link
              key={key}
              to={buildPath(key)}
              className="font-body text-sm uppercase tracking-wider text-secondary-foreground/80 transition-colors hover:text-primary"
            >
              {t(`navigation.${key}`)}
            </Link>
          ))}
        </nav>

        {/* Language Switcher (Desktop) */}
        <div className="hidden md:flex items-center gap-1" role="group" aria-label={t("common.language")}>
          <Globe className="mr-1.5 h-4 w-4 text-gold-light" />
          {supportedLanguages.map((l) => (
            <button
              key={l}
              onClick={() => switchLanguage(l)}
              className={`px-2 py-1 text-xs font-body uppercase tracking-wider transition-colors rounded-sm ${
                currentLang === l
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground/60 hover:text-primary"
              }`}
              aria-current={currentLang === l ? "true" : undefined}
              aria-label={`Switch to ${langLabels[l]}`}
            >
              {langLabels[l]}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-secondary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t("common.closeMenu") : t("common.openMenu")}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-secondary">
          <nav className="container flex flex-col gap-4 py-6" aria-label="Mobile">
            {navKeys.map((key) => (
              <Link
                key={key}
                to={buildPath(key)}
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm uppercase tracking-wider text-secondary-foreground/80 hover:text-primary"
              >
                {t(`navigation.${key}`)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Globe className="h-4 w-4 text-gold-light" />
              {supportedLanguages.map((l) => (
                <button
                  key={l}
                  onClick={() => switchLanguage(l)}
                  className={`px-2 py-1 text-xs uppercase tracking-wider rounded-sm ${
                    currentLang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground/60 hover:text-primary"
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
