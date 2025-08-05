'use client';

import { useState } from 'react';
import { SearchForm } from '@/components/forms/SearchForm';
import { ArtpieceCard } from '@/components/artpieces/ArtpieceCard';
import { CreatorCard } from '@/components/creators/CreatorCard';
import { searchArtpiecesAction } from './actions';

export default function ExplorePage() {
  const [searchResults, setSearchResults] = useState<{artpieces: any[], creators: any[]}>({
    artpieces: [],
    creators: []
  });
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      const result = await searchArtpiecesAction(query);
      if (result.success) {
        setSearchResults({
          artpieces: result.artpieces || [],
          creators: result.creators || []
        });
      } else {
        console.error('Search error:', result.error);
        setSearchResults({ artpieces: [], creators: [] });
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({ artpieces: [], creators: [] });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-100">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
        
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Explore Artpieces
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Search and discover amazing handcrafted pieces from talented artisans.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchForm 
            onSearch={handleSearch}
            placeholder="Search for artpieces, categories, or creators..."
          />
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {isSearching && (
            <div className="text-center py-8">
              <p className="text-gray-600">Searching...</p>
            </div>
          )}
          
          {!isSearching && hasSearched && searchResults.artpieces.length === 0 && searchResults.creators.length === 0 && (
            <div className="text-center py-8 bg-background-200 rounded-lg border border-background-300">
              <p className="text-gray-600">No artpieces or creators found. Try a different search term.</p>
            </div>
          )}
          
          {!isSearching && (searchResults.artpieces.length > 0 || searchResults.creators.length > 0) && (
            <div className="space-y-8">
              {/* Artpieces Results */}
              {searchResults.artpieces.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Artpieces ({searchResults.artpieces.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {searchResults.artpieces.map((artpiece) => (
                      <ArtpieceCard key={artpiece.id} artpiece={artpiece} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Creators Results */}
              {searchResults.creators.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Creators ({searchResults.creators.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {searchResults.creators.map((creator) => (
                      <CreatorCard key={creator.id} creator={creator} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {!hasSearched && (
            <div className="text-center py-8 bg-background-200 rounded-lg border border-background-300">
              <p className="text-gray-600">Start typing to search for artpieces, categories, or creators.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
