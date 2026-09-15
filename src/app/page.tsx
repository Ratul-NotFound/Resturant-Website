'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  MenuItem,
  CartItem,
  OrderCalculation,
  CurrencyCode,
} from '@/lib/types';
import { CartService } from '@/lib/services/CartService';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { TopAnnouncementBar } from '@/components/layout/TopAnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { PromotionalMegaBanner } from '@/components/sections/PromotionalMegaBanner';
import { PopularDishesPortionSection } from '@/components/sections/PopularDishesPortionSection';
import { BrushAccentFeatureSection } from '@/components/sections/BrushAccentFeatureSection';
import { StoreFinderAndHotline } from '@/components/sections/StoreFinderAndHotline';
import { Footer } from '@/components/layout/Footer';
import { FloatingMobileOrderWidget } from '@/components/layout/FloatingMobileOrderWidget';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { CheckoutModal } from '@/components/ui/CheckoutModal';
import { OrderReceiptModal } from '@/components/ui/OrderReceiptModal';
import { DishModal } from '@/components/ui/DishModal';

function FlameAndFeastLandingContent() {
  const { showToast } = useToast();

  // Active Currency (BDT by default for Dhaka / Flame & Feast)
  const [currency] = useState<CurrencyCode>('BDT');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  // Modals & Drawers State
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Order Receipt Modal
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [lastOrderCalc, setLastOrderCalc] = useState<OrderCalculation | null>(null);

  // Subscribe to Cart Service
  useEffect(() => {
    const cartService = CartService.getInstance();
    const unsubscribe = cartService.subscribe((items, count, subtotal) => {
      setCartItems(items);
      setCartCount(count);
      setCartSubtotal(subtotal);
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleAddToCart = useCallback(
    (item: MenuItem, quantity = 1, notes = '') => {
      CartService.getInstance().addItem(item, quantity, notes);
      showToast(`Added ${quantity}x ${item.name} to your order.`, 'success', 'Order Updated');
    },
    [showToast]
  );

  const handleUpdateCartQty = useCallback((id: string, qty: number) => {
    CartService.getInstance().updateQuantity(id, qty);
  }, []);

  const handleRemoveCartItem = useCallback(
    (id: string) => {
      CartService.getInstance().removeItem(id);
      showToast('Item removed from your cart.', 'info');
    },
    [showToast]
  );

  const handleOrderSuccess = useCallback(
    (orderId: string, calc: OrderCalculation) => {
      CartService.getInstance().clear();
      setLastOrderId(orderId);
      setLastOrderCalc(calc);
      setIsReceiptOpen(true);
      showToast(`Order #${orderId} confirmed! Our kitchen is preparing your flame feast.`, 'success', 'Order Confirmed');
    },
    [showToast]
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between selection:bg-brand-red selection:text-white">
      
      {/* Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* Sticky Main Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Landing Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onSeeMenuClick={() => {
            const el = document.getElementById('menu-highlights');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onFindBranchClick={() => {
            const el = document.getElementById('branches');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Promotional Mega Deal Banner */}
        <PromotionalMegaBanner
          onAddMegaDeal={(item) => handleAddToCart(item, 1)}
        />

        {/* 3. Popular Dishes & Portion Packs (Kacchi Bhai & Galito's Portions) */}
        <PopularDishesPortionSection
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
        />

        {/* 4. Heritage & Brush Accent Feature Section */}
        <BrushAccentFeatureSection />

        {/* 5. Branch Locator & Hotline */}
        <StoreFinderAndHotline />
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Floating Mobile Bottom Action Widget */}
      <FloatingMobileOrderWidget />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        subtotal={cartSubtotal}
        currency={currency}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        subtotal={cartSubtotal}
        currency={currency}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Receipt Modal */}
      <OrderReceiptModal
        isOpen={isReceiptOpen}
        orderId={lastOrderId}
        calculation={lastOrderCalc}
        currency={currency}
        onClose={() => setIsReceiptOpen(false)}
      />

      {/* Quick Dish Modal (if needed) */}
      <DishModal
        item={selectedDish}
        currency={currency}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}

export default function HomePage() {
  return (
    <ToastProvider>
      <FlameAndFeastLandingContent />
    </ToastProvider>
  );
}
