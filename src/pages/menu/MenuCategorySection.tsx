import { SupportedLanguage } from "@/i18n";
import { getCategoryIcon } from "./utils";
import MenuItemCard from "./MenuItemCard";

interface MenuCategorySectionProps {
  category: MenuCategory;
  currentLang: SupportedLanguage;
  isFirst: boolean;
}

export default function MenuCategorySection({ category, currentLang, isFirst }: MenuCategorySectionProps) {
  return (
    <div className={!isFirst ? "mt-20" : ""}>
      <div className="flex items-center gap-3 mb-10">
        <div className="text-primary">{getCategoryIcon(category.id)}</div>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
          {category.name[currentLang]}
        </h2>
        <div className="flex-1 h-px bg-border ml-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {category.items.map((item) => (
          <MenuItemCard key={item.id} item={item} currentLang={currentLang} />
        ))}
      </div>
    </div>
  );
}
