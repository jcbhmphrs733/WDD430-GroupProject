import { sql } from '@vercel/postgres'
{/*For when we're ready to hash passwords */}
// import bcrypt from 'bcryptjs';

export async function loginUser(email: string, password: string) {
    const { rows } = await sql`
        SELECT id, email, password_hash FROM users WHERE email =${email}
    `;

    const user = rows[0];
    if (!user) return null;

    // when using bcrypt
    // const isValid = await bcrypt.compare(password, user.password_hash);
    // if(!isValid) return null;

    // without bcrypt
    const isValid = user.password_hash === password;
    if(!isValid) return null;

    return {
        id: user.id,
        email: user.email,
    };
}