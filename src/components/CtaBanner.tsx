import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Copy, Check, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOrderNow: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOrderNow }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BLAZE20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-r from-[#b91c1c] via-[#E63B2E] to-[#d97706] text-white">
      {/* Background Parallax Marquee Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="whitespace-nowrap font-black font-display text-[140px] sm:text-[200px] tracking-tight text-black flex items-center gap-12"
        >
          <span>CRAVE THE FLAME</span>
          <span>•</span>
          <span>SMASHED TO ORDER</span>
          <span>•</span>
          <span>100% BLACK ANGUS</span>
          <span>•</span>
          <span>BURGER BLAZE</span>
          <span>•</span>
        </motion.div>
      </div>

      {/* Ambient glowing highlights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200"
        >
          <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>Limited Time Welcome Offer</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white drop-shadow-lg"
        >
          Craving Yet?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Fresh patties are being smashed on cast iron this very second. Order online for sizzling, rapid delivery or instant curbside pickup.
        </motion.p>

        {/* Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrderNow}
            className="group px-8 py-4 bg-zinc-950 hover:bg-black text-white font-bold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-2xl transition-all flex items-center gap-3 cursor-pointer border border-white/10"
          >
            <span>Order Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#F5A623]" />
          </motion.button>

          {/* Copy Promo Code Pill */}
          <button
            onClick={handleCopyCode}
            className="px-5 py-4 bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider text-white flex items-center gap-2.5 transition-colors cursor-pointer"
            title="Click to copy 20% discount code"
          >
            <span>CODE: BLAZE20</span>
            {copied ? (
              <span className="flex items-center gap-1 text-emerald-200">
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </span>
            ) : (
              <Copy className="w-4 h-4 text-white/70" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
