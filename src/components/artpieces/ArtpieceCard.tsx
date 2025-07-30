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
      <div className="relative h-[250px] sm:h-[300px] lg:h-[320px] xl:h-[350px] w-full">
        <Image
          src={artpiece.hero_image_url}
          alt={artpiece.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        
        {/* Info Overlay */}
        <div className="absolute inset-0 bg-background-100 bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
          <div>
            <h3 className="text-base font-bold text-gray-800 mb-1">{artpiece.title}</h3>
            <p className="text-xs text-gray-600 mb-1">by {artpiece.creator_name}</p>
            <p className="text-xs text-gray-600 mb-2">{artpiece.category_name}</p>
            <p className="text-xs text-gray-700 line-clamp-2">{artpiece.description}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">${artpiece.price}</span>
            <Link 
              href={`/artpieces/${artpiece.id}`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
