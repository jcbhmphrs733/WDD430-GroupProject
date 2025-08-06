'use client';

import { CreatorCard } from './CreatorCard';
import { Creator } from '@/types';

interface CreatorGridProps {
    creators: Creator[];
    title?: string;
    className?: string;
}

export function CreatorGrid({
    creators,
    title='All Creators',
    className='',
}: CreatorGridProps) {
    if (creators.length === 0) {
        return (
            <div className={`text-center py-8 ${className}`}>
                <p className="text-gray-500">No creators found</p>
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 px-2 pb-4 sm:px-0 text-center">
                {title}
            </h2>

            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 px-2 sm:px-0">
                {creators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                ))}
            </div>
        </div>
    )
}