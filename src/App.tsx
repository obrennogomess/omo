import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCarousel } from './components/ProductCarousel';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { TechSpecs } from './components/TechSpecs';
import { BottomBar } from './components/BottomBar';
import { OfferModal } from './components/OfferModal';
import { ChatModal } from './components/ChatModal';
import { MediaModal } from './components/MediaModal';
import { StoreModal } from './components/StoreModal';
import { CheckoutPage } from './components/CheckoutPage';
import { TrackingPage } from './components/TrackingPage';

export default function App() {
  // Page route state: 'home' | 'checkout' | 'rastreamento'
  const [currentRoute, setCurrentRoute] = useState<'home' | 'checkout' | 'rastreamento'>('home');
  const [selectedOfferId, setSelectedOfferId] = useState<string>('kit-1');
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [orderData, setOrderData] = useState<any>(null);

  // Cart & UI State
  const [cartCount, setCartCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('tiktok_cart_count');
      return stored ? parseInt(stored, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('visao-geral');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<{ title: string; image: string } | null>(null);

  // Check URL on mount and handle back/forward navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const offerParam = params.get('offer');

      if (path.includes('checkout')) {
        setCurrentRoute('checkout');
        if (offerParam === '2') {
          setSelectedOfferId('kit-2');
        } else {
          setSelectedOfferId('kit-1');
        }
      } else if (path.includes('rastreamento')) {
        setCurrentRoute('rastreamento');
        const codeParam = params.get('codigo') || params.get('tr_codigo');
        if (codeParam) setTrackingCode(codeParam);
      } else {
        setCurrentRoute('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Sync cart count
  useEffect(() => {
    try {
      localStorage.setItem('tiktok_cart_count', cartCount.toString());
    } catch {
      // ignore
    }
  }, [cartCount]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    showToast('Produtos adicionados ao carrinho');
  };

  const handleBuyNow = () => {
    setIsOfferModalOpen(true);
  };

  const handleSelectOffer = (offerId: string) => {
    setIsOfferModalOpen(false);
    setSelectedOfferId(offerId);
    // Navigate to checkout
    const newUrl = `/checkout?offer=${offerId === 'kit-2' ? '2' : '1'}`;
    window.history.pushState({}, '', newUrl);
    setCurrentRoute('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTracking = (code: string, data: any) => {
    setTrackingCode(code);
    setOrderData(data);
    const newUrl = `/rastreamento?codigo=${code}`;
    window.history.pushState({}, '', newUrl);
    setCurrentRoute('rastreamento');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'visao-geral') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    showToast(isBookmarked ? 'Item removido dos favoritos' : 'Item adicionado aos favoritos!');
  };

  // If on checkout page
  if (currentRoute === 'checkout') {
    return (
      <CheckoutPage
        initialOfferId={selectedOfferId}
        onBackToStore={handleBackToStore}
        onNavigateToTracking={handleNavigateToTracking}
      />
    );
  }

  // If on tracking page
  if (currentRoute === 'rastreamento') {
    return (
      <TrackingPage
        initialCode={trackingCode}
        orderData={orderData}
        onBackToStore={handleBackToStore}
      />
    );
  }

  // Main Product Landing Page (promodaomojunho.com)
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center selection:bg-rose-500 selection:text-white">
      {/* 480px Mobile Layout Container */}
      <div className="w-full max-w-[480px] min-h-screen bg-neutral-50 text-neutral-900 pb-24 shadow-2xl relative font-sans">
        {/* Sticky TikTok Header */}
        <Header
          cartCount={cartCount}
          onOpenCart={() => setIsOfferModalOpen(true)}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
        />

        {/* Product Image Carousel */}
        <ProductCarousel
          onImageClick={() =>
            setActiveMedia({
              title: 'Kit Lava Roupas Líquido 7L (OMO + Comfort)',
              image:
                'https://qtbkvshbmqlszncxlcuc.supabase.co/storage/v1/object/public/dsl-uploads/Ftb2SzxWNZVOsw3cmP7MYoHCMDs2/e0a014af-6b92-4a2a-9eb3-11637c1a9b92.png',
            })
          }
        />

        {/* Flash Sale Banner & Pricing */}
        <FlashSaleBanner
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />

        {/* Video previews, Customer reviews & Store profile */}
        <ReviewsSection
          onOpenMedia={(media) => setActiveMedia(media)}
          onOpenStoreModal={() => setIsStoreModalOpen(true)}
        />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Product Technical Specifications */}
        <TechSpecs />

        {/* Fixed Bottom Action Bar */}
        <BottomBar
          onStoreClick={() => setIsStoreModalOpen(true)}
          onChatClick={() => setIsChatModalOpen(true)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] bg-neutral-900/95 text-white text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Offer Bottom Sheet Modal */}
        <OfferModal
          isOpen={isOfferModalOpen}
          onClose={() => setIsOfferModalOpen(false)}
          onSelectOffer={handleSelectOffer}
        />

        {/* Live Support Chat Modal */}
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
        />

        {/* Verified Store Details Modal */}
        <StoreModal
          isOpen={isStoreModalOpen}
          onClose={() => setIsStoreModalOpen(false)}
        />

        {/* Media / Video Preview Lightbox */}
        <MediaModal
          isOpen={Boolean(activeMedia)}
          onClose={() => setActiveMedia(null)}
          media={activeMedia}
        />
      </div>
    </div>
  );
}
