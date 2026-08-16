import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { boutiqueFaqs } from '../data/products';
import { storeConfig } from '../config/storeConfig';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(boutiqueFaqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-14 sm:py-20 bg-[#F8F5F0] border-t border-[#E8E2D6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C27E6E]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Everything you need to know about our fits, materials, shipping, and WhatsApp ordering.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {boutiqueFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-[#FDFCF9] rounded-2xl border border-[#E8E2D6] overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-[#F8F5F0]/60 transition-colors cursor-pointer"
                >
                  <h3 className="font-serif font-semibold text-sm sm:text-base text-[#2D2D2D]">
                    {faq.question}
                  </h3>
                  <div className={`w-7 h-7 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#2D2D2D] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#E8E2D6]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#E8E2D6] whitespace-pre-line animate-fade-in">
                    {faq.answer}

                    {faq.id === 'faq-5' && (
                      <div className="pt-3">
                        <a
                          href={buildWhatsAppLink(generateGeneralHelpMessage())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-lg hover:bg-[#20ba59] transition-colors shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Chat with {storeConfig.brandName}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
