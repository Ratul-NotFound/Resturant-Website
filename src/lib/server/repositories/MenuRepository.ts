import { db } from '../db';
import { MenuItem } from '@/lib/types';
import { menuData } from '@/data/menuData';

export class MenuRepository {
  /**
   * Ensures the database is initialized with menu data on initial read.
   */
  private static ensureData(): void {
    const existing = db.menuItems.find();
    if (existing.length === 0) {
      db.menuItems.insertMany(menuData);
    }
  }

  /**
   * Fetches all active menu items sorted by display order.
   */
  static getAllItems(): MenuItem[] {
    MenuRepository.ensureData();
    return db.menuItems.find((item: any) => item.isActive !== false)
      .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  /**
   * Fetches a single menu item by ID.
   */
  static getById(id: string): MenuItem | undefined {
    MenuRepository.ensureData();
    return db.menuItems.findOne((item: any) => item.id === id && item.isActive !== false);
  }

  /**
   * Fetches multiple menu items by their IDs.
   */
  static getByIds(ids: string[]): MenuItem[] {
    MenuRepository.ensureData();
    if (!ids || ids.length === 0) return [];
    const idSet = new Set(ids);
    return db.menuItems.find((item: any) => idSet.has(item.id) && item.isActive !== false);
  }

  /**
   * Returns searchable tokens for Trie indexing.
   */
  static getAllForIndexing(): Array<{ id: string; searchTokens: string }> {
    const items = MenuRepository.getAllItems();
    return items.map((item) => ({
      id: item.id,
      searchTokens: [
        item.name,
        ...(item.ingredients || []),
        ...(item.dietary || []),
        item.category,
        item.description,
        item.chefNote || '',
        item.farmProvenance || '',
      ].join(' '),
    }));
  }
}
