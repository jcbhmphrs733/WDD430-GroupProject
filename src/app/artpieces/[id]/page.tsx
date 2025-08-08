import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtpieceById, getArtpieceReviews, incrementArtpieceViews } from '@/lib/database';
import { ReviewSection } from '@/components/reviews/ReviewSection';
import { getCurrentUser } from '@/lib/session';

interface ArtpiecePageProps {
  params: {
    id: string;
  };
}

export default async function ArtpiecePage({ params }: ArtpiecePageProps) {
  try {
    // Await params first
    const { id } = await params;
    
    const [artpiece, reviews] = await Promise.all([
      getArtpieceById(id),
      getArtpieceReviews(id)
    ]);

    if (!artpiece) {
      notFound();
    }
    let loggedIn = false;
    const currentUser = await getCurrentUser();

    if (currentUser && String(currentUser.id) === String(artpiece.creator_id)) {
      loggedIn = true;
    }

    // Increment view count (don't await to avoid blocking page load)
    incrementArtpieceViews(id).catch(console.error);

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
            <span className="text-gray-900">{artpiece.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hero Image Section */}
            <div className="order-1">
              <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg border border-background-300">
                <Image
                  src={artpiece.hero_image_url}
                  alt={artpiece.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/*Create button */}
              <div className="flex mt-6 justify-center">
                {!loggedIn ? (
                  <></>
                ) : (
                <button className="w-1/2 lg:w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  <Link 
                    href={`/artpieces/${artpiece.id}/edit`}>Edit
                  </Link>
                  {/*update href when fullsite available */}
                </button>
                )} 
              </div>
            </div>

            {/* Details Section */}
            <div className="order-2 space-y-6">
              {/* Title and Creator */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  {artpiece.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <Link 
                    href={`/profile/${artpiece.creator_id}`}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  >
                    {artpiece.creator_profile_image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={artpiece.creator_profile_image}
                          alt={artpiece.creator_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-medium text-gray-800 hover:text-gray-900">
                        by {artpiece.creator_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        @{artpiece.creator_username}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Price and Category */}
              <div className="border-t border-b border-background-300 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${artpiece.price}
                  </span>
                  <span className="bg-background-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium border border-background-400">
                    {artpiece.category_name}
                  </span>
                </div>
                {/* Rating Display */}
                {artpiece.review_count > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(artpiece.average_rating)
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
                      {artpiece.average_rating.toFixed(1)} ({artpiece.review_count} review{artpiece.review_count !== 1 ? 's' : ''})
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {artpiece.description}
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-background-200 rounded-lg p-4 border border-background-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Views:</span>
                    <span className="ml-2 font-medium">{artpiece.view_count}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Favorites:</span>
                    <span className="ml-2 font-medium">{artpiece.favorite_count}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Listed:</span>
                    <span className="ml-2 font-medium">
                      {new Date(artpiece.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Updated:</span>
                    <span className="ml-2 font-medium">
                      {new Date(artpiece.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Contact Creator
                </button>
                <button className="flex-1 bg-background-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-background-400 transition-colors border border-background-400">
                  Add to Favorites ♡
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <ReviewSection 
              artpieceId={id} 
              reviews={reviews}
              artpieceTitle={artpiece.title}
            />
          </div>

        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading artpiece:', error);
    notFound();
  }
}
