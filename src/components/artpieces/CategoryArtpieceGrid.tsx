import Link from 'next/link';
import { ArtpieceCard } from './ArtpieceCard';
import { getArtpiecesByCategory } from '@/lib/database';

interface CategoryArtpieceGridProps {
  categoryName: string;
}

export async function CategoryArtpieceGrid({ categoryName }: CategoryArtpieceGridProps) {
  // Fetch artpieces for the given category
  const artpieces = await getArtpiecesByCategory(categoryName);

  if (!artpieces || artpieces.length === 0) {
    return (
      <div className="text-center py-8 bg-background-200 rounded-lg border border-background-300">
        <p className="text-gray-600">No artpieces found in this category.</p>
        <Link href="/discover" className="text-blue-600 hover:underline mt-2 block">Back to Discover</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Artpieces in "{categoryName}" Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artpieces.map((artpiece: any) => (
          <ArtpieceCard key={artpiece.id} artpiece={artpiece} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/discover" className="text-blue-600 hover:underline">← Back to Discover Categories</Link>
      </div>
    </div>
  );
}
