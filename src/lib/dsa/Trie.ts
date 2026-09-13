/**
 * Trie Node representing a character in the prefix tree.
 * Stores a set of document/dish IDs that match the prefix down to this node.
 */
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
  itemIds: Set<string> = new Set();
}

/**
 * Trie Search Engine for fast O(K) prefix matching across menu items.
 * Allows instant search over names, ingredients, tasting notes, and categories.
 */
export class TrieSearch {
  private root: TrieNode = new TrieNode();

  /**
   * Inserts a word token and associates it with a specific item ID.
   */
  insert(word: string, itemId: string): void {
    if (!word || typeof word !== 'string') return;
    const cleanWord = word.toLowerCase().trim();
    if (!cleanWord) return;

    let current = this.root;
    current.itemIds.add(itemId);

    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
      current.itemIds.add(itemId);
    }
    current.isEndOfWord = true;
  }

  /**
   * Searches for all item IDs matching the given prefix.
   * Returns a Set of matching item IDs in O(K) time complexity.
   */
  searchPrefix(prefix: string): Set<string> {
    if (!prefix || typeof prefix !== 'string') return new Set();
    const cleanPrefix = prefix.toLowerCase().trim();
    if (!cleanPrefix) return new Set();

    let current = this.root;
    for (let i = 0; i < cleanPrefix.length; i++) {
      const char = cleanPrefix[i];
      if (!current.children.has(char)) {
        return new Set();
      }
      current = current.children.get(char)!;
    }
    return new Set(current.itemIds);
  }

  /**
   * Multi-token query search (Intersection of all token matches).
   */
  searchQuery(query: string): Set<string> {
    if (!query || typeof query !== 'string') return new Set();
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(t => t.length >= 2);
    if (tokens.length === 0) return new Set();

    let result: Set<string> | null = null;

    for (const token of tokens) {
      const matches = this.searchPrefix(token);
      if (result === null) {
        result = new Set(matches);
      } else {
        // Compute intersection
        const intersection = new Set<string>();
        for (const id of result) {
          if (matches.has(id)) {
            intersection.add(id);
          }
        }
        result = intersection;
      }
      if (result.size === 0) break;
    }

    return result || new Set();
  }

  /**
   * Clears the entire Trie structure.
   */
  clear(): void {
    this.root = new TrieNode();
  }
}
