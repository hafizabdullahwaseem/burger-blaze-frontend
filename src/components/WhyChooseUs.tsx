import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Zap, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Fresh Ingredients',
      highlight: 'Farm-to-Grill Everyday',
      description: 'Zero frozen patties. Never pre-processed. We partner with local family pastures for 100% grass-fed Black Angus beef and receive freshly baked brioche delivered every dawn.',
      accent: 'from-[#F5A623] to-[#d97706]',
      details: ['Butcher-ground chuck & brisket daily', 'Crisp hydroponic farm greens', 'No artificial preservatives or fillers'],
      stat: '100% Fresh',
      statLabel: 'Never Frozen Ever'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      highlight: 'Sizzling Hot in 20 Mins',
      description: 'Custom-engineered aero-vented packaging locks in moisture and burger juices while releasing excess steam—so your brioche bun stays golden and your fries arrive hyper-crisp.',
      accent: 'from-[#E63B2E] to-[#b91c1c]',
      details: ['Live GPS courier tracking', 'Custom dual-chamber thermal crates', 'Guaranteed crispy fries guarantee'],
      stat: '18 Mins',
      statLabel: 'Average Transit Time'
    },
    {
      icon: Utensils,
      title: 'Premium Taste',
      highlight: '500° Cast Iron Sear',
      description: 'Our proprietary 12-spice dry rub is seared hard onto double-thick cast-iron plates to caramelize the beef crust to mathematical crunch, topped with 18-month aged cheddar.',
      accent: 'from-[#FFB830] to-[#E63B2E]',
      details: ['Proprietary secret Blaze spice blend', 'Aged artisan melting cheddars', 'Glazed over natural applewood embers'],
      stat: '4.9 ★',
      statLabel: 'Over 25,000 Ratings'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="why-us" className="py-28 bg-[#0c0a09] relative overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#E63B2E]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">
            Uncompromising Culinary Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Why Food Lovers Choose Burger Blaze
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            We tore down the standard fast-food playbook to build an unapologetically gourmet, flame-crafted smash experience.
          </p>
        </div>

        {/* 3 Sequential Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-[#171311] rounded-2xl p-8 border border-white/10 hover:border-[#E63B2E]/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#E63B2E]/10 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.accent} p-[1px] shadow-lg shadow-[#E63B2E]/20`}>
                      <div className="w-full h-full bg-[#181310] rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xl font-black font-display text-white tabular-nums">{pillar.stat}</span>
                      <span className="block text-[11px] text-zinc-500 font-mono uppercase">{pillar.statLabel}</span>
                    </div>
                  </div>

                  {/* Title & Highlight */}
                  <div className="space-y-1.5 mb-4">
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#F5A623] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider">
                      {pillar.highlight}
                    </p>
                  </div>

                  {/* Body description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Bullet details */}
                <div className="pt-6 border-t border-white/10 space-y-2.5">
                  {pillar.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
