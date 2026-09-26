import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0a09] text-white"
        >
          {/* Ambient ember background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E63B2E]/15 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute w-64 h-64 rounded-full bg-[#F5A623]/10 blur-2xl pointer-events-none" />

          {/* 3D Spinning Burger Animation Canvas / Visual */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-8 perspective-[1000px]">
            {/* Spinning ring with gradient */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#F5A623]/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-3 rounded-full border-t border-b border-[#E63B2E]/50"
            />

            {/* 3D Rotating Isometric Burger Stack */}
            <motion.div
              animate={{
                rotateY: [0, 180, 360],
                rotateX: [12, -8, 12],
                y: [-6, 6, -6],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.2,
                ease: "easeInOut",
              }}
              className="relative w-28 h-28 flex flex-col items-center justify-center transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Top Brioche Bun */}
              <motion.div
                animate={{ y: [-3, 0, -3] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="w-24 h-8 bg-gradient-to-b from-[#e39a3c] to-[#b36d1b] rounded-t-full shadow-lg relative border-b border-[#8a4e0a]"
              >
                {/* Sesame seed sparkles */}
                <div className="absolute top-1.5 left-4 w-1 h-1.5 bg-[#fde68a] rounded-full rotate-45 opacity-80" />
                <div className="absolute top-2 left-10 w-1 h-1.5 bg-[#fde68a] rounded-full -rotate-12 opacity-80" />
                <div className="absolute top-2.5 right-6 w-1 h-1.5 bg-[#fde68a] rounded-full rotate-24 opacity-80" />
                <div className="absolute top-3.5 left-7 w-1 h-1.5 bg-[#fde68a] rounded-full rotate-12 opacity-80" />
              </motion.div>

              {/* Ruffled Lettuce & Tomato */}
              <div className="w-26 h-3 -mt-1 flex items-center justify-between px-1">
                <div className="w-10 h-2.5 bg-[#22c55e] rounded-full skew-x-12 opacity-90 shadow-sm" />
                <div className="w-12 h-2.5 bg-[#ef4444] rounded-sm -skew-x-6 shadow-sm" />
              </div>

              {/* Melted Cheese Corners */}
              <div className="w-24 h-2 -mt-0.5 bg-[#F5A623] rounded-xs shadow-md relative z-10 flex justify-between px-2">
                <div className="w-2.5 h-3 bg-[#F5A623] rounded-b-sm rotate-12" />
                <div className="w-3 h-3.5 bg-[#F5A623] rounded-b-sm -rotate-6" />
                <div className="w-2 h-2.5 bg-[#F5A623] rounded-b-sm rotate-6" />
              </div>

              {/* Charred Angus Patty */}
              <div className="w-24 h-4 -mt-1 bg-gradient-to-r from-[#3e2723] via-[#4a2e2b] to-[#2c1810] rounded-lg shadow-inner border-y border-[#26150d] relative" />

              {/* Bottom Bun */}
              <div className="w-22 h-4 -mt-0.5 bg-gradient-to-b from-[#b36d1b] to-[#8a4e0a] rounded-b-2xl shadow-md" />
            </motion.div>

            {/* Flame Icon Sparkle Center */}
            <motion.div
              animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute -bottom-2 w-7 h-7 rounded-full bg-[#E63B2E] text-white flex items-center justify-center shadow-lg shadow-[#E63B2E]/50"
            >
              <Flame className="w-4 h-4 fill-white" />
            </motion.div>
          </div>

          {/* Brand Name Typography */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black tracking-wider uppercase font-display bg-gradient-to-r from-[#fafaf9] via-[#F5A623] to-[#E63B2E] bg-clip-text text-transparent">
              Burger Blaze
            </h2>
            <p className="text-xs text-[#a8a29e] tracking-widest uppercase font-medium">
              Igniting Flame • Crafting Perfection
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-56 mt-6">
            <div className="flex justify-between items-center text-xs text-[#a8a29e] mb-1.5 font-mono tabular-nums">
              <span>FIRING GRILL</span>
              <span className="text-[#F5A623] font-bold">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#1c1917] rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E63B2E] to-[#F5A623] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
