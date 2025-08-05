'use server';
import { redirect } from 'next/navigation';
import { loginUser } from '@/lib/auth';
import { signJwt } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function handleLogin(formData: FormData) {
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    const user = await loginUser(email, password);

    if(!user) {
        redirect('/login?error=invalid_credentials');
    }

    const token = signJwt({ id: user.id, email: user.email }, '7d');

    (await cookies()).set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    redirect(`/profile/${user.id}`);
}

export async function handleLogout() {
    (await cookies()).delete('token');
    redirect('/');
}