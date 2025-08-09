'use server';

import { SignupForm } from '@/components/forms/SignupForm';
import Link from 'next/link'

export default async function SignupPage() {
    return (
        <div className="max-w-md mx-auto mt-12">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <SignupForm />
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}