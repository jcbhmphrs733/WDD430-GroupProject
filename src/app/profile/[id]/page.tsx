import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtpiecesbyUser, getUserById } from '@/lib/database';
import { getUserAvatarColor } from '@/lib/utils';
import { ArtpieceGrid } from '@/components/artpieces/ArtpieceGrid';
import FallbackImage from '@/components/profile/fallbackimage';
import { getCurrentUser } from '@/lib/session';
import { DeleteAccountButton } from '@/components/profile/DeleteAccountButton';

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    deleted?: string;
  }>;
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  try {
    // Await params and searchParams first
    const { id } = await params;
    const { deleted } = await searchParams;

    // Get current logged-in user and profile user data
    const [currentUser, user, userArtpieces] = await Promise.all([
      getCurrentUser(),
      getUserById(id),
      getArtpiecesbyUser(id)
    ]);

    if (!user) {
      notFound();
    }

    // Check if the current user is viewing their own profile
    const isOwnProfile = currentUser && currentUser.id.toString() === id;

    const shuffledArtpieces = [...userArtpieces].sort(() => Math.random() - 0.5);
    const fullName = `${user.first_name} ${user.last_name}`;
    const avatarColor = getUserAvatarColor(user.id);
    
    // Calculate user stats
    const totalArtpieces = userArtpieces.length;
    const totalViews = userArtpieces.reduce((sum, art) => sum + (art.view_count || 0), 0);
    const totalFavorites = userArtpieces.reduce((sum, art) => sum + (art.favorite_count || 0), 0);
    
    // Calculate average rating only from artpieces that have reviews
    const artpiecesWithReviews = userArtpieces.filter(art => (art.review_count || 0) > 0);
    const averageRating = artpiecesWithReviews.length > 0 
      ? artpiecesWithReviews.reduce((sum, art) => sum + (art.average_rating || 0), 0) / artpiecesWithReviews.length 
      : 0;

    return (
      <div className="min-h-screen bg-background-100">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/discover" className="text-gray-500 hover:text-gray-700">
              Discover
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{fullName}</span>
          </nav>

          {/* Success Message for Deleted Artpiece */}
          {deleted === 'true' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Artpiece deleted successfully!</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Profile Image Section */}
            <div className="order-1 lg:col-span-1 row-start-1 row-end-2">
              <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden shadow-lg border border-background-300 bg-gray-100">
                {user.profile_image_url ? (
                  <FallbackImage
                    src={user.profile_image_url}
                    alt={fullName}
                    fill
                    className="object-cover"
                    sizes="192px"
                    priority
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: avatarColor }}
                  >
                    <span className="text-white text-6xl font-bold drop-shadow-lg">
                      {user.first_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Details Section */}
            <div className="order-2 lg:col-span-2 space-y-6">
              {/* Name and Username */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {fullName}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <p className="text-lg text-gray-600">
                    @{user.username}
                  </p>
                  <span className="bg-background-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium border border-background-400">
                    Creator
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-b border-background-300 py-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="block text-2xl font-bold text-gray-900">
                      {totalArtpieces}
                    </span>
                    <span className="text-sm text-gray-600">
                      Artpiece{totalArtpieces !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-gray-900">
                      {totalViews.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      Total Views
                    </span>
                  </div>
                </div>
                
                {/* Rating Display */}
                {totalArtpieces > 0 && averageRating > 0 && (
                  <div className="flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-background-200">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(averageRating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {averageRating.toFixed(1)} average rating
                    </span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-background-200 rounded-lg p-4 border border-background-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Creator Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Favorites:</span>
                    <span className="ml-2 font-medium">{totalFavorites}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Member Since:</span>
                    <span className="ml-2 font-medium">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isOwnProfile ? (
                  // Show Edit Profile, Create Artwork, and View Favorites buttons for own profile
                  <>
                    <Link 
                      href={`/profile/${id}/edit`}
                      className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center flex items-center justify-center"
                    >
                      Edit Profile
                    </Link>
                    <Link 
                      href={`/profile/${id}/create`}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
                    >
                      Create Artwork
                    </Link>
                    <Link 
                      href={`/profile/${id}/favorites`}
                      className="flex-1 bg-background-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-background-400 transition-colors border border-background-400 text-center"
                    >
                      View Favorites
                    </Link>
                  </>
                ) : (
                  // Show only Contact Creator button for other profiles
                  <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Contact Creator
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Artpieces Section */}
          {totalArtpieces > 0 && (
            <div className="mt-12">
              <ArtpieceGrid
                artpieces={shuffledArtpieces}
                title={`Artpieces by ${fullName}`}
                className="mb-6 sm:mb-8"
              />
            </div>
          )}

          {totalArtpieces === 0 && (
            <div className="mt-12 text-center py-12 bg-background-200 rounded-lg border border-background-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Artpieces Yet
              </h3>
              <p className="text-gray-600">
                {fullName} hasn&apos;t created any artpieces yet.
              </p>
            </div>
          )}

          {/* Delete Account Section - Only for own profile */}
          {isOwnProfile && (
            <div className="mt-12">
              <DeleteAccountButton 
                userId={id} 
                userFullName={fullName}
              />
              
                <p className="text-sm text-red-600 mb-3" style={{ marginTop: '20px' }}>
                Once you delete your account, there is no going back. This will permanently delete your account, all your artpieces, reviews, and associated data.
                </p>
            </div>
          )}

        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading profile:', error);
    notFound();
  }
}