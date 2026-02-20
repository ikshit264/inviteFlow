import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const payload = await getUserFromToken();
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = (await params).id;

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                guests: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        plan: true
                    }
                }
            }
        });

        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Security check
        if (event.userId !== payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ event });
    } catch (error: any) {
        console.error('Fetch Event Detail Error:', error);
        return NextResponse.json({ error: 'Failed to fetch event', details: error.message }, { status: 500 });
    }
}

// Update event API
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const payload = await getUserFromToken();
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = (await params).id;
        const body = await request.json();

        // Check ownership
        const existing = await prisma.event.findUnique({
            where: { id },
            select: { userId: true }
        });

        if (!existing || existing.userId !== payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                date: body.date,
                time: body.time,
                location: body.location,
                status: body.status,
                templateId: body.templateId,
                customization: body.customization,
                guests: body.guests ? {
                    deleteMany: {},
                    create: body.guests.map((g: any) => ({
                        name: g.name,
                        email: g.email || '',
                        status: g.status || 'pending'
                    }))
                } : undefined
            }
        });

        return NextResponse.json({ event: updatedEvent });
    } catch (error: any) {
        console.error('Update Event Error:', error);
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
}
