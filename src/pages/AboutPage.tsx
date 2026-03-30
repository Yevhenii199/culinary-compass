import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-16 text-center">
      <h1 className="font-display text-4xl font-bold text-secondary">{t("navigation.about")}</h1>
    </div>
  );
}
