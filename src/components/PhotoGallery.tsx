import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export default function PhotoGallery({ images, className }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
          className,
        )}
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Открыть изображение: ${img.alt}`}
            className="group relative overflow-hidden rounded-lg bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                width={800}
                height={1067}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-deep-darker/0 transition-colors duration-300 group-hover:bg-deep-darker/20" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-darker/95 p-4 animate-in fade-in-0 duration-200"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Закрыть"
            className="absolute right-4 top-4 z-10 rounded-full bg-deep-darker/60 p-2 text-cream transition-colors hover:bg-deep-darker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                 aria-label="Предыдущее изображение"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-deep-darker/60 p-2 text-cream transition-colors hover:bg-deep-darker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                 aria-label="Следующее изображение"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-deep-darker/60 p-2 text-cream transition-colors hover:bg-deep-darker focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-6xl flex-col items-center"
          >
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="max-h-[85vh] w-auto max-w-full rounded-md object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center font-body text-sm text-cream/70">
              {openIndex + 1} / {images.length} — {images[openIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
