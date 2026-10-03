import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/mockData';

interface ProductCarouselProps {
  onImageClick?: (index: number) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewers, setViewers] = useState(58);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Subtle fluctuation for "pessoas vendo agora"
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next >= 51 && next <= 67 ? next : 58;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="bg-white">
      {/* Live Viewers Pill */}
      <div className="px-4 pt-3">
        <span className="inline-flex items-center gap-1.5 bg-neutral-800 text-white text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full uppercase shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {viewers} pessoas vendo agora
        </span>
      </div>

      {/* Main Image Slider */}
      <div
        className="relative mt-3 select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="cursor-pointer overflow-hidden bg-white"
          onClick={() => onImageClick?.(currentIndex)}
        >
          <img
            src={PRODUCT_IMAGES[currentIndex]}
            alt={`Kit Lava Roupas Líquido 7L - Imagem ${currentIndex + 1}`}
            width={1024}
            height={1024}
            className="w-full h-auto aspect-square object-contain transition-opacity duration-300"
            loading="eager"
          />
        </div>

        {/* Prev Button */}
        <button
          aria-label="Anterior"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-xs shadow-md flex items-center justify-center text-neutral-800 hover:bg-white active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          aria-label="Próximo"
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-xs shadow-md flex items-center justify-center text-neutral-800 hover:bg-white active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter Badge */}
        <span className="absolute bottom-3 right-3 bg-neutral-900/70 backdrop-blur-xs text-white text-xs px-2.5 py-0.5 rounded-full font-medium tracking-wider">
          {currentIndex + 1}/{PRODUCT_IMAGES.length}
        </span>
      </div>
    </div>
  );
};
