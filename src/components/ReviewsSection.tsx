import React, { useState } from 'react';
import {
  Play,
  Star,
  Info,
  ChevronRight,
  Check,
  BadgeCheck,
} from 'lucide-react';
import { MEDIA_CARDS, REVIEWS, STORE_DATA } from '../data/mockData';

interface ReviewsSectionProps {
  onOpenMedia?: (media: { title: string; image: string }) => void;
  onOpenStoreModal?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenMedia,
  onOpenStoreModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'images' | '5star' | '4star'>('images');
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const displayedReviews = showAllReviews ? REVIEWS : REVIEWS.slice(0, 4);

  return (
    <div id="avaliacoes" className="bg-white pt-2">
      {/* Media / Video Cards */}
      <div className="px-3 mt-5 grid grid-cols-2 gap-3">
        {MEDIA_CARDS.map((media) => (
          <div
            key={media.id}
            onClick={() => onOpenMedia?.(media)}
            className="group relative rounded-lg overflow-hidden bg-neutral-100 aspect-square cursor-pointer shadow-xs active:scale-98 transition-transform"
          >
            <img
              src={media.image}
              alt={media.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white">
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
              <div className="text-xs font-bold leading-tight">{media.title}</div>
              <div className="text-[10px] opacity-80 leading-tight">{media.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Header */}
      <div className="px-3 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>4.8 Avaliações dos clientes (6...)</span>
          <Info className="w-3.5 h-3.5 text-neutral-400" />
        </div>
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="text-xs text-rose-600 font-semibold flex items-center gap-0.5 hover:underline"
        >
          {showAllReviews ? 'Ver menos' : 'Ver mais'}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Customer Reviews List */}
      <div className="px-3 mt-3 divide-y divide-neutral-100">
        {displayedReviews.map((rev) => (
          <div key={rev.id} className="py-3 flex gap-3">
            <img
              src={rev.avatar}
              alt={rev.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-neutral-200"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold leading-tight text-neutral-900">
                {rev.name}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="flex">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
                <span className="text-[11px] text-neutral-500">· {rev.timeAgo}</span>
              </div>
              <p className="text-sm text-neutral-800 mt-1.5 leading-snug">
                {rev.comment}
              </p>
            </div>

            {rev.image && (
              <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-neutral-100 border border-neutral-200 cursor-pointer">
                <img
                  src={rev.image}
                  alt="review photo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {rev.badge && (
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded font-bold">
                    {rev.badge}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Store Reviews Header & Filter Chips */}
      <div className="px-3 mt-4 flex items-center justify-between">
        <div className="text-sm font-bold text-neutral-900">Avaliações da loja (971)</div>
        <ChevronRight className="w-4 h-4 text-neutral-400" />
      </div>

      <div className="px-3 mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedFilter('images')}
          className={`text-xs font-semibold rounded-full px-2.5 py-1 whitespace-nowrap flex items-center gap-1 transition-all ${
            selectedFilter === 'images'
              ? 'text-rose-600 bg-rose-50 border border-rose-200'
              : 'text-neutral-700 bg-neutral-100'
          }`}
        >
          <Check className="w-3 h-3" /> Inclui imagens ou vídeos (121)
        </button>

        <button
          onClick={() => setSelectedFilter('5star')}
          className={`text-xs font-semibold rounded-full px-2.5 py-1 whitespace-nowrap transition-all ${
            selectedFilter === '5star'
              ? 'text-rose-600 bg-rose-50 border border-rose-200'
              : 'text-neutral-700 bg-neutral-100'
          }`}
        >
          ⭐ 5 (868)
        </button>

        <button
          onClick={() => setSelectedFilter('4star')}
          className={`text-xs font-semibold rounded-full px-2.5 py-1 whitespace-nowrap transition-all ${
            selectedFilter === '4star'
              ? 'text-rose-600 bg-rose-50 border border-rose-200'
              : 'text-neutral-700 bg-neutral-100'
          }`}
        >
          ⭐ 4 (50)
        </button>
      </div>

      {/* Store Box */}
      <div
        onClick={onOpenStoreModal}
        className="mx-3 mt-4 border border-neutral-200 rounded-lg p-3 cursor-pointer hover:border-neutral-300 transition-colors bg-white shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <img
            src={STORE_DATA.avatar}
            alt="Unilever"
            className="w-10 h-10 rounded-full object-cover border border-neutral-200"
          />
          <img
            src={STORE_DATA.logo}
            alt="Unilever logo"
            className="w-7 h-7 object-contain"
          />
          <div className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
            {STORE_DATA.badge}
          </div>
        </div>

        <div className="mt-2 text-xs text-neutral-700 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {STORE_DATA.productsCount} • {STORE_DATA.recommendRate}
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-600">Confiança:</span>
            <span className="font-bold text-neutral-900">{STORE_DATA.trust}</span>
          </div>
          <div className="mt-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* Sobre o Produto: Section */}
      <div id="descricao" className="px-3 mt-6">
        <h2 className="text-sm font-bold text-neutral-900">Sobre o Produto:</h2>
        <div
          className={`mt-2 text-sm text-neutral-700 leading-relaxed space-y-2 relative transition-all duration-300 ${
            showFullAbout ? 'max-h-none' : 'max-h-32 overflow-hidden'
          }`}
        >
          <p>
            O Lava Roupas Liquido Profissional Omo Pro 7L é um sabão líquido desenvolvido para
            lavanderias profissionais e para quem busca alto rendimento na lavagem de roupas.
            Sua fórmula concentrada ajuda a remover manchas difíceis já na primeira lavagem,
            preservando as cores e as fibras dos tecidos. Além disso, possui pH neutro, podendo
            ser utilizado tanto em roupas delicadas quanto em peças mais pesadas, com rendimento
            que pode chegar a centenas de quilos de roupas lavadas.
          </p>
          <p>
            O Amaciante Comfort Lavanderia Profissional 7L foi desenvolvido para proporcionar
            maciez intensa e perfume prolongado às roupas. Sua fórmula profissional conta com
            ingredientes biodegradáveis que penetram nas fibras dos tecidos, ajudando a manter as
            peças mais suaves, perfumadas e com aparência de novas por mais tempo. O galão de 7
            litros oferece excelente rendimento, sendo indicado tanto para uso doméstico quanto
            profissional.
          </p>

          {!showFullAbout && (
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <button
          onClick={() => setShowFullAbout(!showFullAbout)}
          className="mt-2 text-rose-600 text-sm font-semibold hover:underline"
        >
          {showFullAbout ? 'Ver menos' : 'Ver mais'}
        </button>
      </div>
    </div>
  );
};
