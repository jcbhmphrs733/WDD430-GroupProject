import { getRandomArtpieces, getFeaturedArtpieces, getAllCategories, getAllArtpieces, getArtpiecesbyUser, getUserById } from '@/lib/database';
import { ArtpieceGrid } from '@/components/artpieces/ArtpieceGrid';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProfilePage(props: {params: Promise<{id: string}>}) {
    try {
        const params = await props.params;
        const id = params.id;      

        const [userArtpieces] = await Promise.all([
            getAllArtpieces()
            // getUserById(id),
            // getArtpiecesbyUser(id)
        ]);

        const shuffledArtpieces = [...userArtpieces].sort(() => Math.random() - 0.5);
        
        return (
            <div className="min-h-screen">
                <div className=" mx-auto px-2 sm:px-4 pt-6 sm:pt-8">
                    {/* User Image & Name */}
                    <div className="flex items-center gap-4 text-left mb-8 sm:mb-12 pb-0">
                        <Image 
                        src="/logo-small.png"
                        width={100}
                        height={150}
                        className="hidden md:block px-2"
                        alt="Creator Image" />
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 ">Addison Welch</h1>
                    </div>

                    {/* about me */}
                    <div>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">I'm a passionate artist and small business owner who creates original, handmade art pieces inspired by nature, emotion, and everyday beauty. Each piece I design is crafted with care, blending creativity and craftsmanship to bring unique charm to any space. I started my shop to share my love for art and to connect with others who appreciate meaningful, one-of-a-kind creations. Whether it's a hand-painted canvas or a mixed-media sculpture, my goal is to spark joy and inspire creativity in others. Thank you for supporting handmade and helping me do what I love every day!</p>
                    </div>
                    {/* Artpieces sample grid */}
                    <div>
                        <section className="mb-12 sm:mb-16 pt-8">
                            <ArtpieceGrid
                            artpieces={shuffledArtpieces}
                            title="My Work"
                            className="mb-6 sm:mb-8"
                            />
                        </section>
                    </div>
                </div>
            </div>
        )
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