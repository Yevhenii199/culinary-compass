import { Wine } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { SupportedLanguage } from "@/i18n";
import { wineData } from "@/data/wineData";
import { formatPrice } from "./menu/utils";

export default function WineListPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${t("navigation.wineList")} — ${t("home.hero.title")}`.slice(0, 60)}
        description={t("wineList.subtitle")}
      />

      <section className="relative bg-secondary py-20">
        <div className="container">
          <div className="text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">
              {t("navigation.wineList")}
            </h1>
            <p className="mt-4 font-body text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
              {t("wineList.subtitle")}
            </p>
            <div className="mt-4 h-px w-12 mx-auto bg-primary" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl">
          {wineData.map((category, categoryIndex) => (
            <div key={category.id} className={categoryIndex !== 0 ? "mt-20" : ""}>
              <div className="flex items-center gap-3 mb-10">
                <div className="text-primary"><Wine className="h-6 w-6" /></div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  {category.name[currentLang]}
                </h2>
                <div className="flex-1 h-px bg-border ml-4" />
              </div>

              <div className="space-y-10">
                {category.regions.map((region) => (
                  <div key={`${category.id}-${region.name.en}`}>
                    <h3 className="mb-5 font-body text-sm font-bold uppercase tracking-widest text-muted-foreground">
                      {region.name[currentLang]}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {region.items.map((item) => (
                        <div
                          key={`${category.id}-${region.name.en}-${item.name}-${item.volume}`}
                          className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h4 className="font-display text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </h4>
                              <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                                {item.producer}{item.volume ? ` · ${item.volume}` : ""}
                              </p>
                            </div>
                            <div className="shrink-0">
                              <span className="font-display text-lg font-semibold text-primary">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
