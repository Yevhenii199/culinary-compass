import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SupportedLanguage } from "@/i18n";
import { Utensils, Wine, Coffee } from "lucide-react";

const menuData: MenuCategory[] = [
  {
    id: "appetizers",
    name: {
      en: "Appetizers",
      sr: "Predjela",
      ru: "Закуски"
    },
    items: [
      {
        id: "appetizers-01",
        name: {
          en: "Serbian Platter",
          sr: "Srpska Plata",
          ru: "Сербское ассорти"
        },
        description: {
          en: "Selection of cured meats, aged cheeses, ajvar, and traditional pickled vegetables with warm flatbread",
          sr: "Izbor dimljenih mesa, zrelih sireva, ajvara i tradicionalnog kiselog povrća sa toplom lepinjom",
          ru: "Ассорти вяленого мяса, выдержанных сыров, айвара и традиционных маринованных овощей с тёплой лепёшкой"
        },
        price: 1890,
        category: "appetizers",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "appetizers-02",
        name: {
          en: "Russian Herring under Fur Coat",
          sr: "Ruska Haringa pod Bundom",
          ru: "Селёдка под Шубой"
        },
        description: {
          en: "Layered salad with herring, beets, potatoes, carrots, eggs, and mayonnaise",
          sr: "Slojevita salata sa haringom, cveklom, krompirom, šargarepom, jajima i majonezom",
          ru: "Слоёный салат из сельди, свёклы, картофеля, моркови, яиц и майонеза"
        },
        price: 1450,
        category: "appetizers",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "appetizers-03",
        name: {
          en: "Smoked Salmon Carpaccio",
          sr: "Karpačo od Dimljenog Lososa",
          ru: "Карпаччо из Копчёного Лосося"
        },
        description: {
          en: "Thin slices of house-smoked salmon with capers, lemon zest, and herb oil",
          sr: "Tanke kriške dimljenog lososa sa kaparima, korom limuna i biljem u ulju",
          ru: "Тонкие ломтики копчёного лосося с каперсами, цедрой лимона и травяным маслом"
        },
        price: 2100,
        category: "appetizers",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "appetizers-04",
        name: {
          en: "Stuffed Bell Peppers",
          sr: "Punjene Paprike",
          ru: "Фаршированный Перец"
        },
        description: {
          en: "Sweet peppers filled with seasoned rice, herbs, and vegetables in tomato sauce",
          sr: "Slatke paprike punjene začinjenim pirinčem, biljem i povrćem u paradajz sosu",
          ru: "Сладкий перец, фаршированный приправленным рисом, зеленью и овощами в томатном соусе"
        },
        price: 1290,
        category: "appetizers",
        imageUrl: "/placeholder.svg"
      }
    ]
  },
  {
    id: "mains",
    name: {
      en: "Main Courses",
      sr: "Glavna Jela",
      ru: "Основные Блюда"
    },
    items: [
      {
        id: "mains-01",
        name: {
          en: "Ćevapčići Royale",
          sr: "Kraljevski Ćevapčići",
          ru: "Чевапчичи Роял"
        },
        description: {
          en: "Hand-formed beef and lamb rolls with smoked paprika aioli, charred onion relish, and fresh lepinja bread",
          sr: "Ručno oblikovani roštilj od govedine i jagnjetine sa dimljenim paprika ajolijem, prženim lukom i svežom lepinjom",
          ru: "Ручной формовки рулетики из говядины и баранины с копчёным паприка-айоли, жареным луком и свежей лепёшкой"
        },
        price: 2490,
        category: "mains",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "mains-02",
        name: {
          en: "Beef Stroganoff",
          sr: "Goveđi Stroganof",
          ru: "Бефстроганов"
        },
        description: {
          en: "Tender beef strips in rich sour cream sauce with mushrooms, served with crispy potato rösti",
          sr: "Nežne trake govedine u bogatom sosu od pavlake sa pečurkama, serviran sa hrskavim rösti krompirom",
          ru: "Нежные полоски говядины в богатом сметанном соусе с грибами, подаётся с хрустящим картофельным рёсти"
        },
        price: 3200,
        category: "mains",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "mains-03",
        name: {
          en: "Danube Salmon",
          sr: "Dunavski Losos",
          ru: "Дунайский Лосось"
        },
        description: {
          en: "Pan-seared salmon fillet with golden beurre blanc, fresh dill, and seasonal vegetables",
          sr: "Pečeni file lososa sa zlatnim beurre blanc sosom, svežom mirođijom i sezonskim povrćem",
          ru: "Обжаренное филе лосося с золотистым бёр-блан, свежим укропом и сезонными овощами"
        },
        price: 3890,
        category: "mains",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "mains-04",
        name: {
          en: "Belgrade Goulash",
          sr: "Beogradski Gulaš",
          ru: "Белградский Гуляш"
        },
        description: {
          en: "Slow-braised beef in rich paprika broth with root vegetables, fresh herbs, and homemade bread dumplings",
          sr: "Polako dinstana govedina u bogatom paprika sosu sa korenastim povrćem, svežim biljem i domaćim knedlama",
          ru: "Медленно тушёная говядина в насыщенном паприка-бульоне с корнеплодами, свежей зеленью и домашними клёцками"
        },
        price: 2890,
        category: "mains",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "mains-05",
        name: {
          en: "Chicken Kiev",
          sr: "Piletina po Kijevski",
          ru: "Котлета по-Киевски"
        },
        description: {
          en: "Crispy breaded chicken breast filled with herb butter, served with garlic mashed potatoes",
          sr: "Hrskavo panirano pileće belo meso punjeno biljem u puteru, serviran sa krompirom u puteru sa belim lukom",
          ru: "Хрустящая панированная куриная грудка с начинкой из травяного масла, подаётся с чесночным картофельным пюре"
        },
        price: 2690,
        category: "mains",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "mains-06",
        name: {
          en: "Grilled Lamb Chops",
          sr: "Jagnjeće Kotleti sa Roštilja",
          ru: "Бараньи Отбивные на Гриле"
        },
        description: {
          en: "Herb-marinated lamb chops grilled to perfection with rosemary jus and grilled vegetables",
          sr: "Jagnjeće kotlete marinirane u bilju, pečene do savršenstva sa sosom od ruzmarina i pečenim povrćem",
          ru: "Маринованные в травах бараньі отбивные, приготовленные на гриле до совершенства с розмариновым соусом и овощами гриль"
        },
        price: 4290,
        category: "mains",
        imageUrl: "/placeholder.svg"
      }
    ]
  },
  {
    id: "desserts",
    name: {
      en: "Desserts",
      sr: "Deserti",
      ru: "Десерты"
    },
    items: [
      {
        id: "desserts-01",
        name: {
          en: "Chocolate Fondant",
          sr: "Čokoladni Fondan",
          ru: "Шоколадный Фондан"
        },
        description: {
          en: "Rich dark chocolate cake with molten center, fresh berries, and vanilla gelato",
          sr: "Bogata torta od tamne čokolade sa rastopljenim centrom, svežim bobičastim voćem i vanila sladoledom",
          ru: "Насыщенный торт из тёмного шоколада с жидкой серединой, свежими ягодами и ванильным джелато"
        },
        price: 1290,
        category: "desserts",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "desserts-02",
        name: {
          en: "Pavlova with Seasonal Fruits",
          sr: "Pavlova sa Sezonskim Voćem",
          ru: "Павлова с Сезонными Фруктами"
        },
        description: {
          en: "Light meringue base with whipped cream and fresh seasonal fruits",
          sr: "Lagana beza sa šlagom i svežim sezonskim voćem",
          ru: "Лёгкая меренга со взбитыми сливками и свежими сезонными фруктами"
        },
        price: 990,
        category: "desserts",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "desserts-03",
        name: {
          en: "Medovik (Honey Cake)",
          sr: "Medovik (Torta od Meda)",
          ru: "Медовик"
        },
        description: {
          en: "Traditional Russian layered honey cake with sour cream frosting and walnut crumble",
          sr: "Tradicionalna ruska slojevita torta od meda sa kremom od pavlake i mrvljenim orasima",
          ru: "Традиционный русский слоёный медовый торт со сметанным кремом и ореховой крошкой"
        },
        price: 1190,
        category: "desserts",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "desserts-04",
        name: {
          en: "Serbian Walnut Roll",
          sr: "Srpska Orahnjača",
          ru: "Сербский Ореховый Рулет"
        },
        description: {
          en: "Classic rolled pastry filled with ground walnuts, honey, and cinnamon",
          sr: "Klasično rolano testo punjeno mlevenim orasima, medom i cimetom",
          ru: "Классическая рулетная выпечка с начинкой из молотых орехов, мёда и корицы"
        },
        price: 890,
        category: "desserts",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "desserts-05",
        name: {
          en: "Crème Brûlée",
          sr: "Krem Brile",
          ru: "Крем-Брюле"
        },
        description: {
          en: "Classic French custard with caramelized sugar crust and vanilla bean",
          sr: "Klasični francuski krem sa karamelizovanom šećernom korkom i vanilom",
          ru: "Классический французский крем с карамелизированной сахарной корочкой и ванилью"
        },
        price: 1090,
        category: "desserts",
        imageUrl: "/placeholder.svg"
      }
    ]
  },
  {
    id: "drinks",
    name: {
      en: "Beverages",
      sr: "Pića",
      ru: "Напитки"
    },
    items: [
      {
        id: "drinks-01",
        name: {
          en: "Serbian Rakija Selection",
          sr: "Izbor Srpskih Rakija",
          ru: "Выбор Сербских Ракий"
        },
        description: {
          en: "Premium selection of plum, apricot, and quince brandies (50ml)",
          sr: "Premium izbor rakija od šljive, kajsije i dunje (50ml)",
          ru: "Премиум выбор сливовой, абрикосовой и айвовой водки (50ml)"
        },
        price: 690,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "drinks-02",
        name: {
          en: "Russian Vodka Flight",
          sr: "Let Ruskih Votki",
          ru: "Полёт Русской Водки"
        },
        description: {
          en: "Three premium Russian vodkas served chilled with traditional accompaniments (3x40ml)",
          sr: "Tri premium ruske votke servirane ohlađene sa tradicionalnim prilogom (3x40ml)",
          ru: "Три премиум русских водки, поданные охлаждёнными с традиционными закусками (3x40ml)"
        },
        price: 1290,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "drinks-03",
        name: {
          en: "House Red Wine",
          sr: "Domaće Crno Vino",
          ru: "Домашнее Красное Вино"
        },
        description: {
          en: "Serbian Vranac from Župa region, full-bodied with notes of dark fruit (glass 150ml)",
          sr: "Srpski Vranac iz regiona Župe, punog tela sa notama tamnog voća (čaša 150ml)",
          ru: "Сербский Вранац из региона Жупа, полнотелое с нотами тёмных фруктов (бокал 150ml)"
        },
        price: 590,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "drinks-04",
        name: {
          en: "House White Wine",
          sr: "Domaće Belo Vino",
          ru: "Домашнее Белое Вино"
        },
        description: {
          en: "Smederevka from Šumadija region, crisp and aromatic (glass 150ml)",
          sr: "Smederevka iz regiona Šumadije, osvežavajuće i aromatično (čaša 150ml)",
          ru: "Смедеревка из региона Шумадия, свежее и ароматное (бокал 150ml)"
        },
        price: 590,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "drinks-05",
        name: {
          en: "Turkish Coffee",
          sr: "Domaća Kafa",
          ru: "Турецкий Кофе"
        },
        description: {
          en: "Traditional preparation served with Turkish delight",
          sr: "Tradicionalna priprema servirana sa rahat-lokumom",
          ru: "Традиционное приготовление, подаётся с рахат-лукумом"
        },
        price: 290,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "drinks-06",
        name: {
          en: "Russian Tea Service",
          sr: "Ruski Čaj Servis",
          ru: "Русский Чайный Сервиз"
        },
        description: {
          en: "Traditional Russian tea service with preserves and lemon",
          sr: "Tradicionalni ruski čaj servis sa džemom i limunom",
          ru: "Традиционный русский чайный сервиз с вареньем и лимоном"
        },
        price: 390,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      },
      {
        id: "drinks-07",
        name: {
          en: "Freshly Squeezed Juice",
          sr: "Sveže Ceđeni Sok",
          ru: "Свежевыжатый Сок"
        },
        description: {
          en: "Choice of orange, grapefruit, or seasonal fruit (250ml)",
          sr: "Izbor narandže, grejpfruta ili sezonskog voća (250ml)",
          ru: "Выбор апельсина, грейпфрута или сезонного фрукта (250ml)"
        },
        price: 490,
        category: "drinks",
        imageUrl: "/placeholder.svg"
      }
    ]
  }
];

