'use client'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

 

interface Props {
    children: React.ReactNode
}

function StripeWrapper({children}:Props) {
    const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
    return <Elements stripe={promise}>
        {children}
    </Elements>
}

export {
    StripeWrapper
}