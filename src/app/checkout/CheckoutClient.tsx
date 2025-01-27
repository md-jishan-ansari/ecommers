"use client";

import { useCart } from '@/src/providers/CartContextProvider';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Button from '@/src/components/Button';
import CheckoutForm from './CheckoutForm';

// Add debounce import
import { debounce } from 'lodash';
import { useTheme } from '@/src/providers/ThemeContextProvider';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutClient = () => {
    const {theme} = useTheme();
    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
    const [clientSecret, setClientSecret] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {


        const createPaymentIntent = debounce(async () => {
            if (cartProducts && !isProcessing) {
                setIsProcessing(true);
                setLoading(true);
                setError(false);

                fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: cartProducts,
                        payment_intent_id: paymentIntent ? paymentIntent : null,
                    })
                }).then((res) => {
                    setLoading(false);
                    if(res.status === 401) {
                        return router.push('/login')
                    }

                    return res.json();
                }).then((data) => {
                    setClientSecret(data.paymentIntent.client_secret);
                    handleSetPaymentIntent(data.paymentIntent.id);
                }).catch((error) => {
                    setError(true);
                    console.log("error", error);
                    toast.error("Something went wrong");
                }).finally(() => {
                    setIsProcessing(false);
                });
            }
        }, 300);

        createPaymentIntent();

        /*
            Cleanup:
            Returns a cleanup function that cancels any pending debounced calls
            Prevents memory leaks and unnecessary API calls
        */
        return () => {
            createPaymentIntent.cancel();
        };

    }, [cartProducts, paymentIntent]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: theme === "light" ? 'stripe' : 'night',
            labels: 'floating',
        },
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (
        <div className="max-w-[650px] w-full p-8 md:p-4">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise} >
                    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {loading && <div className="text-center">Loading Checkout...</div>}
            {error && <div className="text-center text-rose-500">Something went wront...</div>}

            {paymentSuccess && (
                <div className="flex items-center flex-col gap-4">
                    <div className="text-center text-teal-500">Payment Success</div>
                    <div className="max-w-[220px] w-full">
                        <Button variant="dark" size="md" fullWidth rounded="rounded-md" onClick={() => router.push('/order')} >View Your Orders</Button>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default CheckoutClient
