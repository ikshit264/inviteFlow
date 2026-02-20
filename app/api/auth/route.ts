import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password, name, isSignUp } = await request.json();

        if (isSignUp) {
            // Find the FREE plan
            let freePlan = await prisma.plan.findUnique({
                where: { name: 'FREE' },
            });

            // Auto-initialize plans if they don't exist
            if (!freePlan) {
                freePlan = await prisma.plan.create({
                    data: {
                        name: 'FREE',
                        maxEvents: 3,
                        maxGuestsPerEvent: 50,
                        price: 0,
                    },
                });

                // Also create PAID plan while we're at it
                await prisma.plan.create({
                    data: {
                        name: 'PAID',
                        maxEvents: 9999999,
                        maxGuestsPerEvent: 9999999,
                        price: 29.0,
                    },
                }).catch(() => { /* already exists or failed, ignore */ });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    planId: freePlan.id,
                },
            });

            const token = signJWT({ userId: user.id, email: user.email });
            const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
            response.cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7 });
            return response;
        } else {
            const user = await prisma.user.findUnique({
                where: { email },
                include: { planDetails: true },
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }

            const token = signJWT({ userId: user.id, email: user.email });
            const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
            response.cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7 });
            return response;
        }
    } catch (error: any) {
        console.error('Auth error:', error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}
