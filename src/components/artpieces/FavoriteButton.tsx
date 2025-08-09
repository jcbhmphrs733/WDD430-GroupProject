'use client';

import { useState } from 'react';
import { toggleFavorite } from '@/app/actions/favorites';

interface FavoriteButtonProps {
  artpieceId: string;
  initialFavorited: boolean;
  isLoggedIn: boolean;
}

export function FavoriteButton({ artpieceId, initialFavorited, isLoggedIn }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      setMessage({ type: 'error', text: 'Please log in to add favorites' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await toggleFavorite(artpieceId, isFavorited);

      if (result.success) {
        setIsFavorited(result.favorited ?? !isFavorited);
        setMessage({ type: 'success', text: result.message });
        
        // Clear success message after 2 seconds
        setTimeout(() => setMessage(null), 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to update favorites' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className={`flex-1 w-full px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isFavorited
            ? 'bg-red-100 text-red-800 border border-red-300 hover:bg-red-200'
            : 'bg-background-300 text-gray-900 border border-background-400 hover:bg-background-400'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          <>
            {isFavorited ? (
              <>
                <span className="mr-2">♥</span>
                Remove from Favorites
              </>
            ) : (
              <>
                <span className="mr-2">♡</span>
                Add to Favorites
              </>
            )}
          </>
        )}
      </button>
      
      {/* Message Display */}
      {message && (
        <div className={`text-sm p-2 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
