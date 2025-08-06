import { CreatorGrid } from '@/components/creators/CreatorsGrid';
import { getAllCreators } from '@/lib/database';

interface CreatorPageProps {
  params: {
    creator: string;
  };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  try {
    // Fetch all creators
    const allCreators = await getAllCreators();
    
    // Normalize creator name: replace dashes, trim, capitalize each word
    const raw = decodeURIComponent(params.creator.replace(/-/g, ' ')).trim();
    const creatorName = raw
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return (
      <main className="min-h-screen bg-background-100 py-8">
        <CreatorGrid 
          creators={allCreators} 
          title={`Creators - ${creatorName}`}
        />
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background-100 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'Failed to load creators'}
          </p>
        </div>
      </div>
    );
  }
}
