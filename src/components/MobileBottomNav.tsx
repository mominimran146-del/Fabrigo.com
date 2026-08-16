import React from 'react';
import { Home, Compass, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    scrollToShopWithCategory 
  } = useShop();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 bg-[#FDFCF9]/95 backdrop-blur-md border-t border-[#E8E2D6] z-40 px-3 py-2 flex items-center justify-around shadow-lg"
    >
      {/* Home */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-center gap-0.5 text-[#666666] hover:text-[#C27E6E] text-[10px] font-medium cursor-pointer"
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* Shop */}
      <button
        onClick={() => scrollTo('shop-section')}
        className="flex flex-col items-center gap-0.5 text-[#666666] hover:text-[#C27E6E] text-[10px] font-medium cursor-pointer"
      >
        <Sparkles className="w-5 h-5" />
        <span>Shop</span>
      </button>

      {/* Style Finder */}
      <button
        onClick={() => scrollTo('style-finder-section')}
        className="flex flex-col items-center gap-0.5 text-[#666666] hover:text-[#C27E6E] text-[10px] font-medium cursor-pointer"
      >
        <Compass className="w-5 h-5 text-[#C27E6E]" />
        <span className="text-[#C27E6E] font-semibold">Style Match</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[#666666] hover:text-[#C27E6E] text-[10px] font-medium relative cursor-pointer"
      >
        <div className="relative">
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#C27E6E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </button>

      {/* Bag */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-0.5 text-[#2D2D2D] hover:text-[#C27E6E] text-[10px] font-bold relative cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-[#2D2D2D]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#C27E6E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>
    </nav>
  );
};
