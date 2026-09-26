import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Sparkles, Clock, Star, ShieldCheck } from 'lucide-react';
import heroBurgerImg from '../assets/images/hero_burger_blaze_1790445987916.jpg';

interface HeroProps {
  onOrderClick: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExploreMenu }) => {
  // Kinetic typography headline words
  const headlineWords = ['Taste', 'the', 'Blaze'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 35, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Full-bleed background image with darkening gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBurgerImg}
          alt="Flame-grilled gourmet burger with melting cheddar cheese"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Measured dark cinematic scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/75 to-[#0c0a09]/55" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0c0a09]/40 to-[#0c0a09]/90" />
      </div>

      {/* Ambient glowing embers */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#E63B2E]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#F5A623]/15 blur-[100px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, subheadline, CTAs */}
          <div className="lg:col-span-8 space-y-7">
            {/* Quiet kicker text without pill box */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#F5A623] uppercase"
            >
              <Flame className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
              <span>Flame-Forged Culinary Craftsmanship</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">100% Prime Black Angus</span>
            </motion.div>

            {/* Kinetic Typography Headline: Word by word reveal */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="perspective-[1000px]"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.05] drop-shadow-md">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordVariants}
                    className={`inline-block mr-3 sm:mr-5 ${
                      word === 'Blaze'
                        ? 'bg-gradient-to-r from-[#E63B2E] via-[#F5A623] to-[#FFB830] bg-clip-text text-transparent'
                        : 'text-white'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subheadline with balanced measure */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed font-normal"
            >
              Smashed to order on a 500° cast-iron flattop. Smoked over applewood chips,
              dripping with aged artisan cheddar, and nestled inside gold-glazed brioche.
            </motion.p>

            {/* Primary & Secondary Action CTAs with Floating Motion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Floating Primary CTA Button */}
              <motion.button
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOrderClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E63B2E] to-[#d3261a] hover:from-[#f04538] hover:to-[#E63B2E] text-white font-bold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-xl shadow-[#E63B2E]/35 border border-[#E63B2E]/80 transition-all cursor-pointer"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Secondary Explore Menu CTA */}
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 hover:text-white font-semibold text-sm sm:text-base transition-colors cursor-pointer"
              >
                <span>Explore Full Menu</span>
              </button>
            </motion.div>

            {/* Claim-to-Proof Quantitative Adjacency (Zero-pill, clean metadata) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-400 font-medium"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />
                <span className="text-white font-bold tabular-nums">4.9 / 5.0</span>
                <span>(3,800+ food reviews)</span>
              </div>
              <div className="hidden sm:inline text-zinc-700">·</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E63B2E]" />
                <span className="text-white font-bold tabular-nums">18 Mins</span>
                <span>Average Doorstep Drop</span>
              </div>
              <div className="hidden sm:inline text-zinc-700">·</div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-white font-bold">100% Fresh</span>
                <span>Never Frozen Beef</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Rotating Special Offer Badge & Focal Card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            {/* Continuously Rotating Circular Special Offer Badge */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Rotating SVG Circular Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                className="absolute inset-0 w-full h-full origin-center"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-[#F5A623] tracking-widest font-mono text-[11px] uppercase font-bold">
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    fill="none"
                  />
                  <text>
                    <textPath href="#circlePath" startOffset="0%">
                      • 100% BLACK ANGUS • FLAME GRILLED • CHEF SPECIAL • BLAZE
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Inner Badge Core */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                onClick={onOrderClick}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#E63B2E] to-[#F5A623] p-[2px] shadow-2xl shadow-[#E63B2E]/50 cursor-pointer flex flex-col items-center justify-center text-center text-white"
              >
                <div className="w-full h-full rounded-full bg-[#181310] flex flex-col items-center justify-center p-2">
                  <span className="text-[10px] text-[#F5A623] font-mono tracking-widest uppercase font-bold">SPECIAL</span>
                  <span className="text-lg sm:text-xl font-black font-display text-white tabular-nums leading-none my-0.5">20% OFF</span>
                  <span className="text-[9px] text-zinc-400 font-mono">USE CODE BLAZE20</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
