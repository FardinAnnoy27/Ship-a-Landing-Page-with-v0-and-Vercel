'use client'

import { useState, useEffect, FormEvent } from 'react'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { createPaymentIntent } from '@/app/actions/stripe'

let stripePromise: Promise<Stripe | null> | null = null

function getStripe() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      console.error('Stripe publishable key is not configured')
      return null
    }
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

const elementStyles = {
  style: {
    base: {
      color: '#E9D5FF',
      fontSize: '16px',
      fontFamily: 'system-ui, sans-serif',
      '::placeholder': {
        color: 'rgba(233, 213, 255, 0.4)',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
}

function CheckoutForm({ productId, amount }: { productId: string; amount: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    const cardNumber = elements.getElement(CardNumberElement)
    if (!cardNumber) {
      setError('Card element not found')
      setIsProcessing(false)
      return
    }

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
      (await createPaymentIntent(productId)).clientSecret!,
      {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: fullName,
            email: email,
          },
        },
      }
    )

    if (paymentError) {
      setError(paymentError.message || 'Payment failed')
      setIsProcessing(false)
    } else if (paymentIntent?.status === 'succeeded') {
      setSuccess(true)
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#A855F7] flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#E9D5FF] mb-2">Payment Successful!</h3>
        <p className="text-[#E9D5FF]/60">Thank you for your purchase. Your order is being processed.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-sm font-bold">1</div>
          <h4 className="text-lg font-semibold text-[#E9D5FF]">Contact information</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#E9D5FF]/60 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#A855F7]/5 border border-[#A855F7]/20 text-[#E9D5FF] placeholder-[#E9D5FF]/40 focus:outline-none focus:border-[#A855F7]/50 focus:ring-1 focus:ring-[#A855F7]/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm text-[#E9D5FF]/60 mb-2">Full name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#A855F7]/5 border border-[#A855F7]/20 text-[#E9D5FF] placeholder-[#E9D5FF]/40 focus:outline-none focus:border-[#A855F7]/50 focus:ring-1 focus:ring-[#A855F7]/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-white text-sm font-bold">2</div>
          <h4 className="text-lg font-semibold text-[#E9D5FF]">Payment details</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#E9D5FF]/60 mb-2">Card number</label>
            <div className="px-4 py-3 rounded-xl bg-[#A855F7]/5 border border-[#A855F7]/20 focus-within:border-[#A855F7]/50 focus-within:ring-1 focus-within:ring-[#A855F7]/30 transition-all">
              <CardNumberElement options={elementStyles} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#E9D5FF]/60 mb-2">Expiry date</label>
              <div className="px-4 py-3 rounded-xl bg-[#A855F7]/5 border border-[#A855F7]/20 focus-within:border-[#A855F7]/50 focus-within:ring-1 focus-within:ring-[#A855F7]/30 transition-all">
                <CardExpiryElement options={elementStyles} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#E9D5FF]/60 mb-2">CVC</label>
              <div className="px-4 py-3 rounded-xl bg-[#A855F7]/5 border border-[#A855F7]/20 focus-within:border-[#A855F7]/50 focus-within:ring-1 focus-within:ring-[#A855F7]/30 transition-all">
                <CardCvcElement options={elementStyles} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#E9D5FF]/40 mt-4">
          Payment processing will be integrated with Stripe.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          `Complete Purchase - $${(amount / 100).toFixed(2)}`
        )}
      </button>
    </form>
  )
}

export default function Checkout({ productId }: { productId: string }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createPaymentIntent(productId).then(({ clientSecret, amount }) => {
      setClientSecret(clientSecret)
      setAmount(amount)
      setLoading(false)
    })
  }, [productId])

  if (loading || !clientSecret) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#E9D5FF]/60">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading payment form...
        </div>
      </div>
    )
  }

  const stripeInstance = getStripe()

  if (!stripeInstance) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-400 text-center p-4">
          <p>Payment system is not configured.</p>
          <p className="text-sm mt-2 text-[#E9D5FF]/60">Please contact support.</p>
        </div>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripeInstance}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#A855F7',
            colorBackground: '#0B071E',
            colorText: '#E9D5FF',
          },
        },
      }}
    >
      <CheckoutForm productId={productId} amount={amount} />
    </Elements>
  )
}
