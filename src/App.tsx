/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedMenu } from './components/FeaturedMenu';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BurgerCustomizer3D } from './components/BurgerCustomizer3D';
import { Testimonials } from './components/Testimonials';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderModal } from './components/OrderModal';

import { MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './data/menuData';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Initialize with the chef's signature item in cart for instant delightful exploration
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      item: MENU_ITEMS[0],
      quantity: 1,
    }
  ]);

  // Setup Lenis smooth scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQty } : ci))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleOrderNowClick = () => {
    if (cartItems.length === 0) {
      // Add default flagship item and open drawer
      setCartItems([{ item: MENU_ITEMS[0], quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white selection:bg-[#E63B2E] selection:text-white">
      {/* 1. Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Glassmorphism Sticky Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOrderNow={handleOrderNowClick}
      />

      {/* Main Content Flow */}
      <main>
        {/* 3. Hero Section with Kinetic Typography */}
        <Hero
          onOrderClick={handleOrderNowClick}
          onExploreMenu={scrollToMenu}
        />

        {/* 4. Featured Menu Section */}
        <FeaturedMenu onAddToCart={handleAddToCart} />

        {/* 5. "Why Choose Us" Pillars */}
        <WhyChooseUs />

        {/* 6. Signature 3D Burger Deconstruct / Customizer */}
        <BurgerCustomizer3D />

        {/* 7. Testimonials Carousel */}
        <Testimonials />

        {/* 8. Call to Action Banner */}
        <CtaBanner onOrderNow={handleOrderNowClick} />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Express Checkout & Confirmation Modal */}
      <OrderModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
