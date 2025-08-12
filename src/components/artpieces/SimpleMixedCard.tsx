import Image from 'next/image';
import ArtpieceFallbackImage from './ArtpieceFallbackImage';
import { ArtpieceWithDetails, Creator } from '@/types';
import { getUserAvatarColor } from '@/lib/utils';

interface MixedContentItem {
  type: 'artpiece' | 'creator';
  data: ArtpieceWithDetails | Creator;
}

interface SimpleMixedCardProps {
  item: MixedContentItem;
  className?: string;
}

export function SimpleMixedCard({ item, className = "" }: SimpleMixedCardProps) {
  if (item.type === 'artpiece') {
    const artpiece = item.data as ArtpieceWithDetails;
    return (
      <div className={`relative rounded-lg shadow-md overflow-hidden border border-background-300 ${className}`}>
        <div className="relative h-[180px] sm:h-[220px] lg:h-[240px] xl:h-[260px] w-full">
          <ArtpieceFallbackImage
            src={artpiece.hero_image_url}
            alt={artpiece.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            priority
          />
        </div>
      </div>
    );
  } else {
    const creator = item.data as Creator;
    const fullName = `${creator.first_name} ${creator.last_name}`;
    const creatorAvatarColor = getUserAvatarColor(creator.id);
    
    return (
      <div className={`relative rounded-lg shadow-md overflow-hidden border border-background-300 bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
        <div className="relative h-[180px] sm:h-[220px] lg:h-[240px] xl:h-[260px] w-full flex flex-col items-center justify-center p-4">
          {/* Creator Profile Image */}
          <div className="relative w-12 h-12 mb-2">
            <div className="w-full h-full rounded-full overflow-hidden">
              {creator.profile_image_url ? (
                <Image
                  src={creator.profile_image_url}
                  alt={fullName}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: creatorAvatarColor }}
                >
                  <span className="text-white text-xs font-bold drop-shadow-sm">
                    {creator.first_name?.[0]?.toUpperCase() || creator.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Creator Info */}
          <div className="text-center flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
              {fullName}
            </h3>
            <p className="text-xs text-gray-600 mb-2">
              @{creator.username}
            </p>
            
            {/* Bio */}
            {creator.bio && (
              <p className="text-xs text-gray-500 mb-2 line-clamp-2 px-1">
                {creator.bio}
              </p>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-500 mb-1">
              <div className="text-center">
                <div className="font-medium text-gray-700">{creator.artpieces_count || 0}</div>
                <div>artpieces</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-700">{creator.total_views || 0}</div>
                <div>views</div>
              </div>
            </div>
            
            {/* Rating and Favorites */}
            <div className="flex justify-center items-center gap-3 text-xs text-gray-500">
              {creator.average_rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{Number(creator.average_rating).toFixed(1)}</span>
                </div>
              )}
              {creator.total_favorites > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-red-500">♥</span>
                  <span>{creator.total_favorites}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
