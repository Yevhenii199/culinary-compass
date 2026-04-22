import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SupportedLanguage } from "@/i18n";
import { menuData } from "@/data/menuData";
import SEO from "@/components/SEO";
import MenuHero from "./menu/MenuHero";
import MenuCategorySection from "./menu/MenuCategorySection";
import DietaryNote from "./menu/DietaryNote";

export default function MenuPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${t("navigation.menu")} — ${t("home.hero.title")}`.slice(0, 60)}
        description={t("home.featured.subtitle")}
      />
      <MenuHero />

      <section className="py-16">
        <div className="container max-w-6xl">
          {menuData.map((category, index) => (
            <MenuCategorySection
              key={category.id}
              category={category}
              currentLang={currentLang}
              isFirst={index === 0}
            />
          ))}
        </div>
      </section>

      <DietaryNote />
    </div>
  );
}
