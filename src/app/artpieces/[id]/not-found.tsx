import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-black-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-black-700 mb-4">
            Artpiece Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the artpiece you're looking for. It may have been removed or the link might be incorrect.
          </p>
          <div className="space-y-3">
            <Link
              href="/discover"
              className="block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse All Artpieces
            </Link>
            <Link
              href="/"
              className="block bg-background-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-background-400 transition-colors border border-background-400"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
