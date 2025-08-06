'use server';

import { signup } from '../actions/signup'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default async function SignupPage() {
    return (
        <div className="max-w-md mx-auto mt-12">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form action={signup} className="space-y-4">
                <input name="email" placeholder="Email" required className="w-full border px-3 py-2" />
                <input name="username" placeholder="Username" required className="w-full border px-3 py-2" />
                <input name="first_name" placeholder="First Name" required className="w-full border px-3 py-2" />
                <input name="last_name" placeholder="Last Name" required className="w-full border px-3 py-2" />
                <input name="password" placeholder="Password" type="password" required className="w-full border px-3 py-2" />
                <textarea name="bio" placeholder="Bio" className="w-full border px-3 py-2" />
                <input name="profile_image_url" placeholder="Profile Image URL" className="w-full border px-3 py-2" />
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}