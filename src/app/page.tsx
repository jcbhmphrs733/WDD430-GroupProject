import { getAllArtpieces, getAllCreators } from '@/lib/database';
import { MixedContentCarousel } from '@/components/artpieces/MixedContentCarousel';
import { Button } from "@/components/ui/Button";
import Link from 'next/link';

export default async function Home() {
  try {
    // Fetch all artpieces and creators for the mixed carousel
    const [allArtpieces, allCreators] = await Promise.all([
      getAllArtpieces(),
      getAllCreators()
    ]);


    return (
      <div >
        <main className="p-16">
          <div className="font-sans flex flex-col items-center justify-center gap-16 sm:p-20">
            <div className="flex flex-col gap-[32px] items-center sm:items-start max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl heading-primary text-text-500 mb-2">
                Welcome to Handcrafted Haven!
              </h1>
              <p className="text-lg sm:text-xl text-text-400 max-w-2xl text-center sm:text-left">
                Explore what others have crafted and share your own creations with our community of passionate makers and artisans.
              </p>

              <div className="text-center flex gap-4 items-center flex-col sm:flex-row">
                <Link href="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Login to Explore
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Join as Creator
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mixed Content Carousel - Artpieces and Creators */}
          <section className="mb-12 sm:mb-16 pl-12 pr-12">
            <MixedContentCarousel
              artpieces={allArtpieces}
              creators={allCreators}
              title="Discover Our Amazing Community"
              className="mb-6"
            />
          </section>
        </main>
        <section className="text-center bg-background-200 rounded-lg p-6 sm:p-8 border border-background-300 mx-2 sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Join our community of artisans and share your handcrafted creations with the world.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
            <Link
              href="/signup"
              className="bg-background-300 hover:bg-background-700 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors border border-gray-900 border-background-400 text-sm sm:text-base"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="bg-background-300 hover:bg-background-700 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors border border-gray-900 border-background-400 text-sm sm:text-base"
            >
              Login
            </Link>
          </div>
        </section>
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
