import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    setSelectedProductForDetail,
    setSelectedProductForQuickView 
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState(product.sizes[0]);

  const isFavorited = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const handleCardClick = () => {
    setSelectedProductForDetail(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedQuickSize);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProductForQuickView(product);
  };

  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-white border border-[#E8E2D6] overflow-hidden hover:border-[#C27E6E] hover:shadow-md transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#F8F5F0]">
        {/* Main & Secondary Hover Image */}
        <img
          src={isHovered ? secondaryImage : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-md bg-[#2D2D2D] text-[#FDFCF9] text-[9px] font-bold tracking-[0.15em] uppercase shadow-2xs">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-md bg-[#C27E6E] text-white text-[9px] font-bold tracking-[0.15em] uppercase shadow-2xs">
              BESTSELLER
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 rounded-md bg-[#F8F5F0] text-[#2D2D2D] text-[10px] font-bold tracking-tight shadow-2xs border border-[#E8E2D6]">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20 ${
            isFavorited
              ? 'bg-[#C27E6E] text-white shadow-xs'
              : 'bg-[#FDFCF9]/90 backdrop-blur-xs text-[#2D2D2D] hover:text-[#C27E6E] hover:bg-white shadow-xs border border-[#E8E2D6]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button (Center Overlay on Desktop Hover) */}
        <div className="hidden lg:flex absolute inset-x-4 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickViewClick}
            className="w-full py-2.5 bg-[#FDFCF9]/95 backdrop-blur-md text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] text-xs font-semibold uppercase tracking-[0.15em] rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 border border-[#E8E2D6]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
        <div className="space-y-1">
          {/* Category & Fabric Tag */}
          <div className="flex items-center justify-between text-[11px] text-[#8C8680]">
            <span className="uppercase tracking-widest font-semibold text-[10px] text-[#C27E6E]">{product.category}</span>
            <span className="text-[10px] truncate max-w-[110px] text-[#8C8680]">{product.fabric.split(' ')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-semibold text-xs sm:text-sm text-[#2D2D2D] group-hover:text-[#C27E6E] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Pricing */}
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

        {/* Available Sizes preview pills */}
        <div className="flex flex-wrap items-center gap-1 pt-1">
          {product.sizes.slice(0, 4).map((size) => (
            <span
              key={size}
              className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[#F8F5F0] border border-[#E8E2D6] text-[#666666] font-medium"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-[9px] text-[#8C8680]">+{product.sizes.length - 4}</span>
          )}
        </div>

        {/* Action Button: Add to Cart */}
        <div className="pt-2">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-3 bg-[#F8F5F0] hover:bg-[#2D2D2D] text-[#2D2D2D] hover:text-[#FDFCF9] border border-[#E8E2D6] hover:border-[#2D2D2D] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C27E6E]" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
