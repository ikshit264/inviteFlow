import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data (optional, but good for clean seed)
    await prisma.guest.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.plan.deleteMany({});
    await prisma.product.deleteMany({});

    const dodoProId = process.env.DODO_PRO_PLAN_ID || 'pdt_0NYUSuMy2q91d0ALOcHJj';

    await prisma.product.create({
        data: {
            productId: dodoProId,
            name: 'PAID'
        }
    });

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

    // Create a demo user
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const demoUser = await prisma.user.create({
        data: {
            email: 'demo@example.com',
            password: hashedPassword,
            name: 'Demo User',
            planId: freePlan.id,
        }
    });

    // Create sample events for the user
    const event1 = await prisma.event.create({
        data: {
            userId: demoUser.id,
            title: 'Welcome Party',
            description: 'A grand celebration for our new office!',
            date: '2026-06-15',
            time: '18:00',
            location: 'Downtown Hall',
            tone: 'Fun',
            hostName: 'InviteFlow Team',
            templateId: 'modern-1',
            status: 'Draft',
            guests: {
                create: [
                    { name: 'Alice Johnson', email: 'alice@example.com' },
                    { name: 'Bob Smith', email: 'bob@example.com' }
                ]
            }
        }
    });

    const event2 = await prisma.event.create({
        data: {
            userId: demoUser.id,
            title: 'Tech Talk 2026',
            description: 'Discussing the future of AI Agents.',
            date: '2026-08-20',
            time: '10:00',
            location: 'Innovation Hub',
            tone: 'Professional',
            hostName: 'Engineering Lead',
            templateId: 'minimal-2',
            status: 'Sent',
            guests: {
                create: [
                    { name: 'Charlie Davis', email: 'charlie@example.com' }
                ]
            }
        }
    });

    console.log('Seed successful!');
    console.log({
        plans: [freePlan.name, paidPlan.name],
        user: demoUser.email,
        events: 2
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
