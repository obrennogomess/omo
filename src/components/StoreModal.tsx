import React from 'react';
import { X, BadgeCheck, Star, ShieldCheck, Award } from 'lucide-react';
import { STORE_DATA } from '../data/mockData';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center backdrop-blur-2xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[480px] rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-base text-neutral-900">Sobre o Vendedor</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <img
            src={STORE_DATA.avatar}
            alt="Unilever"
            className="w-12 h-12 rounded-full object-cover border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-neutral-900">{STORE_DATA.name}</h4>
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-neutral-500">Revendedor Oficial Credenciado</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
            <span className="block text-base font-extrabold text-neutral-900">4.9</span>
            <span className="text-[10px] text-neutral-500">Avaliação geral</span>
          </div>
          <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
            <span className="block text-base font-extrabold text-neutral-900">100%</span>
            <span className="text-[10px] text-neutral-500">Recomendações</span>
          </div>
          <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
            <span className="block text-base font-extrabold text-neutral-900">1.706</span>
            <span className="text-[10px] text-neutral-500">Produtos</span>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-xs text-neutral-600 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Garantia de Autenticidade Unilever</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Todos os produtos são enviados diretamente de centros de distribuição oficiais, com lote,
            data de fabricação recente e nota fiscal emitida.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 bg-neutral-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs transition-colors"
        >
          Entendi
        </button>
      </div>
    </div>
  );
};
