import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { OFFERS } from '../data/mockData';
import { OfferItem } from '../types';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer: (offerId: string) => void;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  onSelectOffer,
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center backdrop-blur-2xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[480px] rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull bar */}
        <div className="flex justify-center pt-2.5">
          <div className="w-10 h-1 rounded-full bg-neutral-300" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-3 border-b border-neutral-100">
          <h2 className="font-bold text-lg text-neutral-900">Escolha sua oferta</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-800 text-sm font-medium px-2 py-1 rounded"
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>

        {/* Offers Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {OFFERS.map((offer: OfferItem) => {
            const isFeatured = offer.featured;
            return (
              <div
                key={offer.id}
                onClick={() => onSelectOffer(offer.id)}
                className={`relative flex items-center gap-3.5 rounded-2xl bg-white p-3.5 pr-4 transition-all cursor-pointer active:scale-99 hover:shadow-md ${
                  isFeatured
                    ? 'border-2 border-red-500 shadow-sm mt-3 bg-red-50/10'
                    : 'border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-4 bg-red-600 text-white text-[10px] font-extrabold tracking-wider px-3 py-0.5 rounded-md shadow-xs">
                    MAIS VENDIDO
                  </span>
                )}

                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-20 h-20 object-contain bg-neutral-50 rounded-xl shrink-0 p-1 border border-neutral-100"
                  loading="lazy"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-neutral-900 leading-tight">
                    {offer.title}
                  </p>
                  {offer.savings ? (
                    <p className="text-xs font-semibold text-emerald-600 mt-1">
                      Economize {formatPrice(offer.savings)}
                    </p>
                  ) : (
                    <p className="text-xs text-neutral-500 mt-1">{offer.subtitle}</p>
                  )}
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-xl font-extrabold text-red-600">
                      {formatPrice(offer.price)}
                    </span>
                    <span className="text-xs text-neutral-400 line-through">
                      {formatPrice(offer.originalPrice)}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-500">
                  <ChevronRight className="w-5 h-5 text-neutral-500" />
                </div>
              </div>
            );
          })}

          {/* Secure Trust note */}
          <div className="flex items-center justify-center gap-2 pt-2 pb-1 text-xs text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="font-semibold text-neutral-700">
              Pagamento Seguro via SigiloPay • PIX Instantâneo • Frete grátis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
