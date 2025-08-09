'use server';

import { revalidatePath } from 'next/cache';
import { addToFavorites, removeFromFavorites } from '@/lib/database';
import { getCurrentUser } from '@/lib/session';

export async function toggleFavorite(artpieceId: string, currentlyFavorited: boolean) {
  try {
    // Get the current user
    const user = await getCurrentUser();
    
    if (!user || !user.id) {
      throw new Error('You must be logged in to manage favorites');
    }

    const userId = user.id.toString();

    // Add or remove favorite based on current status
    if (currentlyFavorited) {
      await removeFromFavorites(userId, artpieceId);
    } else {
      await addToFavorites(userId, artpieceId);
    }

    // Revalidate the artpiece page to update the favorite status
    revalidatePath(`/artpieces/${artpieceId}`);
    
    // Return success response
    return { 
      success: true, 
      favorited: !currentlyFavorited,
      message: currentlyFavorited ? 'Removed from favorites' : 'Added to favorites'
    };

  } catch (error) {
    console.error('Error toggling favorite:', error);
    
    // Return error response
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to update favorites'
    };
  }
}

export async function addFavorite(formData: FormData) {
  const artpieceId = formData.get('artpieceId')?.toString();
  
  if (!artpieceId) {
    throw new Error('Artpiece ID is required');
  }

  const result = await toggleFavorite(artpieceId, false);
  
  if (!result.success) {
    throw new Error(result.message);
  }
}

export async function removeFavorite(formData: FormData) {
  const artpieceId = formData.get('artpieceId')?.toString();
  
  if (!artpieceId) {
    throw new Error('Artpiece ID is required');
  }

  const result = await toggleFavorite(artpieceId, true);
  
  if (!result.success) {
    throw new Error(result.message);
  }
}
