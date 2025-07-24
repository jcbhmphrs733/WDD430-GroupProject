// Craft card component for displaying individual crafts
import Image from 'next/image';
import Link from 'next/link';
import { Craft } from '@/types';
import { formatDate } from '@/lib/utils';

interface CraftCardProps {
  craft: Craft;
}

export function CraftCard({ craft }: CraftCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={craft.imageUrl}
          alt={craft.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
          {craft.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
          {craft.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>By User {craft.userId}</span>
          <span>{formatDate(craft.createdAt)}</span>
        </div>

        {/* View Link */}
        <Link 
          href={`/crafts/${craft.id}`}
          className="mt-3 inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
