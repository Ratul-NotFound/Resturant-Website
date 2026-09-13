import { CartItem, MenuItem } from '@/lib/types';
import { MenuService } from './MenuService';

export type CartSubscriber = (items: CartItem[], count: number, subtotal: number) => void;

/**
 * Safe client-side Cart Service with Anti-Tamper schema verification.
 * Prices are ALWAYS re-associated from the verified MenuService rather than trusting localStorage.
 */
export class CartService {
  private static instance: CartService | null = null;
  private itemsMap: Map<string, { quantity: number; notes?: string }> = new Map();
  private subscribers: Set<CartSubscriber> = new Set();
  private storageKey = 'aura_cart_v1';

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        this.itemsMap.clear();
        for (const entry of parsed) {
          if (
            entry &&
            typeof entry.id === 'string' &&
            typeof entry.quantity === 'number' &&
            entry.quantity > 0 &&
            entry.quantity <= 50
          ) {
            // Verify item still exists in official menu catalog
            const exists = MenuService.getInstance().getItemById(entry.id);
            if (exists) {
              this.itemsMap.set(entry.id, {
                quantity: Math.floor(entry.quantity),
                notes: typeof entry.notes === 'string' ? entry.notes.slice(0, 200) : '',
              });
            }
          }
        }
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const payload = Array.from(this.itemsMap.entries()).map(([id, val]) => ({
        id,
        quantity: val.quantity,
        notes: val.notes,
      }));
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch {}
  }

  private notify(): void {
    const items = this.getItems();
    const count = this.getTotalCount();
    const subtotal = this.getSubtotal();
    for (const sub of this.subscribers) {
      sub(items, count, subtotal);
    }
  }

  subscribe(callback: CartSubscriber): () => void {
    this.subscribers.add(callback);
    callback(this.getItems(), this.getTotalCount(), this.getSubtotal());
    return () => this.subscribers.delete(callback);
  }

  addItem(item: MenuItem, quantity = 1, notes = ''): void {
    const current = this.itemsMap.get(item.id);
    const newQty = Math.min(50, (current?.quantity || 0) + quantity);
    this.itemsMap.set(item.id, {
      quantity: newQty,
      notes: notes || current?.notes || '',
    });
    this.saveToStorage();
    this.notify();
  }

  removeItem(itemId: string): void {
    this.itemsMap.delete(itemId);
    this.saveToStorage();
    this.notify();
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }
    const current = this.itemsMap.get(itemId);
    if (current) {
      this.itemsMap.set(itemId, {
        ...current,
        quantity: Math.min(50, Math.max(1, quantity)),
      });
      this.saveToStorage();
      this.notify();
    }
  }

  clear(): void {
    this.itemsMap.clear();
    this.saveToStorage();
    this.notify();
  }

  getItems(): CartItem[] {
    const list: CartItem[] = [];
    const menu = MenuService.getInstance();
    for (const [id, data] of this.itemsMap.entries()) {
      const item = menu.getItemById(id);
      if (item) {
        list.push({
          item,
          quantity: data.quantity,
          notes: data.notes,
        });
      }
    }
    return list;
  }

  getTotalCount(): number {
    let count = 0;
    for (const data of this.itemsMap.values()) {
      count += data.quantity;
    }
    return count;
  }

  getSubtotal(): number {
    let sum = 0;
    const menu = MenuService.getInstance();
    for (const [id, data] of this.itemsMap.entries()) {
      const item = menu.getItemById(id);
      if (item) {
        sum += item.price * data.quantity;
      }
    }
    return sum;
  }
}
