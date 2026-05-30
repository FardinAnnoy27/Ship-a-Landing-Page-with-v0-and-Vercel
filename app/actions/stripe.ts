'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function createPaymentIntent(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const amount = product.priceInCents - product.discountInCents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      productId: product.id,
      productName: product.name,
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
    amount,
  }
}
