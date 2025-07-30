import { getFeaturedArtpieces } from '@/lib/database';
import { ArtpieceCarousel } from '@/components/artpieces/ArtpieceCarousel';
import { ArtpieceCard } from '@/components/artpieces/ArtpieceCard';
import { Button } from "@/components/ui/Button";

export default async function Home() {
try {
    // Fetch data for the page
    const featuredArtpieces = await getFeaturedArtpieces();

    
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
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Become a Creator
                </Button>
              </div>
            </div>
          </div>

        {/* Featured Art Carousel */}
          <section className="mb-12 sm:mb-16 pl-12 pr-12">
            <ArtpieceCarousel 
              artpieces={featuredArtpieces}
              title="Featured Art"
              className="mb-6 "
            />
          </section>
      </main>
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