export default function MenuPage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = (lang || "en") as SupportedLanguage;

  const getCategoryIcon = (categoryId: string) => {
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
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RSD`;
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-secondary py-20">
        <div className="container">
          <div className="text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground">
              {t("navigation.menu")}
            </h1>
            <p className="mt-4 font-body text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
              {currentLang === "en" && "Discover our carefully curated selection of traditional Serbian and Russian cuisine"}
              {currentLang === "sr" && "Otkrijte naš pažljivo odabran izbor tradicionalne srpske i ruske kuhinje"}
              {currentLang === "ru" && "Откройте для себя наш тщательно подобранный выбор традиционной сербской и русской кухни"}
            </p>
            <div className="mt-4 h-px w-12 mx-auto bg-primary" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-6xl">
          {menuData.map((category, categoryIndex) => (
            <div key={category.id} className={categoryIndex > 0 ? "mt-20" : ""}>
              <div className="flex items-center gap-3 mb-10">
                <div className="text-primary">{getCategoryIcon(category.id)}</div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  {category.name[currentLang]}
                </h2>
                <div className="flex-1 h-px bg-border ml-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30"
                  >
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container max-w-4xl text-center">
          <div className="mx-auto mb-4 h-px w-12 bg-primary" />
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            {currentLang === "en" && "Special Dietary Requirements"}
            {currentLang === "sr" && "Posebni Dijetetski Zahtevi"}
            {currentLang === "ru" && "Специальные Диетические Требования"}
          </h3>
          <p className="mt-4 font-body text-muted-foreground max-w-2xl mx-auto">
            {currentLang === "en" && "Please inform our staff about any allergies or dietary restrictions. Our chef will be happy to accommodate your needs."}
            {currentLang === "sr" && "Molimo obavestite naše osoblje o alergijama ili dijetetskim ograničenjima. Naš kuvar će rado prilagoditi vaše potrebe."}
            {currentLang === "ru" && "Пожалуйста, сообщите нашему персоналу об аллергиях или диетических ограничениях. Наш шеф-повар с радостью учтёт ваши потребности."}
          </p>
          <div className="mt-4 h-px w-12 mx-auto bg-primary" />
        </div>
      </section>
    </div>
  );
}
