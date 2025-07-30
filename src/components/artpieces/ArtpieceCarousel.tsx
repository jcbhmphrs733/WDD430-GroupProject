'use client';

import { useState, useEffect } from 'react';
import { ArtpieceWithDetails } from '@/types';
import { ArtpieceCard } from './ArtpieceCard';

interface ArtpieceCarouselProps {
  artpieces: ArtpieceWithDetails[];
  title?: string;
  className?: string;
}

export function ArtpieceCarousel({ artpieces, title = "Featured Artpieces", className = "" }: ArtpieceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(2);
      } else if (window.innerWidth < 768) {
        setCardsToShow(3);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(4);
      } else {
        setCardsToShow(5);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Create infinite loop by duplicating artpieces
  const infiniteArtpieces = [
    ...artpieces.slice(-cardsToShow), // Last few artpieces at the beginning
    ...artpieces,                     // Original artpieces
    ...artpieces.slice(0, cardsToShow) // First few artpieces at the end
  ];

  // Adjust starting index to account for duplicated artpieces
  const adjustedIndex = currentIndex + cardsToShow;

  const nextSlide = () => {
    if (!isTransitioning) return;
    
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    
    setCurrentIndex(prev => prev - 1);
  };

  // Handle seamless looping
  useEffect(() => {
    if (currentIndex >= artpieces.length) {
      // We've gone past the end, jump to the beginning without animation
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 300);
      return () => clearTimeout(timer);
    } else if (currentIndex < 0) {
      // We've gone before the beginning, jump to the end without animation
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(artpieces.length - 1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, artpieces.length]);

  // Removed auto-advance carousel for better user control

  if (artpieces.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No artpieces found</p>
      </div>
    );
  }

    return (
      <div className={`relative ${className}`}>
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">{title}</h2>

        {/* Carousel Container with External Navigation */}
        <div className="flex items-center">
          {/* Left Arrow - Outside carousel */}
          {artpieces.length > cardsToShow && (
            <button
              onClick={prevSlide}
              className="flex-shrink-0 mr-4 bg-background-200 shadow-lg rounded-full p-3 hover:bg-background-300 transition-colors border border-background-300"
              aria-label="Previous artpieces"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Carousel Content */}
          <div className="flex-1 overflow-hidden">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-in-out' : ''}`}
              style={{
                transform: `translateX(-${adjustedIndex * (100 / cardsToShow)}%)`,
              }}
            >
              {infiniteArtpieces.map((artpiece, index) => (
                <div 
                  key={`${artpiece.id}-${index}`}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <ArtpieceCard artpiece={artpiece} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow - Outside carousel */}
          {artpieces.length > cardsToShow && (
            <button
              onClick={nextSlide}
              className="flex-shrink-0 ml-4 bg-background-200 shadow-lg rounded-full p-3 hover:bg-background-300 transition-colors border border-background-300"
              aria-label="Next artpieces"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
    </div>
  );
}
