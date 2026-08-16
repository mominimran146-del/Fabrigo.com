import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#2D2D2D] text-[#FDFCF9] p-3.5 rounded-2xl shadow-xl border border-[#444444] flex items-center justify-between gap-3 animate-fade-in text-xs"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#C27E6E] shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <p className="font-medium text-[#FDFCF9] leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#8C8680] hover:text-white p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
