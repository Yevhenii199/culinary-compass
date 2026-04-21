interface LocalizedString {
  en: string;
  sr: string;
  ru: string;
}

interface MenuItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  category: string;
  imageUrl: string;
}

interface MenuCategory {
  id: string;
  name: LocalizedString;
  items: MenuItem[];
}

