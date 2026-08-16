import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const BestSellers: React.FC = () => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    setSelectedProductForDetail 
  } = useShop();

  const bestSellerList = products.filter((p) => p.isBestSeller);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 4; // for desktop viewport calculations

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, bestSellerList.length - visibleCount) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount >= bestSellerList.length ? 0 : prev + 1));
  };

  return (
    <section id="best-sellers-section" className="py-14 sm:py-20 bg-[#F8F5F0] border-t border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C27E6E]">
              Boutique Favorites
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
              Loved by Our Customers
            </h2>
            <p className="text-xs sm:text-sm text-[#666666]">
              Our most-requested pieces celebrated for their luxurious drape, tailored fits, and all-day comfort.
            </p>
          </div>

          {/* Carousel Arrows (Desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous best sellers"
              className="w-9 h-9 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next best sellers"
              className="w-9 h-9 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Best Sellers Grid / Carousel list */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellerList.map((product) => {
            const isFav = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForDetail(product)}
                className="group relative flex flex-col rounded-2xl bg-white border border-[#E8E2D6] overflow-hidden hover:border-[#C27E6E] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F8F5F0]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Best Seller Ribbon */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#C27E6E] text-white text-[9px] font-bold tracking-[0.15em] uppercase shadow-2xs">
                      BESTSELLER
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 ${
                      isFav
                        ? 'bg-[#C27E6E] text-white shadow-xs'
                        : 'bg-[#FDFCF9]/90 backdrop-blur-xs text-[#2D2D2D] hover:text-[#C27E6E] hover:bg-white shadow-xs border border-[#E8E2D6]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Info Card */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
                  <div className="space-y-1">
                    {/* Rating and Sample Count */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#7A7571]">
                      <div className="flex items-center text-[#C27E6E]">
                        <Star className="w-3.5 h-3.5 fill-[#C27E6E] stroke-[#C27E6E]" />
                        <span className="font-semibold text-xs text-[#2D2D2D] ml-1">{product.rating}</span>
                      </div>
                      <span>•</span>
                      <span className="text-[10px] text-[#8C8680]">({product.reviewCount} boutique reviews)</span>
                    </div>

                    <h3 className="font-serif font-semibold text-xs sm:text-sm text-[#2D2D2D] group-hover:text-[#C27E6E] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="font-bold text-sm sm:text-base text-[#2D2D2D]">
                        {storeConfig.currency}{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#8C8680] line-through">
                          {storeConfig.currency}{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Bag Button */}
                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full py-2.5 px-3 bg-[#F8F5F0] hover:bg-[#2D2D2D] text-[#2D2D2D] hover:text-[#FDFCF9] border border-[#E8E2D6] hover:border-[#2D2D2D] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C27E6E]" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
