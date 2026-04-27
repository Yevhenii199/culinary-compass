import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SupportedLanguage } from "@/i18n";

export default function MenuHero() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  return (
    <section className="relative bg-secondary py-20">
      <div className="container">
        <div className="text-center">
          <div className="mx-auto mb-4 h-px w-12 bg-primary" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">
            {t("navigation.menu")}
          </h1>
          <p className="mt-4 font-body text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            {currentLang === "en" && "Discover our carefully curated selection of traditional Serbian and Russian cuisine"}
            {currentLang === "sr" && "Otkrijte naš pažljivo odabran izbor tradicionalne srpske i ruske kuhinje"}
            {currentLang === "ru" && "Откройте для себя наш тщательно подобранный выбор традиционной сербской и русской кухни"}
          </p>
          <div className="mt-4 h-px w-12 mx-auto bg-primary" />
        </div>
      </div>
    </section>
  );
}
