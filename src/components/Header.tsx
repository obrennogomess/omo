import React, { useState } from 'react';
import { ChevronLeft, Search, Share2, ShoppingCart, Ellipsis, Check, Copy, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeTab,
  onSelectTab,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'visao-geral', label: 'Visão geral' },
    { id: 'avaliacoes', label: 'Avaliações' },
    { id: 'descricao', label: 'Descrição' },
    { id: 'recomendacoes', label: 'Recomendações' },
    { id: 'duvida', label: 'Dúvida' },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kit Lava Roupas Líquido 7L - Oferta Relâmpago',
          text: 'Olha essa promoção do Kit OMO + Comfort 14L com 78% de desconto!',
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to modal if canceled or unsupported
      }
    }
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-xs">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button
            aria-label="Voltar"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-1.5 -ml-1.5 text-neutral-800 hover:text-neutral-950 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-full bg-neutral-100 pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-all focus:bg-neutral-50 focus:ring-1 focus:ring-neutral-300"
            />
          </div>

          <button
            aria-label="Compartilhar"
            onClick={handleShare}
            className="p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            aria-label="Carrinho"
            onClick={onOpenCart}
            className="relative p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="cart-badge absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-50 duration-200">
                {cartCount}
              </span>
            )}
          </button>

          <button
            aria-label="Menu"
            onClick={() => alert('TikTok Shop Brasil Oficial')}
            className="p-1.5 -mr-1 text-neutral-700 hover:text-neutral-950 transition-colors"
          >
            <Ellipsis className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex items-center gap-5 px-4 text-sm overflow-x-auto border-b border-neutral-200 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`whitespace-nowrap py-2.5 -mb-px border-b-2 transition-colors font-medium ${
                  isActive
                    ? 'border-neutral-900 text-neutral-900 font-semibold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">Compartilhar Oferta</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-neutral-600">
              Copie o link desta oferta relâmpago para compartilhar com seus amigos e família:
            </p>
            <div className="flex items-center gap-2 p-2 bg-neutral-50 border border-neutral-200 rounded-lg">
              <input
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="flex-1 bg-transparent text-xs text-neutral-700 outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
