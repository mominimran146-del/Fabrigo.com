import React from 'react';
import { Star, MessageSquareQuote, Heart, CheckCircle } from 'lucide-react';
import { sampleReviews } from '../data/products';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#FDFCF9] border-t border-[#E8E2D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C27E6E]">
            Word of Love
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#2D2D2D] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Real feedback on fabric comfort, sizing precision, and boutique ordering experience.
          </p>
          
          <div className="inline-block pt-1">
            <span className="text-[10px] uppercase tracking-wider text-[#8C8680] bg-[#F8F5F0] border border-[#E8E2D6] px-3 py-1 rounded-full">
              * Showing Sample / Demo Boutique Reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sampleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D6] shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#C27E6E]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C27E6E] stroke-[#C27E6E]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#2D2D2D] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-3 border-t border-[#F8F5F0] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-serif font-semibold text-xs sm:text-sm text-[#2D2D2D]">
                      {review.author}
                    </p>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-[#8C8680]">{review.location}</p>
                </div>

                <span className="text-[10px] text-[#C27E6E] font-medium bg-[#F8F5F0] border border-[#E8E2D6] px-2 py-0.5 rounded-md text-right truncate max-w-[120px]">
                  {review.productName}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Boutique Prompt: Your experience could be here */}
        <div className="text-center bg-[#F8F5F0] rounded-2xl p-4 sm:p-5 border border-[#E8E2D6] max-w-xl mx-auto flex items-center justify-center gap-3">
          <Heart className="w-4 h-4 text-[#C27E6E] shrink-0 fill-[#C27E6E]" />
          <p className="text-xs text-[#666666] font-medium">
            Loved your Fabrigo outfit? <span className="text-[#2D2D2D] font-semibold">Your experience could be featured here</span> when you share feedback on WhatsApp!
          </p>
        </div>

      </div>
    </section>
  );
};
