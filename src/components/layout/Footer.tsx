// Footer component for Handcrafted Haven
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-background-600 border-t border-background-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <p className="text-text-600 max-w-md">
                            Discover unique handcrafted items and share your own creative works
                            with a community of passionate makers and artisans.
                        </p>
                        <p>
                            Join us in celebrating creativity and craftsmanship.
                        </p>
                        <p className="text-text-600 max-w-md">
                            © 2025 Handcrafted Haven. All rights reserved.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-text-600 mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/explore" className="text-text-600 hover:text-text-700 transition-colors">
                                    Explore Crafts
                                </Link>
                            </li>
                            <li>
                                <span className="text-text-400">
                                    Categories (Coming Soon)
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-text-600 mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-text-400">
                                    Help Center (Coming Soon)
                                </span>
                            </li>
                            <li>
                                <span className="text-text-400">
                                    Contact Us (Coming Soon)
                                </span>
                            </li>
                            <li>
                                <span className="text-text-400">
                                    Privacy Policy (Coming Soon)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    );
}
