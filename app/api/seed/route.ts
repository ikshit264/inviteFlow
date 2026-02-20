import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Clear existing plans
        await prisma.plan.deleteMany({});

        const freePlan = await prisma.plan.create({
            data: {
                name: 'FREE',
                maxEvents: 3,
                maxGuestsPerEvent: 50,
                price: 0,
            },
        });

        const paidPlan = await prisma.plan.create({
            data: {
                name: 'PAID',
                maxEvents: 9999999,
                maxGuestsPerEvent: 9999999,
                price: 29.0,
            },
        });

        return NextResponse.json({ success: true, plans: { freePlan, paidPlan } });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
