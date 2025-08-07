'use server';

import { getArtpiecesByCategory } from '@/lib/database';

export async function fetchArtpiecesByCategory(categoryName: string) {
  try {
    const artpieces = await getArtpiecesByCategory(categoryName);
    return {
      success: true,
      data: artpieces || []
    };
  } catch (error) {
    console.error('Server Action Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch artpieces'
    };
  }
}
