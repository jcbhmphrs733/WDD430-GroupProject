import { cookies } from 'next/headers';
import { verifyJwt } from './jwt';

type UserPayload = {
    id: number;
    email: string;
};

export async function getCurrentUser(): Promise<UserPayload | null> {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;

    const user = verifyJwt<UserPayload>(token);
    return user;
}