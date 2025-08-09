// Header component for Handcrafted Haven
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { getCurrentUser, getCurrentUserDetails } from '@/lib/session';

export async function Header() {
  const user = await getCurrentUser();
  const userDetails = user ? await getCurrentUserDetails() : null;

  return (
    <header className="bg-background-600 border-t border-background-600 p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-small-inverted.png"
                alt="Handcrafted Haven"
                width={90}
                height={90}
                className="dark:invert"
              />
            </Link>
          </div>

          {/* Center section: Navigation */}
          <div className="flex items-center">
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/discover" 
                className="text-text-600 hover:text-text-700 transition-colors font-medium"
              >
                Discover
              </Link>
              <Link 
                href="/explore" 
                className="text-text-600 hover:text-text-700 transition-colors font-medium"
              >
                Explore
              </Link>
              {user && (
                <Link 
                  href={`/profile/${user.id}/create`} 
                  className="text-text-600 hover:text-text-700 transition-colors font-medium"
                >
                  Create
                </Link>
              )}
            </nav>
          </div>

          {/* Right section: Welcome + Actions */}
          <div className="flex items-center space-x-6">
            {/* Welcome Message - Discrete */}
            {userDetails && (
              <div className="hidden xl:block text-xs text-white/70 italic font-light whitespace-nowrap">
                Welcome {userDetails.first_name} {userDetails.last_name}!
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Button variant="secondary" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="secondary" size="sm">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm">
                  <Link href="/logout">Logout</Link>
                </Button>
                <Button variant="secondary" size="sm">
                  <Link href={`/profile/${user.id}`}>Profile</Link>
                </Button>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
