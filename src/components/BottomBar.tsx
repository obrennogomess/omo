import React from 'react';
import { Store, MessageCircle } from 'lucide-react';

interface BottomBarProps {
  onStoreClick: () => void;
  onChatClick: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onStoreClick,
  onChatClick,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 max-w-[480px] mx-auto bg-white border-t border-neutral-200 flex items-stretch shadow-lg">
      <button
        onClick={onStoreClick}
        className="flex-col flex items-center justify-center gap-0.5 px-3 py-2 text-[10px] text-neutral-700 hover:text-neutral-900 active:scale-95 transition-all"
      >
        <Store className="w-5 h-5" />
        <span>Loja</span>
      </button>

      <button
        onClick={onChatClick}
        className="flex-col flex items-center justify-center gap-0.5 px-3 py-2 text-[10px] text-neutral-700 hover:text-neutral-900 active:scale-95 transition-all"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Chat</span>
      </button>

      <button
        onClick={onAddToCart}
        className="flex-1 m-2 rounded-l-full bg-amber-100 text-amber-800 font-bold text-xs leading-tight active:scale-98 transition-all hover:bg-amber-200 py-2.5 flex flex-col justify-center items-center"
      >
        <div>Adicionar</div>
        <div className="font-semibold text-[11px]">ao carrinho</div>
      </button>

      <button
        onClick={onBuyNow}
        className="flex-[1.4] m-2 ml-0 rounded-r-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm leading-tight py-2.5 shadow-sm active:scale-98 transition-all hover:brightness-105 flex flex-col justify-center items-center"
      >
        <div>Comprar agora</div>
        <div className="text-[11px] font-normal opacity-90">Sem juros</div>
      </button>
    </div>
  );
};
