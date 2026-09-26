import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Clock, MapPin, CreditCard, Flame, Phone, User, Bike } from 'lucide-react';
import { CartItem } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'cod'>('card');
  const [formData, setFormData] = useState({
    name: 'Alex Sterling',
    phone: '(555) 234-5678',
    address: '742 Evergreen Terrace, Apt 4B',
    instructions: 'Ring bell #4, leave on doorstep table.'
  });

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const discountAmount = subtotal * 0.2; // BLAZE20 applied by default
  const deliveryFee = deliveryType === 'delivery' ? (subtotal >= 35 ? 0 : 3.99) : 0;
  const tax = (subtotal - discountAmount) * 0.0825;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    onOrderSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-[#171311] border border-white/15 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative my-8"
      >
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#E63B2E] flex items-center justify-center text-white">
              <Flame className="w-5 h-5 fill-white" />
            </span>
            <h3 className="text-xl font-black font-display text-white">
              {orderPlaced ? 'Order Confirmation' : 'Express Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderPlaced ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#F5A623] tracking-widest font-bold">
                Order #BB-84920 Confirmed
              </span>
              <h4 className="text-3xl font-black font-display text-white">
                The Fire Is Lit!
              </h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Your burgers are sizzling on the 500° cast-iron flattop right now. Our courier is scheduled for rapid dispatch.
              </p>
            </div>

            {/* Delivery Status Card */}
            <div className="bg-[#1e1916] rounded-2xl p-5 border border-white/10 text-left space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="w-4 h-4 text-[#F5A623]" />
                  <span>Estimated Arrival:</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">18 - 22 Mins</span>
              </div>

              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '15%' }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-[#E63B2E] to-[#F5A623] h-full rounded-full"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="text-emerald-400 font-bold">1. Grill Searing</span>
                <span className="text-[#F5A623]">2. Packaging</span>
                <span className="text-zinc-500">3. Out For Delivery</span>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="bg-black/30 rounded-xl p-4 border border-white/5 text-xs text-zinc-400 space-y-1.5 font-mono text-left">
              <div className="flex justify-between text-white font-bold pb-1 border-b border-white/10 font-sans">
                <span>Receipt Summary</span>
                <span className="text-[#F5A623] font-mono">${total.toFixed(2)}</span>
              </div>
              <p className="pt-1">Destination: {formData.address}</p>
              <p>Contact: {formData.phone}</p>
              <p>Payment: {paymentMethod === 'apple' ? 'Apple Pay' : paymentMethod === 'card' ? 'Visa •••• 4242' : 'Cash on Delivery'}</p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 bg-[#E63B2E] hover:bg-[#d82a1d] text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#E63B2E]/30"
            >
              Done & Return to Home
            </button>
          </div>
        ) : (
          /* Order Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
            {/* Delivery or Pickup toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#120f0d] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 text-xs font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  deliveryType === 'delivery'
                    ? 'bg-[#E63B2E] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery (20 min)</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 text-xs font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  deliveryType === 'pickup'
                    ? 'bg-[#E63B2E] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Pickup (10 min)</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#120f0d] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63B2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                  Phone Number (For Courier SMS)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#120f0d] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63B2E]"
                  />
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#120f0d] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E63B2E]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-zinc-400">
                Payment Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'apple', label: 'Apple Pay' },
                  { id: 'cod', label: 'Cash on Hand' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === p.id
                        ? 'bg-white/10 border-[#F5A623] text-[#F5A623]'
                        : 'border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total breakdown */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase font-mono block">Order Total:</span>
                <span className="text-2xl font-black text-[#F5A623] font-mono tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-[#E63B2E] to-[#d82a1d] hover:from-[#f04538] hover:to-[#E63B2E] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-[#E63B2E]/30 transition-all cursor-pointer"
              >
                Place Order Now
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
