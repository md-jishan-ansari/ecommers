import getCurrentUser from "@/src/actions/getCurrentUser";
import { NextResponse } from "next/server";
import {prisma} from "@/src/libs/prismadb";
import Stripe from 'stripe';
import { CartProductType } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-09-30.acacia',
})

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return Math.round(totalPrice * 100) / 100;
}

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {items, payment_intent_id} = await req.json();

    const total = calculateOrderAmount(items) * 100;

    const orderData = {
        user: {connect: {id: currentUser.id}},
        amount: total,
        currency: 'usd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items,
    }

    if(payment_intent_id) {

        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if(current_intent) {
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: total,
            });

            // update the order
            // const [existing_order, update_order] = await Promise.all([
            const [existing_order] = await Promise.all([
                prisma.order.findFirst({
                    where: {paymentIntentId: payment_intent_id},
                }),
                prisma.order.update({
                    where: {paymentIntentId: payment_intent_id},
                    data: {
                        amount: total,
                        products: items,
                    }
                })
            ]);

            if(!existing_order) {
                return NextResponse.json({error: 'Invalid Payment Intent'}, {
                    status: 400
                });
            }

            return NextResponse.json({paymentIntent: updated_intent});
        }

    } else {
        // create a new payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            }
        })

        // create a new order
        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({paymentIntent});


    }
}