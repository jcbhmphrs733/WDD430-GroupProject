import { getRandomArtpieces, getFeaturedArtpieces, getAllCategories, getAllArtpieces } from '@/lib/database';
import { ArtpieceCarousel } from '@/components/artpieces/ArtpieceCarousel';
import { ArtpieceCard } from '@/components/artpieces/ArtpieceCard';
import Link from 'next/link';

export default async function DiscoverPage() {
  try {
    // Fetch data for the page
    const [allArtpieces, categories] = await Promise.all([
      getAllArtpieces(),
      getAllCategories()
    ]);

    // Shuffle the artpieces array for random order on each page load
    const shuffledArtpieces = [...allArtpieces].sort(() => Math.random() - 0.5);

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
          
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Discover Amazing Artpieces
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
              title="Discover Something New"
              className="mb-6 sm:mb-8"
            />
          </section>

          {/* Categories Section */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">Browse by Category</h2>
            <div className="max-w-3xl mx-auto px-4">
              <div className="overflow-hidden">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-full">
                  {categories.slice(0, 13).map((category) => (
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

          {/* Recent Artpieces Grid */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">More to Explore</h2>
              <Link 
                href="/artpieces"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allArtpieces.slice(0, 8).map((artpiece) => (
                <ArtpieceCard key={artpiece.id} artpiece={artpiece} />
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-background-200 rounded-lg p-6 sm:p-8 border border-background-300 mx-2 sm:mx-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Start Creating?
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Join our community of artisans and share your handcrafted creations with the world.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
              <Link
                href="/auth/signup"
                className="bg-background-300 hover:bg-background-700 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors border border-gray-900 border-background-400 text-sm sm:text-base"
              >
                Join as Creator
              </Link>
              <Link
                href="/auth/login"
                className="bg-background-300 hover:bg-background-700 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors border border-gray-900 border-background-400 text-sm sm:text-base"
              >
                Sign In
              </Link>
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
