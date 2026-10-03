import { FAQItem, OfferItem, ProductReview, ShippingOption } from '../types';

export const PRODUCT_IMAGES = [
  'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/e0a014af-6b92-4a2a-9eb3-11637c1a9b92.png',
  'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/1e24c8d2-2991-43ea-9cf1-4bacca5c0e63.png',
  'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/81e04dc0-92be-49c2-b43e-ebcd1e02a3d4.png',
];

export const OFFERS: OfferItem[] = [
  {
    id: 'kit-1',
    title: '1 Kit Lava Roupas 7L',
    subtitle: 'OMO Pro + Comfort Pro',
    price: 49.92,
    originalPrice: 233.78,
    image: PRODUCT_IMAGES[0],
    qty: 1,
    checkoutUrl:
      'https://checkoutseguro.info/checkout/cmuply6ac0a3201pmfm7q2w2b?offer=e6253e72',
  },
  {
    id: 'kit-2',
    title: '2 Kits Lava Roupas 7L',
    subtitle: '2x OMO Pro 7L + 2x Comfort Pro 7L (28L Total)',
    price: 71.96,
    originalPrice: 466.9,
    savings: 394.94,
    featured: true,
    image: PRODUCT_IMAGES[0],
    qty: 2,
    checkoutUrl:
      'https://checkoutseguro.info/checkout/cmuply9i52rqt01px1q96xj3l?offer=bff82723',
  },
];

export const UPSELL_ITEM = {
  title: 'Comfort Concentrado 500ml',
  desc: 'Amaciante extra para deixar suas roupas ainda mais macias e perfumadas.',
  price: 19.9,
  originalPrice: 76.9,
  image: PRODUCT_IMAGES[0],
};

export const REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    name: 'C**a F**s',
    avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/f78e8009-a414-4be9-881f-1e66595e46a3.png',
    rating: 5,
    timeAgo: 'Há 23 minutos',
    comment: 'ainda não utilizei, mas me parece bom. veio bem embalado',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/3baba9db-7aa1-4ef0-9f8b-d8cb8cdc68f0.png',
    badge: '+3',
  },
  {
    id: 'rev-2',
    name: 'G**r P**a',
    avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/45df5bb0-6a80-47b9-b51a-9460a169b7fe.png',
    rating: 5,
    timeAgo: 'Há 30 minutos',
    comment: 'Sabão é muito bom ja vou começar a usar agora só estava esperando chegar',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/d3158fa8-91d4-4ac6-b083-e33401cdcc88.png',
  },
  {
    id: 'rev-3',
    name: 'M**u S**a',
    avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/f976ffa6-0803-4af5-8d77-72c622bef8e6.png',
    rating: 5,
    timeAgo: 'Há 37 minutos',
    comment: 'ótimo chegou no praso',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/2e38fdda-c12c-490c-a823-655ee919eab8.png',
  },
  {
    id: 'rev-4',
    name: 'J**o L**s',
    avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/1cdcf193-0cb5-4b8c-b852-c48832531548.png',
    rating: 5,
    timeAgo: 'Há 44 minutos',
    comment: 'produto é ótimo, qualidade OMO. Veio bem embalado e Lacrado.',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/b4fd194d-f805-4a61-b9ed-a7b934e70dfc.png',
  },
  {
    id: 'rev-5',
    name: 'R**o F**a',
    avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/6a700587-461a-41fb-bb16-fcc280fc041b.png',
    rating: 5,
    timeAgo: 'Há 51 minutos',
    comment: 'Chegou bem embalado, agora é só usar, sem nenhum vazamento',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/13a6a5bb-4dca-4205-9fce-5d779c2fd5ff.png',
  },
  {
    id: 'rev-6',
    name: 'A**a C**o',
    avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/ee067afc-45ba-4758-a4dd-7781a1bf7965.png',
    rating: 5,
    timeAgo: 'Há 58 minutos',
    comment: 'Veio bem embalado, chegou antes do prazo.',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/79228967-7b31-4a04-9318-f2f0fab4000b.png',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: '1. O que acompanha o kit?',
    answer:
      'O kit acompanha 1 galão de 7 Litros do Sabão Líquido OMO Pro Lavanderia Profissional e 1 galão de 7 Litros do Amaciante Concentrado Comfort Pro Lavanderia Profissional, totalizando 14 Litros de produto original Unilever.',
  },
  {
    id: 2,
    question: '2. O OMO 7L pode ser usado em roupas brancas e coloridas?',
    answer:
      'Sim! Sua tecnologia nano-enzimática com pH neutro (7.0 - 8.0) é indicada tanto para roupas brancas quanto coloridas, eliminando manchas difíceis sem desbotar e sem danificar as fibras.',
  },
  {
    id: 3,
    question: '3. O amaciante Comfort 7L deixa as roupas mais macias e perfumadas?',
    answer:
      'Sim! O Comfort Pro é super concentrado, com ativos biodegradáveis que penetram profundamente nas fibras dos tecidos, garantindo maciez duradoura e um perfume agradável que resiste por muitos dias.',
  },
  {
    id: 4,
    question: '4. O kit pode ser utilizado em máquinas de lavar domésticas?',
    answer:
      'Com certeza! Embora tenha padrão e formulação de lavanderia profissional, o kit é 100% compatível e recomendado para uso em máquinas automáticas domésticas (abertura superior e frontal) e tanquinhos.',
  },
];

export const SHIPPING_OPTIONS: Record<string, ShippingOption> = {
  pac: {
    id: 'pac',
    label: 'PAC',
    eta: '7 a 12 dias úteis',
    price: 0,
  },
  sedex: {
    id: 'sedex',
    label: 'SEDEX',
    eta: '3 a 5 dias úteis',
    price: 14.9,
  },
  expresso: {
    id: 'expresso',
    label: 'Expresso',
    eta: '1 a 2 dias úteis',
    price: 24.9,
  },
};

export const STORE_DATA = {
  name: 'Unilever Professional',
  avatar: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/d0ee3302-d061-4017-9a36-0347fdc7b8da.png',
  logo: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/fc33213d-0fca-471a-8338-82cb8c2d9f1f.png',
  badge: 'Loja Verificada',
  productsCount: '1706 produtos',
  recommendRate: '100% recomenda',
  trust: '100%',
};

export const MEDIA_CARDS = [
  {
    id: 'm1',
    title: 'Omo + Comfort',
    subtitle: 'Promoção...',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/1e24c8d2-2991-43ea-9cf1-4bacca5c0e63.png',
  },
  {
    id: 'm2',
    title: 'Kit Lavanderia',
    subtitle: 'Unboxing...',
    image: 'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/81e04dc0-92be-49c2-b43e-ebcd1e02a3d4.png',
  },
];
