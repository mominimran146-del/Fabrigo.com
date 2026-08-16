import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Ruler } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { ProductSize } from '../types';
import { buildWhatsAppLink, generateSingleProductOrderMessage } from '../utils/whatsapp';

export const QuickViewModal: React.FC = () => {
  const { 
    selectedProductForQuickView, 
    setSelectedProductForQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductForDetail,
    setIsSizeGuideOpen
  } = useShop();

  const product = selectedProductForQuickView;
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product ? product.sizes[0] : 'S');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleOpenFull = () => {
    setSelectedProductForQuickView(null);
    setSelectedProductForDetail(product);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, product.colors[0], quantity);
  };

  const handleWhatsApp = () => {
    const msg = generateSingleProductOrderMessage(product, selectedSize, product.colors[0] || '', quantity);
    window.open(buildWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={() => setSelectedProductForQuickView(null)}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-[#FDFCF9] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E2D6] z-10 animate-fade-in my-8">
          
          <button
            onClick={() => setSelectedProductForQuickView(null)}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#FDFCF9]/90 border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 sm:p-6">
            {/* Image */}
            <div className="aspect-3/4 rounded-2xl overflow-hidden bg-[#F8F5F0] border border-[#E8E2D6]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C27E6E]">
                  {product.category}
                </span>

                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2D2D2D] leading-snug">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-lg text-[#2D2D2D]">
                    {storeConfig.currency}{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#8C8680] line-through">
                      {storeConfig.currency}{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-[10px] font-bold text-[#C27E6E] bg-[#F8F5F0] border border-[#E8E2D6] px-1.5 py-0.5 rounded-sm">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#666666] line-clamp-2">
                  {product.description}
                </p>

                {/* Size */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2D2D2D]">Size:</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[11px] text-[#C27E6E] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-2.5 py-1 text-xs rounded-md border font-medium cursor-pointer transition-colors ${
                          selectedSize === s
                            ? 'bg-[#C27E6E] text-white border-[#C27E6E]'
                            : 'bg-[#F8F5F0] text-[#2D2D2D] border-[#E8E2D6] hover:border-[#C27E6E]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric note */}
                <div className="text-[11px] text-[#666666] bg-[#F8F5F0] border border-[#E8E2D6] p-2 rounded-lg">
                  <strong className="text-[#2D2D2D]">Fabric:</strong> {product.fabric}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 bg-[#2D2D2D] hover:bg-[#C27E6E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWhatsApp}
                    className="py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleOpenFull}
                    className="py-2 bg-[#FDFCF9] hover:bg-[#F8F5F0] border border-[#E8E2D6] text-[#2D2D2D] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
