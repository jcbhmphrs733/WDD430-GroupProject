'use server';

import { searchArtpieces, searchCreators } from '@/lib/database';

export async function searchArtpiecesAction(query: string) {
  try {
    if (!query.trim()) {
      return { success: true, artpieces: [], creators: [] };
    }
    
    const [artpieces, creators] = await Promise.all([
      searchArtpieces(query),
      searchCreators(query)
    ]);
    
    return { 
      success: true, 
      artpieces: artpieces || [], 
      creators: creators || [] 
    };
  } catch (error) {
    console.error('Search error:', error);
    return { success: false, error: 'Failed to search' };
  }
}
