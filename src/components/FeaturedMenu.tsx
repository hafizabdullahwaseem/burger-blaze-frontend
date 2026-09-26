import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Flame, Sparkles, Check, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface FeaturedMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'burgers' | 'chicken' | 'sides' | 'drinks'>('all');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [selectedItemDetail, setSelectedItemDetail] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'chicken', label: 'Crispy Chicken' },
    { id: 'sides', label: 'Loaded Sides' },
    { id: 'drinks', label: 'Handcrafted Shakes' },
  ] as const;

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1200);
  };

  // Staggered container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Card reveal variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="menu" className="py-24 bg-[#0e0c0a] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-[#E63B2E]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#F5A623]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E63B2E] uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-[#E63B2E]" />
              <span>Artisanal Flavor Laboratory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              Featured Menu Creations
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Freshly ground custom butcher blends, farm-crisp produce, and scratch-made glazes prepared right in front of your eyes.
            </p>
          </div>

          {/* Interactive Filter Segmented Control Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1a1614] rounded-xl border border-white/10 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#E63B2E] text-white shadow-md shadow-[#E63B2E]/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Staggered Grid of Menu Cards */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredItems.map((item) => {
            const isAdded = addedItemId === item.id;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={() => setSelectedItemDetail(item)}
                className="group relative bg-[#181412] rounded-2xl overflow-hidden border border-white/10 hover:border-[#E63B2E]/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#E63B2E]/15 flex flex-col cursor-pointer"
              >
                {/* Image Container with Hover Scale */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#241e1b]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  />

                  {/* Gradient bottom scrim for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181412] via-transparent to-black/20" />

                  {/* Subtle Text Tag (Max 1 per skill rule) */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-bold text-[#F5A623] tracking-wide uppercase border border-[#F5A623]/30">
                      {item.badge}
                    </div>
                  )}

                  {/* Spiciness indicator if applicable */}
                  {item.spiciness > 0 && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-bold text-white flex items-center gap-1 border border-white/10">
                      <Flame className="w-3 h-3 text-[#E63B2E] fill-[#E63B2E]" />
                      <span className="font-mono text-zinc-300">{item.spiciness === 1 ? 'Mild' : item.spiciness === 2 ? 'Hot' : 'Fiery'}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Unboxed category metadata with separator */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                      <span className="uppercase tracking-wider font-semibold text-[#F5A623]">{item.category}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="tabular-nums font-mono">{item.calories} kcal</span>
                    </div>

                    {/* Item Name */}
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-[#F5A623] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Price & Slide-in Add to Cart Button */}
                  <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">Price</span>
                      <span className="text-2xl font-black text-white font-mono tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Slide-in Add to Cart CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAdd(item, e)}
                      className={`relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E63B2E] hover:bg-[#d82a1d] text-white shadow-[#E63B2E]/25 group-hover:shadow-lg'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-white" />
                          <span>Add To Cart</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Item Detail Inspector Modal */}
      <AnimatePresence>
        {selectedItemDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#181412] border border-white/15 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative"
            >
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={selectedItemDetail.image}
                  alt={selectedItemDetail.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItemDetail(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase text-[#F5A623] font-bold tracking-wider">{selectedItemDetail.tagline}</span>
                    <h3 className="text-2xl font-black font-display text-white mt-1">{selectedItemDetail.name}</h3>
                  </div>
                  <span className="text-2xl font-mono font-black text-white tabular-nums">${selectedItemDetail.price.toFixed(2)}</span>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">{selectedItemDetail.description}</p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs uppercase text-zinc-400 font-bold tracking-wider">Premium Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItemDetail.ingredients.map((ing, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-200">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(selectedItemDetail);
                      setSelectedItemDetail(null);
                    }}
                    className="flex-1 py-3 bg-[#E63B2E] hover:bg-[#d82a1d] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#E63B2E]/30"
                  >
                    Add to Cart · ${selectedItemDetail.price.toFixed(2)}
                  </button>
                  <button
                    onClick={() => setSelectedItemDetail(null)}
                    className="px-5 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium text-sm rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
