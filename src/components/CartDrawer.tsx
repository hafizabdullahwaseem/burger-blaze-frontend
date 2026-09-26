import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('BLAZE20');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('BLAZE20');
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const discountPercent = appliedPromo === 'BLAZE20' ? 0.2 : 0;
  const discountAmount = subtotal * discountPercent;
  const deliveryFee = subtotal >= 35 || subtotal === 0 ? 0 : 3.99;
  const tax = (subtotal - discountAmount) * 0.0825;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'BLAZE20') {
      setAppliedPromo('BLAZE20');
    } else {
      setPromoError('Invalid coupon. Try BLAZE20');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#14110f] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E63B2E] flex items-center justify-center text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Your Blaze Bag</h2>
                    <span className="text-xs text-zinc-400 font-mono">
                      {cartItems.reduce((acc, c) => acc + c.quantity, 0)} items selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-base font-bold text-white">Your bag is empty</p>
                    <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                      Explore our menu of flame-smashed burgers, crispy chicken, and loaded sides.
                    </p>
                  </div>
                ) : (
                  cartItems.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="bg-[#1b1714] p-4 rounded-xl border border-white/5 flex gap-4 items-center"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-18 h-18 rounded-lg object-cover bg-zinc-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate font-display">
                          {cartItem.item.name}
                        </h4>
                        <span className="text-xs text-[#F5A623] font-mono tabular-nums">
                          ${cartItem.item.price.toFixed(2)} each
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-white/10 rounded-lg bg-black/40 p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono text-white font-bold tabular-nums">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="text-zinc-500 hover:text-[#E63B2E] transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-white font-mono tabular-nums">
                          ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Calculations */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#161210] space-y-4">
                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. BLAZE20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#E63B2E]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-white/15 text-xs font-bold uppercase rounded-xl text-white transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {appliedPromo && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Coupon {appliedPromo} applied (20% Off)</span>
                    </div>
                  )}

                  {promoError && (
                    <div className="text-xs text-[#E63B2E] font-medium">
                      {promoError}
                    </div>
                  )}

                  {/* Price breakdown */}
                  <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-white/5 font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount (20%)</span>
                        <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="tabular-nums">
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-400 uppercase font-bold">Free ($35+ order)</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated State & City Tax</span>
                      <span className="tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10 font-sans">
                      <span>Total Amount</span>
                      <span className="font-mono text-xl text-[#F5A623] tabular-nums">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={onProceedToCheckout}
                    className="w-full py-4 bg-gradient-to-r from-[#E63B2E] to-[#d82a1d] hover:from-[#f04538] hover:to-[#E63B2E] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-[#E63B2E]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
