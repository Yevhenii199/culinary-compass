import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl md:text-7xl font-bold text-secondary tracking-wide">
        {t("home.hero.title")}
      </h1>
      <p className="mt-4 font-body text-lg text-muted-foreground max-w-md">
        {t("home.hero.subtitle")}
      </p>
      <div className="mt-8 h-px w-24 bg-primary" />
    </div>
  );
}
