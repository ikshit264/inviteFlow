import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';

export async function PATCH(request: Request) {
    try {
        const cookieStore = await cookies();
        const tokenToken = cookieStore.get('token');

        if (!tokenToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyJWT(tokenToken.value);
        if (!decoded || !decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name } = await request.json();

        if (!name || name.trim().length === 0) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: { name: name.trim() },
            select: {
                id: true,
                name: true,
                email: true,
                plan: true
            }
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
