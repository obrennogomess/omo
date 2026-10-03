import React, { useState, useEffect } from 'react';
import {
  Zap,
  Clock,
  Bookmark,
  Star,
  Truck,
  ShieldCheck,
  ChevronRight,
  Check,
} from 'lucide-react';

interface FlashSaleBannerProps {
  onBookmarkToggle?: () => void;
  isBookmarked?: boolean;
}

export const FlashSaleBanner: React.FC<FlashSaleBannerProps> = ({
  onBookmarkToggle,
  isBookmarked = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(254); // 4 minutes and 14 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 600; // Reset to 10 minutes when finished
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  // Compute dynamic delivery range dates (e.g. 3 to 7 days from now)
  const getDeliveryDateRange = () => {
    const now = new Date();
    const d1 = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const d2 = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
    const months = [
      'jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.',
      'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.',
    ];
    return `Receba até ${d1.getDate()}–${d2.getDate()} de ${months[d2.getMonth()]}`;
  };

  return (
    <div className="bg-white pb-1">
      {/* Flash Sale Banner Strip */}
      <div className="mx-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-3 shadow-xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight">R$ 49,92</span>
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs">
              <span className="line-through opacity-90">R$ 233,78</span>
              <span className="bg-white/20 backdrop-blur-xs rounded px-1.5 py-0.5 font-bold">
                Economize 78%
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-bounce" />
              Oferta Relâmpago
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 bg-white text-rose-600 text-xs font-bold px-2 py-1 rounded-md shadow-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>TERMINA EM {minutes}:{seconds}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons / Savings Pills */}
      <div className="px-3 mt-3 flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded px-2 py-1">
          Economize R$183,86
        </span>
        <span className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded px-2 py-1">
          Economize 78% COM CUPOM
        </span>
      </div>

      {/* Product Title & Bookmark */}
      <div className="px-3 mt-3 flex items-start justify-between gap-3">
        <h1 className="text-base font-semibold leading-snug text-neutral-900">
          Kit Lava Roupas Líquido 7L
        </h1>
        <button
          aria-label="Salvar"
          onClick={onBookmarkToggle}
          className={`shrink-0 p-1.5 -mt-1 transition-colors ${
            isBookmarked ? 'text-amber-500' : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
        </button>
      </div>

      {/* Rating & Sold count */}
      <div className="px-3 mt-1 flex items-center gap-2 text-sm text-neutral-600">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="font-semibold text-neutral-900">4.8</span>
        <span className="text-neutral-500">(412)</span>
        <span className="text-neutral-300">|</span>
        <span className="text-neutral-600">3893 vendidos</span>
      </div>

      {/* Shipping Box */}
      <div className="mx-3 mt-4 border border-neutral-200 rounded-lg p-3 flex gap-3 bg-neutral-50/50">
        <Truck className="w-5 h-5 mt-0.5 text-neutral-700 shrink-0" />
        <div className="text-sm">
          <div className="font-bold text-neutral-900">{getDeliveryDateRange()}</div>
          <div className="mt-0.5 text-neutral-600">
            Taxa de envio: <span className="text-emerald-600 font-semibold">Grátis</span>
          </div>
        </div>
      </div>

      {/* Customer Protection Box */}
      <div className="mx-3 mt-3 border border-amber-200 bg-amber-50/40 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-sm text-neutral-900">Proteção do cliente</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-neutral-700">
          <div className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <span>Devolução gratuita</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <span>Pagamento seguro</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <span>Reembolso automático por dano</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
            <span>Cupom por atraso na coleta</span>
          </div>
        </div>
      </div>

      {/* Offers Card */}
      <div className="px-3 mt-4">
        <h2 className="text-sm font-bold text-neutral-900">Ofertas</h2>
        <div className="mt-2 rounded-lg border border-rose-200 bg-rose-50/40 p-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-rose-600 font-extrabold text-base">Frete Grátis</div>
            <div className="text-xs text-neutral-700 mt-0.5">
              Entrega gratuita para todo o Brasil em compras acima de R$ 50,00
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-1">
            <Check className="w-3.5 h-3.5" /> Aplicado
          </span>
        </div>
      </div>

      {/* Key Benefits Checklist */}
      <ul className="px-3 mt-4 space-y-2 text-sm text-neutral-800">
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <span>Frete Grátis para todo o Brasil</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <span>Entrega expressa (1-3 dias úteis)</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <span>Garantia de originalidade e qualidade</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <span>Pagamento seguro via PIX</span>
        </li>
        <li className="flex items-start gap-2">
          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
          <span>Suporte técnico especializado</span>
        </li>
      </ul>
    </div>
  );
};
