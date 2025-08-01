import { getArtpiecesbyUser, getUserById } from '@/lib/database';
import { ArtpieceGrid } from '@/components/artpieces/ArtpieceGrid';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProfilePage({ params }: { params: { id: string } }) {
    try {
      const p = await params
      const id = p.id

      const [user, userArtpieces] = await Promise.all([
          getUserById(id),
          getArtpiecesbyUser(id)
      ]);

      const shuffledArtpieces = [...userArtpieces].sort(() => Math.random() - 0.5);
      const profileImage = user.profile_image_url || "/logo-small.png";

      return (
          <div className="min-h-screen">
              <div className=" mx-auto px-2 sm:px-4 pt-6 sm:pt-8">
                  {/* User Image & Name */}
                  <div className="flex items-center gap-4 text-left mb-8 sm:mb-12 pb-0">
                      <Image 
                      src={profileImage}
                      width={100}
                      height={150}
                      className="hidden md:block px-2"
                      alt="Creator Image" />
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 ">{user.first_name} {user.last_name}</h1>
                  </div>

                  {/* about me */}
                  <div>
                      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">{user.bio}</p>
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