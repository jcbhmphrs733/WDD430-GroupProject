// Artpiece card component for displaying individual artpieces
import ArtpieceFallbackImage from './ArtpieceFallbackImage';
import { ArtpieceWithDetails } from '@/types';

interface ArtpieceCardProps {
  artpiece: ArtpieceWithDetails;
  className?: string;
}

export function LandingCard({ artpiece, className = "" }: ArtpieceCardProps) {
  return (
    <div className={`relative rounded-lg shadow-md overflow-hidden group ${className}`}>
      {/* Full Image Background */}
      <div className="relative h-[400px] sm:h-[480px] lg:h-[520px] xl:h-[600px] w-full">
        <ArtpieceFallbackImage
          src={artpiece.hero_image_url}
          alt={artpiece.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        
      </div>
    </div>
  );
}
