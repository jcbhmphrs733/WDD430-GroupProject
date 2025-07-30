'use client';

import { ArtpieceWithDetails } from '@/types';
import { ArtpieceCard } from './ArtpieceCard'

interface ArtpieceGridProps {
    artpieces: ArtpieceWithDetails[];
    title?: string;
    className?: string;
}

export function ArtpieceGrid({
    artpieces,
    title='All Artpieces',
    className='',
}: ArtpieceGridProps) {
    if (artpieces.length === 0) {
        return (
            <div className={`text-center py-8 ${className}`}>
                <p className="text-gray-500">No artpieces found</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-2 sm:px-0">
                {artpieces.map((artpiece) => (
                    <ArtpieceCard key={artpiece.id} artpiece={artpiece} />
                ))}
            </div>
        </div>
    )
}