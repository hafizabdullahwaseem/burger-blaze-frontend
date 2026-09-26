import React, { useState } from 'react';
import { Flame, Instagram, Twitter, Facebook, Youtube, Send, CheckCircle2, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer id="footer" className="bg-[#080706] text-zinc-400 pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="flex items-center gap-2 text-2xl font-black uppercase font-display text-white">
              <span className="w-8 h-8 rounded-lg bg-[#E63B2E] flex items-center justify-center text-white">
                <Flame className="w-5 h-5 fill-white" />
              </span>
              <span>Burger Blaze</span>
            </a>

            <p className="text-sm text-zinc-400 leading-relaxed pr-6">
              Born from a relentless obsession with the perfect crust, artisan milk buns, and high-heat cast-iron searing. No shortcuts. Just pure flame-crafted flavor.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E63B2E] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E63B2E] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E63B2E] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#E63B2E] text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (Col 5-7) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5A623] font-mono">
              Quick Menu
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Smash Burgers</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Nashville Chicken</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Truffle Loaded Sides</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Artisan Milkshakes</a>
              </li>
              <li>
                <a href="#craft-3d" className="hover:text-white transition-colors">Ingredient Provenance</a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column (Col 8-9) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5A623] font-mono">
              Store & Kitchen
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E63B2E] shrink-0 mt-0.5" />
                <span>442 S Broadway, Downtown Arts District, Los Angeles, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E63B2E] shrink-0" />
                <span>(213) 555-BLAZE</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E63B2E] shrink-0" />
                <span>orders@burgerblaze.com</span>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="block text-white font-medium">Mon - Thu: 11:00 AM – 11:00 PM</span>
                  <span className="block text-[#F5A623] font-medium">Fri - Sun: 11:00 AM – 2:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Column (Col 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F5A623] font-mono">
              Secret Menu VIP
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get secret drops, monthly chef experimental burgers, and instant 20% off your next delivery order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1.5 focus-within:border-[#E63B2E]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-1.5 bg-[#E63B2E] hover:bg-[#d82a1d] text-white rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the Blaze VIP Club! Check inbox.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Burger Blaze Inc. All culinary rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#allergens" className="hover:text-zinc-300 transition-colors">Allergen Guide</a>
            <a href="#accessibility" className="hover:text-zinc-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
