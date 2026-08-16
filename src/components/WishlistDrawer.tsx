import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    wishlistCount, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    moveToCartFromWishlist,
    setSelectedProductForDetail 
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FDFCF9] shadow-2xl flex flex-col z-10 border-l border-[#E8E2D6] animate-fade-in">
        
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E8E2D6] bg-[#F8F5F0]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C27E6E] fill-[#C27E6E]" />
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#2D2D2D]">
              Saved Pieces ({wishlistCount})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="w-8 h-8 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist items / Empty state */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3.5 border border-[#E8E2D6] shadow-2xs flex gap-3.5 items-start"
              >
                {/* Product Image */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedProductForDetail(item.product);
                  }}
                  className="w-20 h-24 object-cover rounded-xl bg-[#F8F5F0] shrink-0 cursor-pointer"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-24">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setSelectedProductForDetail(item.product);
                        }}
                        className="font-serif font-semibold text-xs sm:text-sm text-[#2D2D2D] hover:text-[#C27E6E] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => toggleWishlist(item.product)}
                        aria-label="Remove from wishlist"
                        className="text-[#8C8680] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="font-bold text-xs sm:text-sm text-[#2D2D2D]">
                        {storeConfig.currency}{item.product.price.toLocaleString('en-IN')}
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-xs text-[#8C8680] line-through">
                          {storeConfig.currency}{item.product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Bag Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => moveToCartFromWishlist(item.product)}
                      className="w-full py-1.5 px-3 bg-[#2D2D2D] hover:bg-[#C27E6E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E]">
                <Heart className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-serif text-base font-semibold text-[#2D2D2D]">
                  Your wishlist is currently empty.
                </h3>
                <p className="text-xs text-[#666666]">
                  Click the heart icon on any outfit to save your favorite styles for later.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#C27E6E] transition-colors cursor-pointer"
              >
                Discover Styles
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
