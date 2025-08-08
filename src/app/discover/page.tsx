import { getRandomArtpieces, getFeaturedArtpieces, getAllCategories, getAllArtpieces, getAllCreators } from '@/lib/database';
import { ArtpieceCarousel } from '@/components/artpieces/ArtpieceCarousel';
import { CreatorCard } from '@/components/creators/CreatorCard';
import Link from 'next/link';

export default async function DiscoverPage() {
  try {
    // Fetch data for the page
    const [allArtpieces, categories, allCreators] = await Promise.all([
      getAllArtpieces(),
      getAllCategories(),
      getAllCreators()
    ]);

    // Shuffle the artpieces array for random order on each page load
    const shuffledArtpieces = [...allArtpieces].sort(() => Math.random() - 0.5);
    
    // Get a selection of creators to display
    const featuredCreators = allCreators.slice(0, 6);

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
          
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Discover Something New!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
              Explore handcrafted treasures from talented artisans around the world. 
              Find unique pieces that speak to your style and support independent creators.
            </p>
          </div>

          {/* Discover Something New Carousel */}
          <section className="mb-12 sm:mb-16">
            <ArtpieceCarousel 
              artpieces={shuffledArtpieces}
              title="Browse Artpieces"
              className="mb-6 sm:mb-8"
            />
          </section>

          {/* Categories Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">Browse by Category</h2>
            <div className="max-w-3xl mx-auto px-4">
              <div className="overflow-hidden">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-full">
                  {categories.slice(0, 20).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.name.toLowerCase()}`}
                      className="bg-background-200 hover:bg-background-300 rounded-lg p-3 sm:p-4 text-center hover:shadow-lg transition-all duration-200 border border-background-300 border-gray-900"
                    >
                      <h3 className="font-medium text-gray-900 text-xs sm:text-sm">
                        {category.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Featured Creators Grid */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Creators</h2>
              <Link 
                href="/creators"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredCreators.map((creator) => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
            </div>
          </section>

          

        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'Failed to load discover page'}
          </p>
        </div>
      </div>
    );
  }
}
