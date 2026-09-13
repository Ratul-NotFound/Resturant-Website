import { db } from '../db';
import { OrderPayload, OrderCalculation } from '@/lib/types';
import { MenuRepository } from './MenuRepository';
import { PROMO_COUPONS } from '@/data/restaurantConfig';

export class OrderRepository {
  /**
   * Recalculates cart items against authoritative database prices (Zero-Trust).
   */
  static calculateBill(items: Array<{ id: string; quantity: number }>, couponCode?: string, tipPercent = 18): {
    calculation: OrderCalculation;
    verifiedItems: Array<{ id: string; name: string; price: number; quantity: number; itemTotal: number }>;
  } {
    let subtotal = 0;
    const verifiedItems: Array<{ id: string; name: string; price: number; quantity: number; itemTotal: number }> = [];

    for (const item of items) {
      const dbItem = MenuRepository.getById(item.id);
      if (dbItem) {
        const itemTotal = dbItem.price * item.quantity;
        subtotal += itemTotal;
        verifiedItems.push({
          id: dbItem.id,
          name: dbItem.name,
          price: dbItem.price,
          quantity: item.quantity,
          itemTotal,
        });
      }
    }

    let discountPercentage = 0;
    if (couponCode && PROMO_COUPONS[couponCode.toUpperCase()]) {
      discountPercentage = PROMO_COUPONS[couponCode.toUpperCase()].discountPercent;
    }

    const discount = (subtotal * discountPercentage) / 100;
    const discountedSubtotal = Math.max(0, subtotal - discount);
    const taxRate = 0.08875; // 8.875% NYC sales tax
    const tax = discountedSubtotal * taxRate;
    const tip = (discountedSubtotal * (tipPercent || 18)) / 100;
    const grandTotal = discountedSubtotal + tax + tip;

    return {
      calculation: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        discountPercentage,
        tax: parseFloat(tax.toFixed(2)),
        tip: parseFloat(tip.toFixed(2)),
        grandTotal: parseFloat(grandTotal.toFixed(2)),
        estimatedPrepMinutes: 35,
      },
      verifiedItems,
    };
  }

  /**
   * Saves confirmed order into database.
   */
  static createOrder(payload: OrderPayload): { orderId: string; calculation: OrderCalculation } {
    const { calculation, verifiedItems } = OrderRepository.calculateBill(
      payload.items,
      payload.couponCode,
      payload.tipPercentage
    );

    const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderRecord = {
      id: orderId,
      customer: payload.customer,
      items: verifiedItems,
      couponCode: payload.couponCode || null,
      tipPercentage: payload.tipPercentage,
      calculation,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    db.orders.insert(orderRecord);
    return { orderId, calculation };
  }
}
