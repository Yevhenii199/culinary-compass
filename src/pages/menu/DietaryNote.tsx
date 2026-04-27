import { useParams } from "react-router-dom";
import { SupportedLanguage } from "@/i18n";

export default function DietaryNote() {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container max-w-4xl text-center">
        <div className="mx-auto mb-4 h-px w-12 bg-primary" />
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
          {currentLang === "en" && "Специальные Диетические Требования"}
          {currentLang === "sr" && "Посебни Дијететски Захтеви"}
          {currentLang === "ru" && "Специальные Диетические Требования"}
        </h3>
        <p className="mt-4 font-body text-muted-foreground max-w-2xl mx-auto">
          {currentLang === "en" && "Пожалуйста, сообщите нашему персоналу об аллергиях или диетических ограничениях. Наш шеф-повар с радостью учтёт ваши потребности."}
          {currentLang === "sr" && "Молимо обавестите наше особље о алергијама или дијететским ограничењима. Наш кувар ће радо прилагодити ваше потребе."}
          {currentLang === "ru" && "Пожалуйста, сообщите нашему персоналу об аллергиях или диетических ограничениях. Наш шеф-повар с радостью учтёт ваши потребности."}
        </p>
        <div className="mt-4 h-px w-12 mx-auto bg-primary" />
      </div>
    </section>
  );
}
