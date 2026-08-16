import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle, Sparkles, ChevronRight } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    scrollToShopWithCategory
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'New Arrivals', action: () => scrollToSection('new-arrivals-section') },
    { label: 'Collections', action: () => scrollToSection('categories-section') },
    { label: 'Trending', action: () => scrollToSection('shop-section') },
    { label: 'Best Sellers', action: () => scrollToSection('best-sellers-section') },
    { label: 'Style Finder', action: () => scrollToSection('style-finder-section') },
    { label: 'About', action: () => scrollToSection('boutique-story-section') },
    { label: 'Contact', action: () => scrollToSection('contact-section') },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FDFCF9]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#E8E2D6]' 
          : 'bg-[#FDFCF9] py-4 sm:py-5 border-b border-[#E8E2D6]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile menu button & Search (Mobile Left) */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 text-[#2D2D2D] hover:text-[#C27E6E] transition-colors rounded-lg focus:outline-hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalog"
              className="p-2 text-[#2D2D2D] hover:text-[#C27E6E] transition-colors rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo (Left on desktop, centered/left on mobile) */}
          <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[#2D2D2D] uppercase">
                {storeConfig.brandName}
              </span>
            </div>
            <span className="hidden sm:block text-[9px] tracking-[0.3em] text-[#8C8680] uppercase -mt-0.5">
              Boutique Fashion
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-[12px] tracking-[0.15em] uppercase font-medium text-[#2D2D2D] hover:text-[#C27E6E] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C27E6E] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Desktop Search */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F5F0] hover:bg-[#F0ECE1] text-[#2D2D2D] text-xs transition-colors border border-[#E8E2D6] hover:border-[#C27E6E]"
            >
              <Search className="w-3.5 h-3.5 text-[#8C8680]" />
              <span className="text-[#8C8680]">Search styles...</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="p-2 text-[#2D2D2D] hover:text-[#C27E6E] transition-colors relative rounded-full hover:bg-[#F8F5F0]"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C27E6E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="flex items-center gap-1.5 p-2 sm:px-4 sm:py-2 bg-[#2D2D2D] text-[#FDFCF9] hover:bg-[#C27E6E] transition-all rounded-full shadow-xs text-xs font-medium tracking-wider uppercase"
            >
              <ShoppingBag className="w-4 h-4 text-[#E8E2D6]" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-[#C27E6E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FDFCF9] shadow-2xl flex flex-col z-10 border-r border-[#E8E2D6] animate-fade-in">
            {/* Drawer Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#E8E2D6] bg-[#F8F5F0]">
              <div>
                <span className="font-serif text-xl tracking-widest font-semibold text-[#2D2D2D]">
                  {storeConfig.brandName}
                </span>
                <p className="text-[10px] tracking-widest text-[#8C8680] uppercase">Boutique Collection</p>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 text-[#2D2D2D] hover:text-[#C27E6E] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <div className="flex-1 overflow-y-auto py-3 px-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#2D2D2D] hover:bg-[#F8F5F0] hover:text-[#C27E6E] transition-colors text-left"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#8C8680]" />
                </button>
              ))}

              <div className="pt-4 border-t border-[#E8E2D6] mt-4">
                <p className="text-[11px] font-semibold tracking-widest text-[#8C8680] uppercase px-3 mb-2">
                  Popular Categories
                </p>
                {['Kurtis', 'Dresses', 'Co-ord Sets', 'Ethnic Wear', 'Dress Materials'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      scrollToShopWithCategory(cat);
                    }}
                    className="w-full flex items-center justify-between py-2 px-3 text-xs text-[#555555] hover:text-[#C27E6E] hover:bg-[#F8F5F0] rounded-md transition-colors"
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Footer with direct WhatsApp help */}
            <div className="p-4 border-t border-[#E8E2D6] bg-[#F8F5F0] space-y-3">
              <a
                href={buildWhatsAppLink(generateGeneralHelpMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2D2D2D] hover:bg-[#C27E6E] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4 text-[#C27E6E]" />
                <span>Chat on WhatsApp</span>
              </a>

              <p className="text-center text-[11px] text-[#8C8680]">
                {storeConfig.tagline}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
