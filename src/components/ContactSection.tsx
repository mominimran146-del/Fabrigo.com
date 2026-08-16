import React from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { buildWhatsAppLink, generateGeneralHelpMessage } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact-section" className="py-14 sm:py-24 bg-[#FDFCF9] border-t border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8F5F0] rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#E8E2D6] shadow-2xs relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Heading and Quick Chat Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDFCF9] border border-[#E8E2D6] text-[10px] font-semibold text-[#C27E6E] uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Boutique Concierge</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
                  Need Help Finding Your Style?
                </h2>
                <p className="text-sm sm:text-base text-[#666666] max-w-xl mx-auto lg:mx-0">
                  Have a question about size, fabric, availability or styling? We're happy to help you choose the perfect outfit.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                {/* WhatsApp Button */}
                <a
                  href={buildWhatsAppLink(generateGeneralHelpMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-semibold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Us</span>
                </a>

                {/* Instagram Button */}
                <a
                  href={storeConfig.instagramURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#FDFCF9] text-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-[#FDFCF9] border border-[#E8E2D6] text-xs font-semibold uppercase tracking-wider rounded-full shadow-2xs transition-all"
                >
                  <Instagram className="w-4 h-4 text-[#C27E6E]" />
                  <span>Instagram</span>
                </a>

                {/* Email Button */}
                <a
                  href={`mailto:${storeConfig.email}?subject=Fabrigo Boutique Inquiry`}
                  className="flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white text-[#2D2D2D] border border-[#E8E2D6] text-xs font-semibold uppercase tracking-wider rounded-full transition-all"
                >
                  <Mail className="w-4 h-4 text-[#C27E6E]" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>

            {/* Right: Boutique Information Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#FDFCF9] rounded-2xl p-6 sm:p-7 border border-[#E8E2D6] shadow-sm space-y-4">
                <div className="border-b border-[#E8E2D6] pb-3">
                  <h3 className="font-serif font-bold text-lg text-[#2D2D2D]">
                    {storeConfig.brandName} Boutique
                  </h3>
                  <p className="text-xs text-[#8C8680]">{storeConfig.tagline}</p>
                </div>

                <div className="space-y-3 text-xs text-[#666666]">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2D2D]">Studio Location</p>
                      <p className="text-[#7A7571] mt-0.5 leading-snug">{storeConfig.location}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] shrink-0 mt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2D2D]">Direct Phone / WhatsApp</p>
                      <p className="text-[#7A7571] mt-0.5">{storeConfig.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2D2D]">Email Inquiries</p>
                      <p className="text-[#7A7571] mt-0.5">{storeConfig.email}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center text-[#C27E6E] shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D2D2D]">Styling Hours</p>
                      <p className="text-[#7A7571] mt-0.5">{storeConfig.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
