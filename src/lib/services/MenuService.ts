import { MenuItem, DishCategory, DietaryTag } from '@/lib/types';
import { menuData } from '@/data/menuData';
import { TrieSearch } from '@/lib/dsa/Trie';

export class MenuService {
  private static instance: MenuService | null = null;
  private items: MenuItem[] = [];
  private trie: TrieSearch = new TrieSearch();

  private constructor() {
    this.items = [...menuData];
    this.buildTrieIndex();
  }

  static getInstance(): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService();
    }
    return MenuService.instance;
  }

  private buildTrieIndex(): void {
    this.trie.clear();
    for (const item of this.items) {
      const tokens = [
        item.name,
        ...(item.ingredients || []),
        ...(item.dietary || []),
        item.category,
        item.description,
        item.chefNote || '',
        item.farmProvenance || '',
      ]
        .join(' ')
        .toLowerCase()
        .split(/\s+/);

      for (const token of tokens) {
        if (token.length >= 2) {
          this.trie.insert(token, item.id);
        }
      }
    }
  }

  getAllItems(): MenuItem[] {
    return [...this.items];
  }

  getItemById(id: string): MenuItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  filterItems(options: {
    category?: DishCategory | 'all';
    searchQuery?: string;
    dietaryFilter?: DietaryTag | 'all';
    minPrice?: number;
    maxPrice?: number;
  }): MenuItem[] {
    let result = [...this.items];

    // Category filtering
    if (options.category && options.category !== 'all') {
      result = result.filter((item) => item.category === options.category);
    }

    // Dietary filtering
    if (options.dietaryFilter && options.dietaryFilter !== 'all') {
      result = result.filter((item) => item.dietary.includes(options.dietaryFilter as DietaryTag));
    }

    // Price range filtering
    if (options.minPrice !== undefined && options.minPrice > 0) {
      result = result.filter((item) => item.price >= options.minPrice!);
    }
    if (options.maxPrice !== undefined && options.maxPrice < Infinity) {
      result = result.filter((item) => item.price <= options.maxPrice!);
    }

    // Prefix search with Trie
    if (options.searchQuery && options.searchQuery.trim().length >= 2) {
      const matchingIds = this.trie.searchQuery(options.searchQuery);
      result = result.filter((item) => matchingIds.has(item.id));
    }

    return result;
  }
}
