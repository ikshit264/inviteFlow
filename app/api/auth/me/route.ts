import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const payload = await getUserFromToken();
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: { planDetails: true },
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get event counts
    const eventCount = await prisma.event.count({
        where: { userId: user.id },
    });

    return NextResponse.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            plan: user.plan,
            planDetails: user.planDetails,
            eventCount,
        }
    });
}
