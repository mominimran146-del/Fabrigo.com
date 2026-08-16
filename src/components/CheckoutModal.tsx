import React, { useState } from 'react';
import { X, MessageCircle, MapPin, CheckCircle2, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { useShop } from '../context/ShopContext';
import { OrderCustomerDetails } from '../types';
import { buildWhatsAppLink, generateOrderWhatsAppMessage } from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    shippingFee, 
    total, 
    isCheckoutOpen, 
    setIsCheckoutOpen,
    clearCart,
    showToast 
  } = useShop();

  const [form, setForm] = useState<OrderCustomerDetails>({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderCustomerDetails, string>>>({});

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Partial<Record<keyof OrderCustomerDetails, string>> = {};
    if (!form.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!form.mobileNumber.trim() || form.mobileNumber.length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!form.address.trim()) errs.address = 'Please enter complete delivery address';
    if (!form.city.trim()) errs.city = 'Please enter city';
    if (!form.state.trim()) errs.state = 'Please enter state';
    if (!form.pincode.trim() || form.pincode.length < 6) {
      errs.pincode = 'Please enter 6-digit PIN code';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (cart.length === 0) {
      showToast('Your shopping bag is empty!', 'info');
      return;
    }

    const message = generateOrderWhatsAppMessage(form, cart, subtotal, shippingFee, total);
    const waUrl = buildWhatsAppLink(message);

    // Open WhatsApp
    window.open(waUrl, '_blank');

    showToast('WhatsApp order generated! Sending to boutique...');
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
        <div className="relative bg-[#FDFCF9] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E2D6] z-10 animate-fade-in my-8">
          
          {/* Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#E8E2D6] bg-[#F8F5F0]">
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C27E6E]">
                Direct Boutique Dispatch
              </span>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#2D2D2D]">
                Complete Your Order
              </h2>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Close checkout modal"
              className="w-8 h-8 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-6">
            
            {/* Delivery Details Form */}
            <div className="space-y-4">
              <h3 className="font-serif font-semibold text-sm sm:text-base text-[#2D2D2D] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C27E6E]" />
                <span>Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Patel"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs bg-white border rounded-xl text-[#2D2D2D] focus:outline-hidden ${
                      errors.fullName ? 'border-rose-500' : 'border-[#E8E2D6] focus:border-[#C27E6E]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={form.mobileNumber}
                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                    className={`w-full px-3 py-2 text-xs bg-white border rounded-xl text-[#2D2D2D] focus:outline-hidden ${
                      errors.mobileNumber ? 'border-rose-500' : 'border-[#E8E2D6] focus:border-[#C27E6E]'
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-[10px] text-rose-600 mt-0.5">{errors.mobileNumber}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D6] rounded-xl text-[#2D2D2D] focus:outline-hidden focus:border-[#C27E6E]"
                />
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">
                  Street Address / Flat No / Landmark *
                </label>
                <textarea
                  rows={2}
                  placeholder="Flat 402, Building Name, Street, Landmark"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={`w-full px-3 py-2 text-xs bg-white border rounded-xl text-[#2D2D2D] focus:outline-hidden ${
                    errors.address ? 'border-rose-500' : 'border-[#E8E2D6] focus:border-[#C27E6E]'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-rose-600 mt-0.5">{errors.address}</p>}
              </div>

              {/* City, State, PIN */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">City *</label>
                  <input
                    type="text"
                    placeholder="Mumbai"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={`w-full px-3 py-2 text-xs bg-white border rounded-xl text-[#2D2D2D] focus:outline-hidden ${
                      errors.city ? 'border-rose-500' : 'border-[#E8E2D6] focus:border-[#C27E6E]'
                    }`}
                  />
                  {errors.city && <p className="text-[10px] text-rose-600 mt-0.5">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">State *</label>
                  <input
                    type="text"
                    placeholder="Maharashtra"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className={`w-full px-3 py-2 text-xs bg-white border rounded-xl text-[#2D2D2D] focus:outline-hidden ${
                      errors.state ? 'border-rose-500' : 'border-[#E8E2D6] focus:border-[#C27E6E]'
                    }`}
                  />
                  {errors.state && <p className="text-[10px] text-rose-600 mt-0.5">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">PIN Code *</label>
                  <input
                    type="text"
                    placeholder="400050"
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className={`w-full px-3 py-2 text-xs bg-white border rounded-xl text-[#2D2D2D] focus:outline-hidden ${
                      errors.pincode ? 'border-rose-500' : 'border-[#E8E2D6] focus:border-[#C27E6E]'
                    }`}
                  />
                  {errors.pincode && <p className="text-[10px] text-rose-600 mt-0.5">{errors.pincode}</p>}
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#2D2D2D] mb-1">
                  Order Notes / Customization Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please call before delivery / Need urgent dispatch"
                  value={form.orderNotes}
                  onChange={(e) => setForm({ ...form, orderNotes: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D6] rounded-xl text-[#2D2D2D] focus:outline-hidden focus:border-[#C27E6E]"
                />
              </div>
            </div>

            {/* Order Items & Total Summary */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E2D6] space-y-3">
              <h4 className="font-serif font-semibold text-xs text-[#8C8680] uppercase tracking-wider">
                Order Summary ({cart.length} unique items)
              </h4>

              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center justify-between text-xs text-[#2D2D2D]">
                    <div className="flex items-center gap-2 truncate max-w-[280px]">
                      <span>•</span>
                      <span className="truncate font-medium">{item.product.name}</span>
                      <span className="text-[#8C8680] text-[10px]">({item.selectedSize} × {item.quantity})</span>
                    </div>
                    <span className="font-bold text-[#2D2D2D]">
                      {storeConfig.currency}{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#F8F5F0] flex items-center justify-between text-sm font-bold text-[#2D2D2D]">
                <span>Total Due:</span>
                <span className="text-base text-[#C27E6E]">
                  {storeConfig.currency}{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Place Order on WhatsApp</span>
              </button>

              <p className="text-center text-[11px] text-[#7A7571]">
                Clicking will open WhatsApp with your pre-formatted order summary for immediate confirmation with {storeConfig.brandName}.
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
