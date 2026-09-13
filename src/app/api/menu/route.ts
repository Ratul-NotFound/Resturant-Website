import { NextRequest, NextResponse } from 'next/server';
import { MenuRepository } from '@/lib/server/repositories/MenuRepository';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';
import { TrieSearch } from '@/lib/dsa/Trie';

let serverTrie: TrieSearch | null = null;

function getServerTrie(): TrieSearch {
  if (!serverTrie) {
    serverTrie = new TrieSearch();
    const items = MenuRepository.getAllForIndexing();
    for (const item of items) {
      const tokens = item.searchTokens.toLowerCase().split(/\s+/);
      for (const token of tokens) {
        if (token.length >= 2) {
          serverTrie.insert(token, item.id);
        }
      }
    }
  }
  return serverTrie;
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'menu_api');
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rate.resetInSeconds) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawSearch = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const dietary = searchParams.get('dietary') || '';
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '9999');

  const cleanSearch = ServerSanitizer.sanitizeQueryParam(rawSearch, 60);

  let items = MenuRepository.getAllItems();

  // Apply Trie search if query present
  if (cleanSearch.length >= 2) {
    const trie = getServerTrie();
    const matchIds = trie.searchQuery(cleanSearch);
    items = items.filter((item) => matchIds.has(item.id));
  }

  // Filter category
  if (category && category !== 'all') {
    items = items.filter((item) => item.category === category);
  }

  // Filter dietary
  if (dietary && dietary !== 'all') {
    items = items.filter((item) => item.dietary.includes(dietary as any));
  }

  // Filter price range
  if (!isNaN(minPrice) && minPrice > 0) {
    items = items.filter((item) => item.price >= minPrice);
  }
  if (!isNaN(maxPrice) && maxPrice < 9999) {
    items = items.filter((item) => item.price <= maxPrice);
  }

  return NextResponse.json({
    success: true,
    count: items.length,
    items,
  });
}
