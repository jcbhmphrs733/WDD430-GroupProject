import Link from 'next/link';
import Image from 'next/image';

interface Creator {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_image_url?: string;
  artpieces_count?: number;
  average_rating?: number | string | null;
  total_reviews?: number;
}

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const fullName = `${creator.first_name} ${creator.last_name}`;
  const artpiecesCount = creator.artpieces_count || 0;
  const avgRating = typeof creator.average_rating === 'number' ? creator.average_rating : parseFloat(creator.average_rating || '0') || 0;

  return (
    <Link 
      href={`/profile/${creator.id}`}
      className="block bg-white rounded-lg p-6 border border-background-300 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {creator.profile_image_url ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={creator.profile_image_url}
                alt={fullName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-lg">
                {creator.first_name?.[0]?.toUpperCase() || creator.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
        </div>

        {/* Creator Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {fullName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            @{creator.username}
          </p>
          
          {creator.bio && (
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              {creator.bio}
            </p>
          )}
          
          {/* Stats */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{artpiecesCount} artpiece{artpiecesCount !== 1 ? 's' : ''}</span>
            {avgRating > 0 && (
              <span className="flex items-center">
                <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {avgRating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
