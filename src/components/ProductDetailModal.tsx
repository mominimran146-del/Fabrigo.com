import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Ruler, Truck, ShieldCheck, RotateCcw, Sparkles, Check, ChevronRight } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { Product, ProductSize } from '../types';
import { buildWhatsAppLink, generateSingleProductOrderMessage, generateProductInquiryMessage } from '../utils/whatsapp';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen
  } = useShop();

  const product = selectedProductForDetail;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product ? product.sizes[0] : 'S');
  const [selectedColor, setSelectedColor] = useState<string>(product ? product.colors[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care' | 'delivery'>('details');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleDirectWhatsAppOrder = () => {
    const message = generateSingleProductOrderMessage(product, selectedSize, selectedColor, quantity);
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank');
  };

  const handleWhatsAppInquiry = () => {
    const message = generateProductInquiryMessage(product);
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setSelectedProductForDetail(null)}
      />

      {/* Modal Dialog */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
        <div className="relative bg-[#FDFCF9] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E8E2D6] z-10 animate-fade-in my-8">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedProductForDetail(null)}
            aria-label="Close product details"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FDFCF9]/90 backdrop-blur-xs border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Left: Gallery (5 cols) */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Image with Zoom Preview */}
              <div 
                className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#F8F5F0] border border-[#E8E2D6] cursor-crosshair group"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-200 ${
                    isZoomed ? 'scale-150 origin-center' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                        }
                      : undefined
                  }
                />

                {/* Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  {product.isNew && (
                    <span className="px-2.5 py-1 rounded-md bg-[#2D2D2D] text-white text-[10px] font-bold tracking-wider uppercase">
                      NEW ARRIVAL
                    </span>
                  )}
                  {product.discount && (
                    <span className="px-2.5 py-1 rounded-md bg-[#C27E6E] text-white text-[10px] font-bold tracking-wider uppercase">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="hidden lg:block absolute bottom-2 right-2 text-[10px] text-white/80 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-md">
                  Hover to zoom
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#C27E6E] shadow-xs'
                          : 'border-[#E8E2D6] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details (7 cols) */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              
              <div className="space-y-4">
                {/* Category & ID */}
                <div className="flex items-center justify-between text-xs text-[#8C8680]">
                  <span className="uppercase tracking-[0.2em] font-medium text-[#C27E6E]">
                    {product.category}
                  </span>
                  <span>SKU: {product.id}</span>
                </div>

                {/* Name */}
                <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#2D2D2D] leading-snug">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pb-3 border-b border-[#E8E2D6]">
                  <span className="font-bold text-xl sm:text-2xl text-[#2D2D2D]">
                    {storeConfig.currency}{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#8C8680] line-through">
                      {storeConfig.currency}{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs font-semibold text-[#C27E6E] bg-[#F8F5F0] px-2 py-0.5 rounded-md border border-[#E8E2D6]">
                      Save {storeConfig.currency}{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#2D2D2D]">
                      Color: <span className="font-normal text-[#666666]">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            selectedColor === color
                              ? 'bg-[#2D2D2D] text-[#FDFCF9] border-[#2D2D2D]'
                              : 'bg-[#F8F5F0] text-[#2D2D2D] border-[#E8E2D6] hover:border-[#C27E6E]'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector + Size Guide */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-[#2D2D2D]">
                      Size: <span className="font-normal text-[#666666]">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#C27E6E] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#C27E6E] text-white border-[#C27E6E]'
                            : 'bg-[#F8F5F0] text-[#2D2D2D] border-[#E8E2D6] hover:border-[#C27E6E]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-1">
                  <label className="text-xs font-semibold text-[#2D2D2D]">Quantity:</label>
                  <div className="flex items-center border border-[#E8E2D6] bg-[#F8F5F0] rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-sm font-semibold hover:bg-[#E8E2D6] text-[#2D2D2D] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-[#2D2D2D]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1 text-sm font-semibold hover:bg-[#E8E2D6] text-[#2D2D2D] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 px-4 bg-[#2D2D2D] hover:bg-[#C27E6E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#FDFCF9]" />
                      <span>Add to Bag</span>
                    </button>

                    {/* Order via WhatsApp */}
                    <button
                      onClick={handleDirectWhatsAppOrder}
                      className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isFavorited
                          ? 'bg-[#F8F5F0] border-[#C27E6E] text-[#C27E6E]'
                          : 'bg-[#FDFCF9] border-[#E8E2D6] text-[#2D2D2D] hover:bg-[#F8F5F0]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#C27E6E] text-[#C27E6E]' : ''}`} />
                      <span>{isFavorited ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </button>

                    {/* Chat with Fabrigo */}
                    <button
                      onClick={handleWhatsAppInquiry}
                      className="flex-1 py-2 px-3 bg-[#FDFCF9] hover:bg-[#F8F5F0] border border-[#E8E2D6] text-[#2D2D2D] rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat with Stylist</span>
                    </button>
                  </div>
                </div>

                {/* Product Info Tabs */}
                <div className="pt-4 border-t border-[#E8E2D6] space-y-3">
                  <div className="flex border-b border-[#E8E2D6] text-xs">
                    {(['details', 'fabric', 'care', 'delivery'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-3 font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px capitalize cursor-pointer ${
                          activeTab === tab
                            ? 'border-[#C27E6E] text-[#C27E6E]'
                            : 'border-transparent text-[#8C8680] hover:text-[#2D2D2D]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-[#666666] space-y-2">
                    {activeTab === 'details' && (
                      <div className="space-y-1.5">
                        <p>• <strong className="text-[#2D2D2D]">Fit:</strong> {product.fit || 'Regular Comfortable Fit'}</p>
                        <p>• <strong className="text-[#2D2D2D]">Occasion:</strong> {product.occasion?.join(', ') || 'Everyday & Special Occasion'}</p>
                        <p>• <strong className="text-[#2D2D2D]">Style:</strong> {product.styleTags?.join(' / ') || 'Boutique Handcrafted'}</p>
                      </div>
                    )}
                    {activeTab === 'fabric' && (
                      <p>• <strong className="text-[#2D2D2D]">Fabric Composition:</strong> {product.fabric}</p>
                    )}
                    {activeTab === 'care' && (
                      <p>• <strong className="text-[#2D2D2D]">Care Instructions:</strong> {product.careInstructions || 'Gentle hand wash in cold water with mild detergent.'}</p>
                    )}
                    {activeTab === 'delivery' && (
                      <p>• <strong className="text-[#2D2D2D]">Shipping & Returns:</strong> {product.deliveryInfo || storeConfig.deliveryTimeline}</p>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
