import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  src: string;
  alt: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
  className?: string;
  children?: React.ReactNode;
}

const SWIPE_THRESHOLD = 50;

export default function HeroSlider({
  slides,
  autoPlayInterval = 6000,
  className,
  children,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLElement | null>(null);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [isPaused, autoPlayInterval, total]);

  // Pause when tab not visible
  useEffect(() => {
    const onVis = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Галерея главных изображений"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={cn(
        "relative h-[85vh] min-h-[600px] w-full overflow-hidden outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
        className,
      )}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => {
          const isActive = i === current;
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} из ${total}`}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={1920}
                height={1080}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-darker/90 via-deep-darker/50 to-deep-darker/30" />
      </div>

      {/* Content slot */}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          {children}
        </div>
      )}

      {/* Dots */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Выбор слайда"
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
        >
          {slides.map((_, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                 aria-label={`Перейти к слайду ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep-darker",
                  isActive ? "w-8 bg-primary" : "w-2 bg-cream/50 hover:bg-cream/80",
                )}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
