import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SupportedLanguage } from "@/i18n";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SEO from "@/components/SEO";

export default function AboutPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${t("about.title")} — ${t("about.subtitle")}`.slice(0, 60)}
        description={t("about.subtitle")}
      />
      <section className="relative bg-secondary py-20">
        <div className="container">
          <div className="text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">
              {t("about.title")}
            </h1>
            <p className="mt-4 font-body text-lg text-secondary-foreground/70">
              {t("about.subtitle")}
            </p>
            <div className="mt-4 h-px w-12 mx-auto bg-primary" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <article className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-foreground">
                {t("about.story.title")}
              </h2>

              {(t("about.story.paragraphs", { returnObjects: true }) as string[]).map((paragraph: string, index: number) => (
                  <p
                    key={index}
                    className="font-body text-base text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
            </article>

            <div className="space-y-8">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                <svg
                  className="w-full h-full opacity-20"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="map-grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#map-grid)" />
                  <circle cx="200" cy="200" r="20" fill="currentColor" opacity="0.6" />
                  <circle cx="200" cy="200" r="25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <p className="font-display text-lg font-semibold text-foreground">
                      {currentLang === "en"
                        ? "Interactive Map"
                        : currentLang === "sr"
                        ? "Interaktivna Mapa"
                        : "Интерактивная Карта"}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      {currentLang === "en"
                        ? "Google Map Coming Soon"
                        : currentLang === "sr"
                        ? "Uskoro Google Mapa"
                        : "Google Карта Скоро"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t("about.contact.title")}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">
                        {t("about.contact.address")}
                      </p>
                      <p className="font-body text-foreground">
                        {t("about.contact.addressValue")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">
                        {t("about.contact.phone")}
                      </p>
                      <a
                        href={`tel:${t("about.contact.phoneValue").replace(/\s/g, "")}`}
                        className="font-body text-primary hover:text-primary/80 transition-colors"
                      >
                        {t("about.contact.phoneValue")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">
                        {t("about.contact.email")}
                      </p>
                      <a
                        href={`mailto:${t("about.contact.emailValue")}`}
                        className="font-body text-primary hover:text-primary/80 transition-colors"
                      >
                        {t("about.contact.emailValue")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t("about.hours.title")}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">
                      {t("about.hours.weekday")}
                    </span>
                    <span className="font-medium text-foreground">
                      {t("about.hours.weekdayTime")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">
                      {t("about.hours.saturday")}
                    </span>
                    <span className="font-medium text-foreground">
                      {t("about.hours.saturdayTime")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-muted-foreground">
                      {t("about.hours.sunday")}
                    </span>
                    <span className="font-medium text-foreground">
                      {t("about.hours.sundayTime")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground italic pt-2">
                    {t("about.hours.closed")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
