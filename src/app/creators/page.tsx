import { CreatorGrid } from '@/components/creators/CreatorsGrid';
import { getAllCreators } from '@/lib/database';

export default async function CreatorsPage() {
  try {
    // Fetch all creators
    const allCreators = await getAllCreators();

    return (
      <main className="min-h-screen bg-background-100 py-8">
        <div className="container mx-auto px-4">
          <CreatorGrid 
            creators={allCreators} 
            title="All Creators"
          />
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600">
              {error instanceof Error ? error.message : 'Failed to load creators'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
