import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import type { SupportedLanguage } from "@/i18n";
import { supportedLanguages } from "@/i18n";

export default function AppFooter() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang && supportedLanguages.includes(lang as SupportedLanguage) ? lang : "en") as SupportedLanguage;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: About & Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-primary">GASTRONOM</h3>
            <p className="font-body text-sm leading-relaxed text-secondary-foreground/70">
              {t("footer.about")}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold text-secondary-foreground/90">{t("footer.address")}:</span>{" "}
                  {t("footer.addressValue")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold text-secondary-foreground/90">{t("footer.phone")}:</span>{" "}
                  {t("footer.phoneValue")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold text-secondary-foreground/90">{t("footer.email")}:</span>{" "}
                  <a href={`mailto:${t("footer.emailValue")}`} className="underline hover:text-primary transition-colors">
                    {t("footer.emailValue")}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Legal */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-primary">{t("footer.legal")}</h4>
            <nav className="flex flex-col gap-2" aria-label="Legal">
              <a href={`/${currentLang}/privacy`} className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                {t("footer.privacyPolicy")}
              </a>
              <a href={`/${currentLang}/terms`} className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                {t("footer.termsOfService")}
              </a>
            </nav>
          </div>

          {/* Column 3: Find Us (Map placeholder) */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-primary">{t("footer.findUs")}</h4>
            <a
              href="https://maps.google.com/?q=Knez+Mihailova+12+Belgrade+Serbia"
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-lg border border-border/20"
              aria-label={t("footer.findUs")}
            >
              <div className="flex h-36 items-center justify-center bg-deep-darker/50 transition-colors group-hover:bg-deep-darker/70">
                <div className="flex flex-col items-center gap-2 text-secondary-foreground/50 group-hover:text-primary transition-colors">
                  <MapPin className="h-8 w-8" />
                  <span className="font-body text-xs uppercase tracking-widest">{t("footer.findUs")}</span>
                </div>
              </div>
            </a>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-primary">{t("footer.followUs")}</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 text-secondary-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 text-secondary-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 text-secondary-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {/* TripAdvisor — no lucide icon, using a text mark */}
                <span className="font-display text-sm font-bold">TA</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border/20 pt-6 text-center">
          <p className="font-body text-xs text-secondary-foreground/50">
            © {currentYear} GASTRONOM. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
