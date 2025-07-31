import { handleLogin } from './actions';
import { Button } from '@/components/ui/Button';
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto mt-12 p-6 border rounded-md shadow-sm bg-white">
            <h1 className="text-2xl font-bold mb-4">Log In</h1>
            <form action={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="emal" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 w-full px-3 py-2 border border gray-300 rounded-md shadow-sm"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                <Button type="submit" className="w-full">
                    Login
                </Button>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}