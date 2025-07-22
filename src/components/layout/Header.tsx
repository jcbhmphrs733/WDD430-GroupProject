// Header component for Handcrafted Haven
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="bg-cream dark:bg-dark-900 shadow-sm border-b border-dark-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Handcrafted Haven"
                width={120}
                height={32}
                className="dark:invert"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/explore" 
              className="text-dark-700 dark:text-cream hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Explore
            </Link>
            <Link 
              href="/categories" 
              className="text-dark-700 dark:text-cream hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Categories
            </Link>
            <Link 
              href="/create" 
              className="text-dark-700 dark:text-cream hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
            >
              Create
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
