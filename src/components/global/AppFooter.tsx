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
            <h3 className="font-display text-xl font-semibold text-primary">TRPEZA</h3>
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
              href="https://maps.app.goo.gl/YaSVjs1PufCVGuNT6"
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
                href="https://wa.me/38267848108"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 text-secondary-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/trpeza_sutomore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/20 text-secondary-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border/20 pt-6 text-center">
          <p className="font-body text-xs text-secondary-foreground/50">
            © {currentYear} TRPEZA. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
