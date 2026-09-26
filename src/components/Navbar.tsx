import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Flame } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOrderNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOrderNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'menu', 'why-us', 'craft-3d', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Why Us', href: '#why-us', id: 'why-us' },
    { label: '3D Layers', href: '#craft-3d', id: 'craft-3d' },
    { label: 'Reviews', href: '#testimonials', id: 'testimonials' },
    { label: 'Contact', href: '#footer', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-xl shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element with icon accent) */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-xl sm:text-2xl font-black tracking-tight uppercase font-display text-white transition-transform active:scale-95"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63B2E] to-[#b91c1c] flex items-center justify-center shadow-md shadow-[#E63B2E]/40 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white fill-white" />
            </span>
            <span className="bg-gradient-to-r from-white via-zinc-100 to-[#F5A623] bg-clip-text text-transparent">
              Burger Blaze
            </span>
          </a>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative py-1 transition-colors hover:text-[#F5A623] ${
                  activeSection === link.id ? 'text-[#F5A623] font-semibold' : 'text-zinc-300'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E63B2E] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Cart + Order CTA) */}
          <div className="flex items-center gap-3">
            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-[#E63B2E]"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#E63B2E] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-pulse font-mono tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOrderNow}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E63B2E] to-[#d82a1d] hover:from-[#f04538] hover:to-[#E63B2E] rounded-xl shadow-lg shadow-[#E63B2E]/30 border border-[#E63B2E]/60 transition-all cursor-pointer whitespace-nowrap"
            >
              Order Now
            </motion.button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-18 z-30 md:hidden bg-[#120f0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left text-base font-semibold py-2 transition-colors flex items-center justify-between ${
                    activeSection === link.id ? 'text-[#F5A623]' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && (
                    <span className="w-2 h-2 rounded-full bg-[#E63B2E]" />
                  )}
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOrderNow();
                  }}
                  className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#E63B2E] to-[#d82a1d] rounded-xl shadow-lg shadow-[#E63B2E]/40"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
