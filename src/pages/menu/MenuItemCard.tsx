import { SupportedLanguage } from "@/i18n";
import { formatPrice } from "./utils";

interface MenuItemCardProps {
  item: MenuItem;
  currentLang: SupportedLanguage;
}

export default function MenuItemCard({ item, currentLang }: MenuItemCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {item.name[currentLang]}
          </h3>
          <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
            {item.description[currentLang]}
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
  );
}
