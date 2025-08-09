import { submitReviewAndRedirect } from '@/app/actions/reviews';

interface ReviewFormServerProps {
  artpieceId: string;
  artpieceTitle: string;
}

export function ReviewFormServer({ artpieceId, artpieceTitle }: ReviewFormServerProps) {
  return (
    <div className="bg-background-200 rounded-lg p-6 border border-background-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Write a Review for &quot;{artpieceTitle}&quot;
      </h3>
      
      <form action={submitReviewAndRedirect} className="space-y-4">
        {/* Hidden field for artpiece ID */}
        <input type="hidden" name="artpieceId" value={artpieceId} />
        
        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  defaultChecked={star === 5}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <svg 
                    className="w-6 h-6 text-yellow-400 cursor-pointer hover:text-yellow-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm">{star}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Comment (Optional)
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            className="w-full px-3 py-2 border border-background-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            placeholder="Share your thoughts about this artpiece..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
