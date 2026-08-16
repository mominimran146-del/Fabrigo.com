import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CategorySection } from './components/CategorySection';
import { TrendingProducts } from './components/TrendingProducts';
import { NewArrivals } from './components/NewArrivals';
import { BestSellers } from './components/BestSellers';
import { BoutiqueStory } from './components/BoutiqueStory';
import { StyleFinder } from './components/StyleFinder';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramSection } from './components/InstagramSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals, Drawers & Overlays
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/Toast';
import { BackToTop } from './components/BackToTop';

function MainShop() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF9] text-[#2D2D2D] pb-16 md:pb-0">
      {/* 1. Announcement */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header />

      {/* Main Page Flow (Exact order from specifications) */}
      <main className="flex-1">
        {/* 3. Hero */}
        <Hero />

        {/* 4. Trust / USP Bar */}
        <TrustBar />

        {/* 5. Shop by Category */}
        <CategorySection />

        {/* 6. Trending Products (Interactive Catalog) */}
        <TrendingProducts />

        {/* 7. New Arrivals */}
        <NewArrivals />

        {/* 8. Best Sellers */}
        <BestSellers />

        {/* 9. Boutique Story */}
        <BoutiqueStory />

        {/* 10. Style Recommendation Mini Section */}
        <StyleFinder />

        {/* 11. Customer Reviews */}
        <CustomerReviews />

        {/* 12. Instagram Look */}
        <InstagramSection />

        {/* 13. FAQ */}
        <FAQSection />

        {/* 14. Contact / WhatsApp CTA */}
        <ContactSection />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* Floating & Overlay Elements */}
      <FloatingWhatsApp />
      <MobileBottomNav />
      <BackToTop />

      {/* Interactive Drawers & Modals */}
      <ProductDetailModal />
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SearchModal />
      <SizeGuideModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainShop />
    </ShopProvider>
  );
}
