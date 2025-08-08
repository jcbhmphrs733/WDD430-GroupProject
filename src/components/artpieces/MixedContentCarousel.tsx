'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { SimpleMixedCard } from './SimpleMixedCard';
import { ArtpieceWithDetails, Creator } from '@/types';

interface MixedContentItem {
  type: 'artpiece' | 'creator';
  data: ArtpieceWithDetails | Creator;
}

interface MixedContentCarouselProps {
  artpieces: ArtpieceWithDetails[];
  creators: Creator[];
  title?: string;
  className?: string;
}

export function MixedContentCarousel({ artpieces, creators, title = "Discover Our Community", className = "" }: MixedContentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cards to show
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2;      // Mobile: 2 cards
      if (window.innerWidth < 768) return 3;      // Small tablet: 3 cards
      if (window.innerWidth < 1024) return 4;     // Tablet: 4 cards
      return 5;                                   // Desktop: 5 cards
    }
    return 5;
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create stable mixed content array using useMemo
  const mixedContent = useMemo(() => {
    const content: MixedContentItem[] = [];
    
    // Add all artpieces
    artpieces.forEach(artpiece => {
      content.push({ type: 'artpiece', data: artpiece });
    });
    
    // Add all creators
    creators.forEach(creator => {
      content.push({ type: 'creator', data: creator });
    });
    
    // Shuffle the mixed content once
    return content.sort(() => Math.random() - 0.5);
  }, [artpieces, creators]);

  // Create extended array for seamless infinite scrolling
  const extendedContent = useMemo(() => {
    if (mixedContent.length === 0) return [];
    
    // Create extended array: [last items] + [original] + [first items]
    return [
      ...mixedContent.slice(-cardsToShow),
      ...mixedContent,
      ...mixedContent.slice(0, cardsToShow)
    ];
  }, [mixedContent, cardsToShow]);

  // Auto-scroll functionality
  useEffect(() => {
    if (mixedContent.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mixedContent.length]);

  // Handle seamless loop reset
  useEffect(() => {
    if (mixedContent.length === 0) return;

    const maxIndex = mixedContent.length + cardsToShow;
    
    if (currentIndex >= maxIndex) {
      // Reset to the beginning of the real content (after prepended items)
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(cardsToShow);
        // Re-enable transition after a short delay
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500); // Wait for current transition to complete
    }
  }, [currentIndex, mixedContent.length, cardsToShow]);

  // Initialize starting position
  useEffect(() => {
    if (mixedContent.length > 0) {
      setCurrentIndex(cardsToShow); // Start at the beginning of real content
    }
  }, [mixedContent.length, cardsToShow]);

  if (mixedContent.length === 0) {
    return (
      <div className={`${className}`}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          {title}
        </h2>
        <div className="text-center py-8 bg-background-200 rounded-lg border border-background-300">
          <p className="text-gray-600">No content available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        {title}
      </h2>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-linear' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {extendedContent.map((item, index) => (
            <div 
              key={`${item.type}-${item.data.id}-${index}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / cardsToShow}%` }}
            >
              <SimpleMixedCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
