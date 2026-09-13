'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MenuItem, SeatingArea, CartItem, ReservationRecord, OrderCalculation } from '@/lib/types';
import { CartService } from '@/lib/services/CartService';
import { MenuService } from '@/lib/services/MenuService';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { Navbar } from '@/components/layout/Navbar';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StorySection } from '@/components/sections/StorySection';
import { MenuSection } from '@/components/sections/MenuSection';
import { ChefSpecialsSection } from '@/components/sections/ChefSpecialsSection';
import { AtmosphereSection } from '@/components/sections/AtmosphereSection';
import { ReservationSection } from '@/components/sections/ReservationSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { LocationHoursSection } from '@/components/sections/LocationHoursSection';
import { DishModal } from '@/components/ui/DishModal';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { CheckoutModal } from '@/components/ui/CheckoutModal';
import { ReservationPassModal } from '@/components/ui/ReservationPassModal';

function AuraRestaurantContent() {
  const { showToast } = useToast();

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);

  // Modals & Drawers State
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationRecord | null>(null);
  const [targetBookingArea, setTargetBookingArea] = useState<SeatingArea>('atrium');

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
      showToast('Course removed from your order.', 'info');
    },
    [showToast]
  );

  const handleOrderSuccess = useCallback(
    (orderId: string, calc: OrderCalculation) => {
      CartService.getInstance().clear();
      showToast(`Order #${orderId} confirmed! Our culinary brigade has begun preparation.`, 'success', 'Order Dispatched');
    },
    [showToast]
  );

  const handleSelectAreaFromAtmosphere = useCallback((area: SeatingArea) => {
    setTargetBookingArea(area);
    const element = document.getElementById('reservations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreDishById = useCallback((dishId: string) => {
    const item = MenuService.getInstance().getItemById(dishId);
    if (item) {
      setSelectedDish(item);
    }
  }, []);

  const handleScrollToReservations = useCallback(() => {
    const element = document.getElementById('reservations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-neutral-100 flex flex-col justify-between">
      
      {/* Sticky Luxury Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={handleScrollToReservations}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection onReserveClick={handleScrollToReservations} />
        <StorySection />
        <MenuSection
          onSelectDish={setSelectedDish}
          onAddToCart={(item) => handleAddToCart(item, 1)}
        />
        <ChefSpecialsSection onExploreDish={handleExploreDishById} />
        <AtmosphereSection onSelectAreaForBooking={handleSelectAreaFromAtmosphere} />
        <ReservationSection
          initialArea={targetBookingArea}
          onBookingConfirmed={setConfirmedBooking}
        />
        <TestimonialsSection />
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        cartCount={cartCount}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={handleScrollToReservations}
      />

      {/* Dish Detailed View Modal */}
      <DishModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        subtotal={cartSubtotal}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Order Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        subtotal={cartSubtotal}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Confirmed Reservation Digital Boarding Pass */}
      <ReservationPassModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <ToastProvider>
      <AuraRestaurantContent />
    </ToastProvider>
  );
}
