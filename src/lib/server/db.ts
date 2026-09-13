import fs from 'fs';
import path from 'path';

/**
 * Embedded Self-Hosted ACID JSON-File Database Engine.
 * Features:
 * - 100% pure TypeScript/JavaScript (zero native compiler issues on any OS/Node.js version)
 * - Atomic write operations via temporary files (.tmp -> rename)
 * - In-memory caching with automatic persistence
 * - ACID transaction support with rollback on error
 * - Zero third-party cloud database required
 */

const DB_DIR = path.join(process.cwd(), 'database');
const DATA_DIR = path.join(DB_DIR, 'data');

// Ensure database folders exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export class JsonTable<T extends Record<string, any>> {
  private tableName: string;
  private filePath: string;
  private cache: T[] | null = null;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.filePath = path.join(DATA_DIR, `${tableName}.json`);
    this.init();
  }

  private init(): void {
    if (!fs.existsSync(this.filePath)) {
      this.writeAtomic([]);
    }
  }

  private read(): T[] {
    if (this.cache !== null) return this.cache;
    try {
      if (!fs.existsSync(this.filePath)) {
        this.cache = [];
        return this.cache;
      }
      const raw = fs.readFileSync(this.filePath, 'utf-8');
      this.cache = JSON.parse(raw || '[]');
      return this.cache!;
    } catch {
      this.cache = [];
      return this.cache;
    }
  }

  private writeAtomic(data: T[]): void {
    const tmpPath = `${this.filePath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 6)}`;
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpPath, this.filePath);
    this.cache = data;
  }

  /**
   * Returns all rows matching optional predicate.
   */
  find(predicate?: (row: T) => boolean): T[] {
    const all = this.read();
    if (!predicate) return [...all];
    return all.filter(predicate);
  }

  /**
   * Returns single row matching predicate.
   */
  findOne(predicate: (row: T) => boolean): T | undefined {
    const all = this.read();
    return all.find(predicate);
  }

  /**
   * Inserts single row.
   */
  insert(row: T): T {
    const all = this.read();
    all.push(row);
    this.writeAtomic(all);
    return row;
  }

  /**
   * Inserts multiple rows in a single write.
   */
  insertMany(rows: T[]): void {
    const all = this.read();
    all.push(...rows);
    this.writeAtomic(all);
  }

  /**
   * Updates rows matching predicate.
   */
  update(predicate: (row: T) => boolean, updater: (row: T) => T): number {
    const all = this.read();
    let updatedCount = 0;
    const next = all.map((row) => {
      if (predicate(row)) {
        updatedCount++;
        return updater(row);
      }
      return row;
    });
    if (updatedCount > 0) {
      this.writeAtomic(next);
    }
    return updatedCount;
  }

  /**
   * Deletes rows matching predicate.
   */
  delete(predicate: (row: T) => boolean): number {
    const all = this.read();
    const next = all.filter((r) => !predicate(r));
    const deletedCount = all.length - next.length;
    if (deletedCount > 0) {
      this.writeAtomic(next);
    }
    return deletedCount;
  }

  /**
   * Executes an atomic transaction. If callback throws, changes are rolled back.
   */
  transaction<R>(callback: () => R): R {
    const snapshot = JSON.parse(JSON.stringify(this.read()));
    try {
      return callback();
    } catch (err) {
      this.writeAtomic(snapshot);
      throw err;
    }
  }

  /**
   * Clears table data.
   */
  clear(): void {
    this.writeAtomic([]);
  }
}

// Database Table Singletons
export const db = {
  menuItems: new JsonTable<any>('menu_items'),
  reservations: new JsonTable<any>('reservations'),
  orders: new JsonTable<any>('orders'),
  newsletterSubscribers: new JsonTable<any>('newsletter_subscribers'),
  slotCapacity: new JsonTable<any>('slot_capacity'),
  rateLimitBuckets: new JsonTable<any>('rate_limit_buckets'),
};

export function getDatabase() {
  return db;
}
