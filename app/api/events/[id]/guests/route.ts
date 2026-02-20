import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const payload = await getUserFromToken();
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = (await params).id;
        const { name, email } = await request.json();

        // Check ownership and limits
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                user: { include: { planDetails: true } },
                _count: { select: { guests: true } }
            }
        });

        if (!event || event.userId !== payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Plan check
        const isFree = event.user.plan === 'FREE' || event.user.planDetails?.name === 'FREE';
        const maxGuestsPerEvent = event.user.planDetails?.maxGuestsPerEvent ?? 50;

        if (isFree && event._count.guests >= maxGuestsPerEvent) {
            return NextResponse.json({ error: 'Guest limit reached for Free plan.' }, { status: 403 });
        }

        const guest = await prisma.guest.create({
            data: {
                name,
                email: email || '',
                eventId: id
            }
        });

        return NextResponse.json({ guest });
    } catch (error: any) {
        console.error('Add Guest Error:', error);
        return NextResponse.json({ error: 'Failed to add guest' }, { status: 500 });
    }
}
