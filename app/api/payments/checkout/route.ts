import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST() {
    try {
        const payload = await getUserFromToken();
        if (!payload || !payload.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = payload.userId;
        const productId = process.env.DODO_PRO_PLAN_ID;
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

        if (!productId) {
            return NextResponse.json({ error: 'Pro Plan ID not configured' }, { status: 500 });
        }

        // Construct Dodo Checkout URL
        // Pattern: https://checkout.dodopayments.com/buy/{productId}?quantity=1&metadata_userId={userId}&redirect_url={baseUrl}/dashboard?payment=success
        const checkoutUrl = `https://checkout.dodopayments.com/buy/${productId}?quantity=1&metadata_userId=${userId}&redirect_url=${encodeURIComponent(`${baseUrl}/dashboard?payment=success`)}`;

        return NextResponse.json({ url: checkoutUrl });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
