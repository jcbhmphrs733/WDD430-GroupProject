'use client';

import { useState, useEffect } from 'react';
import { ArtpieceWithDetails } from '@/types';
import { LandingCard } from './LandingCard';

interface ArtpieceCarouselProps {
  artpieces: ArtpieceWithDetails[];
  className?: string;
  interval?: number;
}

export function LandingCarousel({ artpieces, className = "", interval = 3000 }: ArtpieceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % artpieces.length);
        }, interval);
        return () => clearInterval(timer);
    }, [artpieces.length, interval]);

    if (artpieces.length === 0) {
        return (
        <div className={`text-center py-8 ${className}`}>
            <p className="text-gray-500">No artpieces found</p>
        </div>
        );
    }

    return (
        <div className={`relative ${className} `}>

            {/* Carousel Container with External Navigation */}
            <div className="flex items-center">
            
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
                        <LandingCard artpiece={artpiece} />
                        </div>
                    ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
