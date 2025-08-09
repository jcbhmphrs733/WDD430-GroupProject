'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Review } from '@/types';
import { getUserAvatarColor } from '@/lib/utils';
import { submitReview } from '@/app/actions/reviews';

interface ReviewSectionProps {
  artpieceId: string;
  reviews: Review[];
  artpieceTitle: string;
  isCreator: boolean | null;
  isLoggedIn: boolean;
}

export function ReviewSection({ artpieceId, reviews, artpieceTitle, isCreator, isLoggedIn }: ReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    
    try {
      const formData = new FormData();
      formData.append('artpieceId', artpieceId);
      formData.append('rating', rating.toString());
      formData.append('comment', comment);
      
      const result = await submitReview(formData);
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        // Reset form
        setComment('');
        setRating(5);
        setShowReviewForm(false);
        // Optionally refresh the page to show the new review
        window.location.reload();
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to submit review' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Reviews ({reviews.length})
        </h2>
        {isLoggedIn && !isCreator && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            {showReviewForm ? 'Cancel' : 'Write Review'}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-background-200 rounded-lg p-6 border border-background-300">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Write a Review for "{artpieceTitle}"
          </h3>
          
          {/* Message Display */}
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating} star{rating !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Comment (Optional)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                placeholder="Share your thoughts about this artpiece..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-background-300 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-background-400 transition-colors border border-background-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 bg-background-200 rounded-lg border border-background-300">
            <p className="text-gray-600">No reviews yet. Be the first to review this artpiece!</p>
          </div>
        ) : (
          reviews.map((review) => {
            const reviewerAvatarColor = getUserAvatarColor(review.reviewer_id);
            
            return (
              <div
                key={review.id}
                className="bg-white rounded-lg p-6 border border-background-300 shadow-sm"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      {review.profile_image_url ? (
                        <Image
                          src={review.profile_image_url}
                          alt={review.username || 'User'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: reviewerAvatarColor }}
                        >
                          <span className="text-white text-xs font-bold drop-shadow-sm">
                            {review.first_name?.[0]?.toUpperCase() || review.username?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                      )}
                    </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {review.first_name && review.last_name 
                        ? `${review.first_name} ${review.last_name}`
                        : review.username || 'Anonymous'
                      }
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {/* Rating Display */}
                {review.rating && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating! ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>

              {/* Review Content */}
              {review.comment && (
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
            );
          })
        )}
      </div>
    </div>
  );
}
