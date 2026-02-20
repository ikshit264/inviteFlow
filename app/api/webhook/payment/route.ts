import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Webhook received:', body);

        const { event_type, data } = body;

        if (event_type === 'payment.succeeded') {
            const paymentData = data;
            const dodoId = paymentData.payment_id;
            const amount = paymentData.total_amount;
            const currency = paymentData.currency;
            const productId = paymentData.product_cart?.[0]?.product_id;
            const userId = paymentData.metadata?.userId;

            if (!userId) {
                console.warn('Webhook warning: Missing metadata_userId in payload');
                return NextResponse.json({ error: 'Missing userId in metadata' }, { status: 400 });
            }

            // 1. Find the internal plan name from Product table
            const product = await prisma.product.findUnique({
                where: { productId: productId }
            });

            const planName = product?.name || 'PAID'; // fallback if not found

            // 2. Record the transaction (upsert to handle duplicates)
            await prisma.payment.upsert({
                where: { dodoId: dodoId },
                update: {
                    status: 'completed'
                },
                create: {
                    dodoId: dodoId,
                    amount: amount,
                    currency: currency,
                    status: 'completed',
                    productId: productId,
                    userId: userId
                }
            });

            // 3. Update the user plan
            // Optional: If we still want to link to a Plan model, we'd need to find the Plan by name
            const planConfig = await prisma.plan.findUnique({
                where: { name: planName }
            });

            await prisma.user.update({
                where: { id: userId },
                data: {
                    plan: planName,
                    planId: planConfig?.id // Keep the relation in sync if possible
                }
            });

            console.log(`Payment succeeded for user ${userId}. Plan updated to ${planName}.`);
            return NextResponse.json({ received: true });
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
