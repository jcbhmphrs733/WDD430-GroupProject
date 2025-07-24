// Grid component for displaying multiple crafts
import { Craft } from '@/types';
import { CraftCard } from './CraftCard';

interface CraftGridProps {
  crafts: Craft[];
  loading?: boolean;
}

export function CraftGrid({ crafts, loading = false }: CraftGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (crafts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No crafts found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to share your creative work!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {crafts.map((craft) => (
        <CraftCard key={craft.id} craft={craft} />
      ))}
    </div>
  );
}
