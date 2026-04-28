export interface WineItem {
  name: string;
  producer: string;
  volume?: string;
  price: number;
}

export interface WineRegion {
  name: LocalizedString;
  items: WineItem[];
}

export interface WineCategory {
  id: string;
  name: LocalizedString;
  regions: WineRegion[];
}

export const wineData: WineCategory[] = [
  {
    id: "sparkling",
    name: { en: "Sparkling Wines", sr: "Pjenušava vina", ru: "Игристые вина" },
    regions: [
      {
        name: { en: "Selection", sr: "Izbor", ru: "Подборка" },
        items: [
          { name: "Prosecco Brut Romeo & Jullia", producer: "Vinarija Pasqua, Italija", volume: "0.20 l", price: 10 },
          { name: "Prosecco Brut Romeo & Jullia", producer: "Vinarija Pasqua, Italija", volume: "0.75 l", price: 30 },
          { name: "Champagne Blanc de Blanc's Grand Cru", producer: "Bruno Paillard, Francuska", volume: "0.75 l", price: 220 },
        ],
      },
    ],
  },
  {
    id: "white",
    name: { en: "White Wines", sr: "Bijela vina", ru: "Белые вина" },
    regions: [
      {
        name: { en: "Region", sr: "Region", ru: "Регион" },
        items: [
          { name: "Arhonto Chardonnay", producer: "Vinarija Krgović, Crna Gora", volume: "0.75 l", price: 35 },
          { name: "Žuti Cvet", producer: "Vinarija Aleksić (Tamjanika), Srbija", volume: "0.15 l", price: 5 },
          { name: "Žuti Cvet", producer: "Vinarija Aleksić (Tamjanika), Srbija", volume: "0.75 l", price: 34 },
          { name: "Terasa Sauvignon Blanc", producer: "Vinarija Matuli, Srbija", volume: "0.75 l", price: 36 },
          { name: "Malvazija Gourmet", producer: "Vinarija Vinakoper, Istra, Slovenija", volume: "0.75 l", price: 39 },
          { name: "Pošip", producer: "Korta Katarina, Hrvatska", volume: "0.75 l", price: 70 },
        ],
      },
      {
        name: { en: "Italy", sr: "Italija", ru: "Италия" },
        items: [
          { name: "Pinot Grigio Della Venezia Black Label", producer: "Vinarija Pasqua", volume: "0.75 l", price: 31 },
        ],
      },
      {
        name: { en: "France", sr: "Francuska", ru: "Франция" },
        items: [
          { name: "Côtes du Rhône Reserve Blanc", producer: "Vinarija Famille Perrin", volume: "0.75 l", price: 31 },
          { name: "Chablis Le Finage", producer: "Vinarija La Chablisienne", volume: "0.75 l", price: 65 },
        ],
      },
    ],
  },
  {
    id: "rose",
    name: { en: "Rosé Wines", sr: "Rose vina", ru: "Розовые вина" },
    regions: [
      {
        name: { en: "Region", sr: "Region", ru: "Регион" },
        items: [
          { name: "Arhonto Rose", producer: "Vinarija Krgović, Crna Gora", volume: "0.75 l", price: 30 },
          { name: "Barbara", producer: "Vinarija Aleksić (Muscat Hamburg & Cabernet Sauvignon), Srbija", volume: "0.15 l", price: 5 },
          { name: "Barbara", producer: "Vinarija Aleksić (Muscat Hamburg & Cabernet Sauvignon), Srbija", volume: "0.75 l", price: 29 },
        ],
      },
      {
        name: { en: "Italy", sr: "Italija", ru: "Италия" },
        items: [
          { name: "11 Minutes Trevenezie", producer: "Vinarija Pasqua (Corvina, Trebbiano di Lugana, Syrah, Carmenère)", volume: "0.75 l", price: 30 },
        ],
      },
      {
        name: { en: "France", sr: "Francuska", ru: "Франция" },
        items: [
          { name: "Studio by Miraval", producer: "Famille Perrin (Cinsault, Grenache, Rolle and Tibouren)", volume: "0.75 l", price: 39 },
        ],
      },
    ],
  },
  {
    id: "red",
    name: { en: "Red Wines", sr: "Crvena vina", ru: "Красные вина" },
    regions: [
      {
        name: { en: "Region", sr: "Region", ru: "Регион" },
        items: [
          { name: "Vranac", producer: "Vinarija Vukićević, Crna Gora", volume: "0.75 l", price: 35 },
          { name: "Kratošija ‘Primitivo di Montenegro’", producer: "Vinarija Krgović, Crna Gora", volume: "0.75 l", price: 47 },
          { name: "Kardaš Cabernet Sauvignon", producer: "Vinarija Aleksić, Srbija", volume: "0.187 l", price: 5 },
          { name: "Kardaš Cabernet Sauvignon", producer: "Vinarija Aleksić, Srbija", volume: "0.75 l", price: 31 },
          { name: "Plavac Mali", producer: "Vinarija Korta Katarina, Hrvatska", volume: "0.75 l", price: 57 },
        ],
      },
      {
        name: { en: "Italy", sr: "Italija", ru: "Италия" },
        items: [
          { name: "Zin Primitivo", producer: "Vinarija Pasqua", volume: "0.75 l", price: 30 },
          { name: "Amarone DOCG", producer: "Vinarija Pasqua", volume: "0.75 l", price: 115 },
        ],
      },
      {
        name: { en: "France", sr: "Francuska", ru: "Франция" },
        items: [
          { name: "Côtes du Rhône Reserve Rouge", producer: "Vinarija Famille Perrin", volume: "0.75 l", price: 31 },
        ],
      },
    ],
  },
];
