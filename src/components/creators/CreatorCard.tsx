'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Creator } from '@/types';
import { getProfileImageUrl, getUserAvatarColor } from '@/lib/utils';

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  const [imageError, setImageError] = useState(false);
  const fullName = `${creator.first_name} ${creator.last_name}`;
  const artpiecesCount = creator.artpieces_count || 0;
  const avgRating = Number(creator.average_rating) || 0;
  const totalFavorites = creator.total_favorites || 0;
  const totalViews = creator.total_views || 0;
  const profileImageSrc = getProfileImageUrl(creator.profile_image_url);
  const isDefaultImage = profileImageSrc === '/images/user-profile-pics/default.jpg';
  const avatarColor = getUserAvatarColor(creator.id);

  return (
    <Link 
      href={`/profile/${creator.id}`}
      className="block bg-white rounded-lg p-6 border border-background-300 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {!imageError ? (
              isDefaultImage ? (
                // Use regular img tag for default image to avoid Next.js optimization issues
                <img
                  src={profileImageSrc}
                  alt={fullName}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Image
                  src={profileImageSrc}
                  alt={fullName}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              )
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: avatarColor }}
              >
                <span className="text-white font-medium text-lg drop-shadow-sm">
                  {creator.first_name?.[0]?.toUpperCase() || creator.username?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
          </div>
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
            {totalViews > 0 && (
              <span>{totalViews} view{totalViews !== 1 ? 's' : ''}</span>
            )}
            {totalFavorites > 0 && (
              <span className="flex items-center">
                <svg className="w-3 h-3 text-red-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {totalFavorites}
              </span>
            )}
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
