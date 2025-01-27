

'use client'

import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCart } from "@/src/providers/CartContextProvider";
import { formatPrice } from "@/src/utils/formatPrice";
import { toast } from "react-toastify";
import Button from "@/src/components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}


const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {
    const { subtotal, clearCartHandler, handleSetPaymentIntent } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const formatedPrice = formatPrice(subtotal);

    // const [status, setStatus] = useState("default");
    // const [intentId, setIntentId] = useState(null);

    useEffect(() => {
      if (!stripe) {
        return;
      }


      if (!clientSecret) {
        return;
      }

      handleSetPaymentSuccess(false);
    }, [stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        }).then(result => {
            if(!result.error) {
                toast.success("Checkout Successful");

                clearCartHandler();
                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
            }

            setIsLoading(false);
        })
    }


    return (<>

        <form onSubmit={handleSubmit} id="payment-form" className="dark:text-white">
            <div className="mb-6">
                <h2 className="text-3xl">Enter your details to complete checkout</h2>
            </div>
            <h2 className="font-semibold mb-2">Address Information</h2>
            <AddressElement options={{
                mode: "shipping",
                allowedCountries: ["US", "KE", "IN"],
            }} />
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement
                id="payment-element"
                options={{ layout: "tabs" }}
            />
            <div className="py-4 text-center texxt-slate-700 text-2xl font-bold">
                Total: {formatedPrice}
            </div>
            <Button variant="dark" size="md" fullWidth rounded="rounded-md" disabled={isLoading || !stripe || !elements}  onClick={() => {}}>
                {isLoading ? "Processing..." : "Pay now"}
            </Button>
        </form>
        </>
    )
}

export default CheckoutForm
