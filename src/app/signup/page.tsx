'use server';

import { SignupForm } from '@/components/forms/SignupForm';
import Link from 'next/link'

export default async function SignupPage() {
    return (
        <div className="min-h-screen bg-background-100">
            <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Create Account
                </h1>
                
                <div className="bg-white rounded-lg shadow-sm border border-background-300 p-6">
                    <SignupForm />
                </div>
                
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="text-gray-900 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}