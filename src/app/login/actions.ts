'use server';
import { redirect } from 'next/navigation';
import { loginUser } from '@/lib/auth';

export async function handleLogin(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await loginUser(email, password);

    if(!user) {
        redirect('/login')
    }

    redirect(`/profile/${user.id}`);
}