import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Flame, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-28 bg-[#0c0a09] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#E63B2E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5A623]">
              <Flame className="w-4 h-4 fill-[#F5A623]" />
              <span>Real Reviews from True Burger Purists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              Loved by Foodies & Critics
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              From Michelin-starred chefs to late-night midnight cravers, read authentic testimonials from our verified patrons.
            </p>
          </div>

          {/* Controls: Prev / Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-xl bg-[#1a1614] hover:bg-[#251e1b] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-xl bg-[#1a1614] hover:bg-[#251e1b] border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
        >
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            animate={{ x: `-${currentIndex * (100 / (window.innerWidth > 1024 ? 2.5 : window.innerWidth > 768 ? 1.5 : 1))}%` }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          >
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="w-full sm:w-[380px] lg:w-[420px] shrink-0 bg-[#161210] rounded-2xl p-7 border border-white/10 hover:border-[#E63B2E]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-zinc-700" />
                  </div>

                  {/* Comment */}
                  <p className="text-zinc-200 text-sm sm:text-base leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                {/* Author Info & Favorite Item */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white font-display">
                        {review.name}
                      </h4>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xs text-zinc-400 font-medium">
                      <span>{review.role}</span>
                      <span className="mx-1 text-zinc-600">·</span>
                      <span>{review.city}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase block">Favorite</span>
                    <span className="text-xs font-semibold text-[#F5A623] line-clamp-1 max-w-[120px]">
                      {review.favoriteItem}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#E63B2E]'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
