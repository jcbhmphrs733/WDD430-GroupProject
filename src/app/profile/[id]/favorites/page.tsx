import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { getUserById, getUserFavorites } from '@/lib/database';
import { ArtpieceGrid } from '@/components/artpieces/ArtpieceGrid';
import Link from 'next/link';

interface FavoritesPageProps {
  params: {
    id: string;
  };
}

export default async function FavoritesPage({ params }: FavoritesPageProps) {
  try {
    const { id } = await params;
    const currentUser = await getCurrentUser();
    
    // Check if user is logged in
    if (!currentUser) {
      redirect('/login');
    }
    
    // Check if user is trying to view their own favorites
    if (currentUser.id.toString() !== id) {
      redirect(`/profile/${id}`);
    }
    
    const user = await getUserById(id);
    if (!user) {
      notFound();
    }

    // Get user's favorite artpieces
    const favoriteArtpieces = await getUserFavorites(id);

    return (
      <div className="min-h-screen bg-background-100">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/profile/${id}`} className="text-gray-500 hover:text-gray-700">
              Profile
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Favorites</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600">
              Artpieces you've saved to your favorites collection
            </p>
          </div>

          {/* Favorites Grid */}
          {favoriteArtpieces.length > 0 ? (
            <ArtpieceGrid
              artpieces={favoriteArtpieces}
              title=""
              className="mb-6 sm:mb-8"
            />
          ) : (
            <div className="text-center py-12 bg-background-200 rounded-lg border border-background-300">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <svg 
                    className="w-16 h-16 mx-auto text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Favorites Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start exploring artpieces and save your favorites to see them here.
                </p>
                <Link
                  href="/discover"
                  className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Discover Artpieces
                </Link>
              </div>
            </div>
          )}

          {/* Back to Profile Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/profile/${id}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading favorites page:', error);
    notFound();
  }
}
