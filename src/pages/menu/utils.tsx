import { Utensils, Wine, Coffee } from "lucide-react";

export function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case "appetizers":
      return <Utensils className="h-6 w-6" />;
    case "mains":
      return <Utensils className="h-6 w-6" />;
    case "desserts":
      return <Coffee className="h-6 w-6" />;
    case "drinks":
      return <Wine className="h-6 w-6" />;
    default:
      return <Utensils className="h-6 w-6" />;
  }
}

export function formatPrice(price: number) {
  return `${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} EUR`;
}
