import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    subtotal, 
    shippingFee, 
    total, 
    freeShippingRemaining,
    updateCartQuantity, 
    removeFromCart, 
    isCartOpen, 
    setIsCartOpen,
    setIsCheckoutOpen,
    setSelectedProductForDetail
  } = useShop();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const percentToFreeShipping = Math.min(
    100,
    Math.round((subtotal / storeConfig.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FDFCF9] shadow-2xl flex flex-col z-10 border-l border-[#E8E2D6] animate-fade-in">
        
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E8E2D6] bg-[#F8F5F0]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C27E6E]" />
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#2D2D2D]">
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="w-8 h-8 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FDFCF9] px-4 py-3 border-b border-[#E8E2D6] text-xs">
          {freeShippingRemaining > 0 ? (
            <div className="space-y-1.5">
              <p className="text-[#666666] flex items-center justify-between">
                <span>Add <strong>{storeConfig.currency}{freeShippingRemaining.toLocaleString('en-IN')}</strong> more for Free Shipping</span>
                <span className="font-semibold text-[#C27E6E]">{percentToFreeShipping}%</span>
              </p>
              <div className="w-full h-1.5 bg-[#E8E2D6] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C27E6E] transition-all duration-300"
                  style={{ width: `${percentToFreeShipping}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Congratulations! You qualify for Free Delivery ✨</span>
            </div>
          )}
        </div>

        {/* Cart items list / Empty state */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white rounded-2xl p-3.5 border border-[#E8E2D6] shadow-2xs flex gap-3.5 items-start"
              >
                {/* Image */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  onClick={() => {
                    setIsCartOpen(false);
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
                          setIsCartOpen(false);
                          setSelectedProductForDetail(item.product);
                        }}
                        className="font-serif font-semibold text-xs sm:text-sm text-[#2D2D2D] hover:text-[#C27E6E] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        aria-label="Remove item"
                        className="text-[#8C8680] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#7A7571] mt-0.5">
                      <span className="bg-[#F8F5F0] border border-[#E8E2D6] px-2 py-0.5 rounded-sm font-medium">Size: {item.selectedSize}</span>
                      {item.selectedColor && (
                        <span className="truncate max-w-[90px]">{item.selectedColor}</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Quantity Adjuster */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-[#E8E2D6] bg-[#F8F5F0] rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#2D2D2D] hover:bg-[#E8E2D6] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-[#2D2D2D]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#2D2D2D] hover:bg-[#E8E2D6] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-xs sm:text-sm text-[#2D2D2D]">
                      {storeConfig.currency}{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty Cart */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="font-serif text-base font-semibold text-[#2D2D2D]">
                  Your Fabrigo bag is waiting for something beautiful.
                </h3>
                <p className="text-xs text-[#666666]">
                  Explore our handcrafted kurtis, dresses, and co-ords to add everyday elegance.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#C27E6E] transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E8E2D6] bg-white space-y-3">
            {/* Calculation rows */}
            <div className="space-y-1.5 text-xs text-[#666666]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2D2D2D]">{storeConfig.currency}{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600 font-semibold">FREE</strong>
                  ) : (
                    `${storeConfig.currency}${shippingFee}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#F8F5F0] flex justify-between text-sm font-bold text-[#2D2D2D]">
                <span>Total Amount</span>
                <span>{storeConfig.currency}{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#2D2D2D] hover:bg-[#C27E6E] text-white text-xs font-semibold uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 text-center text-xs text-[#7A7571] hover:text-[#2D2D2D] underline transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

            <p className="text-[10px] text-center text-[#8C8680]">
              🔒 Orders confirmed & processed personally via WhatsApp with tracking details.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
