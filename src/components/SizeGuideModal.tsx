import React, { useState } from 'react';
import { X, Ruler, MessageCircle } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inch' | 'cm'>('inch');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
        <div className="relative bg-[#FDFCF9] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8E2D6] z-10 animate-fade-in my-8">
          
          {/* Header */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E8E2D6] bg-[#F8F5F0]">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#C27E6E]" />
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#2D2D2D]">
                Fabrigo Boutique Size Chart
              </h2>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-8 h-8 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            
            {/* Unit Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#7A7571]">
                Standard garment body measurements for Kurtis, Dresses & Sets
              </p>

              <div className="flex items-center bg-[#F8F5F0] p-1 rounded-lg border border-[#E8E2D6] text-xs font-semibold">
                <button
                  onClick={() => setUnit('inch')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    unit === 'inch' ? 'bg-[#2D2D2D] text-[#FDFCF9]' : 'text-[#666666]'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    unit === 'cm' ? 'bg-[#2D2D2D] text-[#FDFCF9]' : 'text-[#666666]'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-xl border border-[#E8E2D6] bg-white shadow-2xs">
              <table className="w-full text-xs text-left text-[#2D2D2D]">
                <thead className="bg-[#F8F5F0] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E2D6] text-[#666666]">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Bust ({unit})</th>
                    <th className="py-3 px-4">Waist ({unit})</th>
                    <th className="py-3 px-4">Hip ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F5F0]">
                  {storeConfig.sizeChart.map((row) => (
                    <tr key={row.size} className="hover:bg-[#FDFCF9]">
                      <td className="py-2.5 px-4 font-bold text-[#C27E6E]">{row.size}</td>
                      <td className="py-2.5 px-4">{unit === 'inch' ? row.bustInch : row.bustCm}</td>
                      <td className="py-2.5 px-4">{unit === 'inch' ? row.waistInch : row.waistCm}</td>
                      <td className="py-2.5 px-4">{unit === 'inch' ? row.hipInch : row.hipCm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Measuring Tips */}
            <div className="bg-[#F8F5F0] rounded-xl p-4 border border-[#E8E2D6] text-xs text-[#666666] space-y-1.5">
              <p className="font-semibold text-[#2D2D2D]">How to Measure Correctly:</p>
              <p>• <strong>Bust:</strong> Measure around the fullest part of your bust with measuring tape comfortably relaxed.</p>
              <p>• <strong>Waist:</strong> Measure around your natural waistline, usually 2 inches above your navel.</p>
              <p>• <strong>Hips:</strong> Measure around the fullest part of your hips.</p>
            </div>

            {/* WhatsApp Assistance note */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#7A7571]">Still confused about the right fit?</span>
              <a
                href={buildWhatsAppLink(generateGeneralHelpMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] text-white rounded-xl font-semibold flex items-center gap-1.5 hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Ask Stylist on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
