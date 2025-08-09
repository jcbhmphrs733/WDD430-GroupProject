import { cookies } from 'next/headers';
import { verifyJwt } from './jwt';
import { getUserById } from './database';

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

// Get full user details including name for display purposes
export async function getCurrentUserDetails() {
    const user = await getCurrentUser();
    if (!user) return null;
    
    try {
        const fullUser = await getUserById(user.id.toString());
        return fullUser;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
}