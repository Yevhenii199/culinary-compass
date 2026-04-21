import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import PhotoGallery, { type GalleryImage } from "@/components/PhotoGallery";
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import hero4 from "@/assets/hero-4.jpeg";
import hero5 from "@/assets/hero-5.jpeg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import gallery1 from "@/assets/gallery-1.jpeg";
import gallery2 from "@/assets/gallery-2.jpeg";
import gallery3 from "@/assets/gallery-3.jpeg";
import gallery4 from "@/assets/gallery-4.jpeg";
import gallery5 from "@/assets/gallery-5.jpeg";
import gallery6 from "@/assets/gallery-6.jpeg";
import gallery7 from "@/assets/gallery-7.jpeg";
import gallery8 from "@/assets/gallery-8.jpeg";
import gallery9 from "@/assets/gallery-9.jpeg";
import gallery10 from "@/assets/gallery-10.jpeg";

const heroSlides: HeroSlide[] = [
  { src: hero1, alt: "Grilled octopus with black risotto" },
  { src: hero2, alt: "Wine toast at GASTRONOM" },
  { src: hero3, alt: "Signature seafood plating" },
  { src: hero4, alt: "Sliced steak with red wine" },
  { src: hero5, alt: "Octopus tentacle close-up with olives" },
];

const galleryImages: GalleryImage[] = [
  { src: gallery1, alt: "Sliced tuna steak with fresh lemon" },
  { src: gallery2, alt: "Sommelier presenting a bottle of Italian wine" },
  { src: gallery3, alt: "Seafood pasta with Pinot Grigio" },
  { src: gallery4, alt: "Grilled octopus on black risotto with olives" },
  { src: gallery5, alt: "Plated seafood tagliatelle with white wine" },
  { src: gallery6, alt: "Guest enjoying seafood pasta" },
  { src: gallery7, alt: "Seafood pasta with rosé wine" },
  { src: gallery8, alt: "Close-up of octopus and mussel pasta" },
  { src: gallery9, alt: "Restaurant table setting with seafood pasta" },
  { src: gallery10, alt: "Plated frutti di mare with rosé" },
];

const dishImages = [dish1, dish2, dish3, dish4];
const dishKeys = ["dish1", "dish2", "dish3", "dish4"];

export default function Index() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang?: string }>();
  const currentLang = lang || "en";

  const testimonials = t("home.testimonials.items", { returnObjects: true }) as Array<{
    quote: string;
    author: string;
    role: string;
  }>;

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides}>
        <div className="flex flex-col items-center text-center max-w-3xl">
          <div className="mb-6 h-px w-16 bg-primary" />
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide text-cream">
            {t("home.hero.title")}
          </h1>
          <p className="mt-5 font-body text-base sm:text-lg text-cream/70 max-w-xl leading-relaxed">
            {t("home.hero.subtitle")}
          </p>
          <Link
            to={`/${currentLang}/menu`}
            className="mt-10 inline-block rounded-sm bg-primary px-8 py-3.5 font-body text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep-darker"
          >
            {t("home.hero.cta")}
          </Link>
          <div className="mt-6 h-px w-16 bg-primary" />
        </div>
      </HeroSlider>

      {/* Featured Dishes */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <div className="mx-auto mb-4 h-px w-12 bg-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              {t("home.featured.title")}
            </h2>
            <p className="mt-3 font-body text-muted-foreground">
              {t("home.featured.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishKeys.map((key, i) => (
              <div
                key={key}
                className="group overflow-hidden rounded-lg bg-card border border-border transition-shadow hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={dishImages[i]}
                    alt={t(`home.dishes.${key}.name`)}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-card-foreground">
                    {t(`home.dishes.${key}.name`)}
                  </h3>
                  <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                    {t(`home.dishes.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="text-center mb-14">
            <div className="mx-auto mb-4 h-px w-12 bg-primary" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-secondary-foreground">
              {t("home.testimonials.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(testimonials) &&
              testimonials.map((item, i) => (
                <blockquote
                  key={i}
                  className="flex flex-col rounded-lg border border-border/20 bg-deep-darker/30 p-8"
                >
                  <Quote className="mb-4 h-6 w-6 text-primary" />
                  <p className="flex-1 font-body text-sm italic leading-relaxed text-secondary-foreground/80">
                    "{item.quote}"
                  </p>
                  <footer className="mt-6 border-t border-border/20 pt-4">
                    <cite className="not-italic">
                      <span className="block font-display text-sm font-semibold text-primary">
                        {item.author}
                      </span>
                      <span className="block font-body text-xs text-secondary-foreground/50">
                        {item.role}
                      </span>
                    </cite>
                  </footer>
                </blockquote>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
