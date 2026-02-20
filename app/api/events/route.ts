import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const payload = await getUserFromToken();
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const events = await prisma.event.findMany({
            where: { userId: payload.userId },
            include: {
                _count: {
                    select: { guests: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formattedEvents = events.map(e => ({
            id: e.id,
            name: e.title,
            date: e.date,
            guestCount: e._count.guests,
            status: e.status
        }));

        return NextResponse.json({ events: formattedEvents });
    } catch (error: any) {
        console.error('Events Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch events', details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await getUserFromToken();
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            include: { planDetails: true },
        });

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const { eventData, guests, templateId, customization } = await request.json();

        // Check Plan Limits
        const eventCount = await prisma.event.count({ where: { userId: user.id } });

        // Use planDetails for limits if available, otherwise default to FREE limits
        const isFree = user.plan === 'FREE' || user.planDetails?.name === 'FREE';
        const maxEvents = user.planDetails?.maxEvents ?? 3;
        const maxGuestsPerEvent = user.planDetails?.maxGuestsPerEvent ?? 50;

        if (isFree && eventCount >= maxEvents) {
            return NextResponse.json({ error: 'Free plan limit reached. Upgrade to Pro!' }, { status: 403 });
        }

        // Filter guests if FREE plan
        let guestsToSave = guests;
        if (isFree && guests.length > maxGuestsPerEvent) {
            guestsToSave = guests.slice(0, maxGuestsPerEvent);
        }

        const event = await prisma.event.create({
            data: {
                userId: user.id,
                title: eventData.title,
                description: eventData.description,
                date: eventData.date,
                time: eventData.time,
                location: eventData.location,
                tone: eventData.tone,
                hostName: eventData.hostName,
                templateId,
                customization,
                guests: {
                    create: guestsToSave.map((g: any) => ({
                        name: g.name,
                        email: g.email || '',
                    }))
                }
            }
        });

        return NextResponse.json({ event, guestCountCapped: guests.length > guestsToSave.length });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save event' }, { status: 500 });
    }
}
