'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArtpieceCard } from './ArtpieceCard';
import { fetchArtpiecesByCategory } from './actions';

interface CategoryArtpieceGridProps {
  categoryName: string;
}

type SortOption = 'none' | 'price-asc' | 'price-desc';

export function CategoryArtpieceGrid({ categoryName }: CategoryArtpieceGridProps) {
  const [artpieces, setArtpieces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [sortedArtpieces, setSortedArtpieces] = useState<any[]>([]);

  // Fetch artpieces on component mount
  useEffect(() => {
    const fetchArtpieces = async () => {
      try {
        setLoading(true);
        const result = await fetchArtpiecesByCategory(categoryName);
        
        if (result.success) {
          setArtpieces(result.data || []);
          setSortedArtpieces(result.data || []);
        } else {
          setError(result.error || 'Failed to load artpieces');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load artpieces');
      } finally {
        setLoading(false);
      }
    };

    fetchArtpieces();
  }, [categoryName]);

  // Handle checkbox changes - only one can be selected at a time
  const handleSortChange = (option: SortOption) => {
    setSortOption(prev => prev === option ? 'none' : option);
  };

  // Sort artpieces whenever sort option changes
  useEffect(() => {
    if (artpieces.length === 0) return;
    
    let sorted = [...artpieces];
    
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }
    // If sortOption is 'none', keep original order
    
    setSortedArtpieces(sorted);
  }, [sortOption, artpieces]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading artpieces...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center py-8 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600">Error: {error}</p>
          <Link href="/discover" className="text-blue-600 hover:underline mt-2 block">Back to Discover</Link>
        </div>
      </div>
    );
  }

  if (!artpieces || artpieces.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center py-8 bg-background-200 rounded-lg border border-background-300">
          <p className="text-gray-600">No artpieces found in this category.</p>
          <Link href="/discover" className="text-blue-600 hover:underline mt-2 block">Back to Discover</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Artpieces in "{categoryName}" Category
      </h2>
      
      {/* Filter Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Sort by Price:</h3>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sortOption === 'price-asc'}
              onChange={() => handleSortChange('price-asc')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Price Ascending (Low to High)</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sortOption === 'price-desc'}
              onChange={() => handleSortChange('price-desc')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Price Descending (High to Low)</span>
          </label>
        </div>
        
        {sortOption !== 'none' && (
          <div className="mt-2 text-xs text-gray-500">
            Showing {sortedArtpieces.length} artpieces sorted by {
              sortOption === 'price-asc' ? 'price (low to high)' : 'price (high to low)'
            }
          </div>
        )}
      </div>

      {/* Artpieces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedArtpieces.map((artpiece: any) => (
          <ArtpieceCard key={artpiece.id} artpiece={artpiece} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/discover" className="text-blue-600 hover:underline">← Back to Discover Categories</Link>
      </div>
    </div>
  );
}
