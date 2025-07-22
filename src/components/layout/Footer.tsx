// Footer component for Handcrafted Haven
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-background-200 border-t border-background-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <p className="text-text-300 max-w-md">
                            Discover unique handcrafted items and share your own creative works
                            with a community of passionate makers and artisans.
                        </p>
                        <p>
                            Join us in celebrating creativity and craftsmanship.
                        </p>
                        <p className="text-text-300 max-w-md">
                            © 2025 Handcrafted Haven. All rights reserved.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-text-500 mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/explore" className="text-text-300 hover:text-text-500 transition-colors">
                                    Explore Crafts
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-text-300 hover:text-text-500 transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/create" className="text-text-300 hover:text-text-500 transition-colors">
                                    Create & Share
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-text-500 mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-text-300 hover:text-text-500 transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-text-300 hover:text-text-500 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-text-300 hover:text-text-500 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    );
}
