// Artpiece card component for displaying individual artpieces
import Image from 'next/image';
import Link from 'next/link';
import { ArtpieceWithDetails } from '@/types';

interface ArtpieceCardProps {
  artpiece: ArtpieceWithDetails;
  className?: string;
}

export function ArtpieceCard({ artpiece, className = "" }: ArtpieceCardProps) {
  return (
    <div className={`relative rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-background-300 group ${className}`}>
      {/* Full Image Background */}
      <div className="relative h-[620px] w-full">
        <Image
          src={artpiece.hero_image_url}
          alt={artpiece.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Hover overlay for View Details button */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            href={`/artpieces/${artpiece.id}`}
            className="bg-background-300 text-black px-6 py-3 rounded-lg font-medium hover:bg-background-400 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            View Details
          </Link>
        </div>

        {/* Semi-transparent Content Overlay - Bottom 25% */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-background-200/85 backdrop-blur-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
              {artpiece.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden">
              {artpiece.description.length > 60 
                ? artpiece.description.substring(0, 60) + '...'
                : artpiece.description
              }
            </p>
            
            {/* Price and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">${artpiece.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-600 ml-1">
                  {artpiece.average_rating.toFixed(1)} ({artpiece.review_count})
                </span>
              </div>
            </div>
          </div>

          {/* Creator info at bottom */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>by {artpiece.creator_name}</span>
            <span className="bg-background-300/90 px-2 py-1 rounded text-xs border border-background-400">
              {artpiece.category_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
