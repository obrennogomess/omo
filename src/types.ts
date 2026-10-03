export interface ProductReview {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  comment: string;
  image?: string;
  badge?: string;
}

export interface OfferItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice: number;
  savings?: number;
  featured?: boolean;
  image: string;
  qty: number;
  checkoutUrl: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface ShippingOption {
  id: 'pac' | 'sedex' | 'expresso';
  label: string;
  eta: string;
  price: number;
}
