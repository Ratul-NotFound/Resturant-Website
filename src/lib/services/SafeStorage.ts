/**
 * Type-Safe, Tamper-Proof Client Storage Utility.
 * Automatically handles JSON serialization, parsing, error recovery,
 * and purges corrupt or manipulated localStorage entries.
 */
export class SafeStorage {
  /**
   * Retrieves and parses an item from localStorage with a fallback value.
   */
  static getItem<T>(key: string, fallback: T, validator?: (val: unknown) => val is T): T {
    if (typeof window === 'undefined') return fallback;

    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;

      const parsed = JSON.parse(raw);
      if (validator && !validator(parsed)) {
        console.warn(`[SafeStorage] Value for key "${key}" failed validation. Purging.`);
        localStorage.removeItem(key);
        return fallback;
      }

      return parsed as T;
    } catch {
      localStorage.removeItem(key);
      return fallback;
    }
  }

  /**
   * Serializes and writes an item to localStorage.
   */
  static setItem<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Removes an item from localStorage.
   */
  static removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {}
  }
}
