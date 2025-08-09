import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '+P4HM1NjwIwt9EkhbudYKFCQqA570w4Sib+GCOuLzwI='; // set a strong secret in production

export function signJwt(payload: Record<string, unknown>, _expiresIn: string | number = '7d'): string {
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '7d' }
    );
    return token;
}

export function verifyJwt<T>(token: string): T | null {
    try {
        return jwt.verify(token, JWT_SECRET) as T;
    } catch {
        return null;
    }
}
