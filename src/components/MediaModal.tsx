import React from 'react';
import { X, Play } from 'lucide-react';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: { title: string; image: string } | null;
}

export const MediaModal: React.FC<MediaModalProps> = ({ isOpen, onClose, media }) => {
  if (!isOpen || !media) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-9/16 sm:aspect-square bg-black flex items-center justify-center overflow-hidden">
          <img
            src={media.image}
            alt={media.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          <div className="absolute flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-rose-600/90 flex items-center justify-center shadow-lg text-white animate-pulse">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
            <span className="text-white text-xs font-semibold uppercase tracking-wider bg-black/50 px-3 py-1 rounded-full">
              Demonstração do Produto
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white text-left">
            <h4 className="font-bold text-base">{media.title}</h4>
            <p className="text-xs text-neutral-300 mt-0.5">
              Unboxing e demonstração de rendimento dos 14 Litros originais Unilever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
