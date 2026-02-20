import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

export function signJWT(payload: any) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function verifyJWT(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET) as any;
    } catch (error) {
        return null;
    }
}

export async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return verifyJWT(token);
}
