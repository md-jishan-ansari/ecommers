import Stripe from 'stripe'
import { prisma } from "@/src/libs/prismadb";

import {headers} from 'next/headers'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-09-30.acacia'
})

export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    console.log("stripe-webhook reached");

    if(!signature) {
        return NextResponse.json(
            { error: 'Missing stripe signature' },
            { status: 400 }
        )
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        return NextResponse.json(
            { error: `Webhook error: ${err}` },
            { status: 400 }
        )
    }

    switch(event.type) {
        case 'charge.succeeded':
            const charge: any = event.data.object as Stripe.Charge

            if(typeof charge.payment_intent === 'string') {
                await prisma?.order.update({
                    where: {
                        paymentIntentId: charge.payment_intent
                    },
                    data: {
                        status: 'complete',
                        address: charge.shipping?.address
                    },
                })
            }
            break
        default:
            console.log("Unhandled event type:" + event.type)
    }

    return NextResponse.json({ received: true })
}