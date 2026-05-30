export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  discountInCents: number
  rating: string
  variants: { name: string; color: string; borderColor: string }[]
  features: { icon: string; label: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'pulse-band-v1',
    name: 'PULSE_BAND // v1.0',
    description: 'The next-generation neural wearable that syncs with your cognitive reality. Titanium core, infinite possibilities.',
    priceInCents: 49900,
    discountInCents: 5000,
    rating: '9.8/10',
    variants: [
      { name: 'Chroma Purple', color: '#A855F7', borderColor: 'border-[#A855F7]' },
      { name: 'Deep Velvet', color: '#4C1D95', borderColor: 'border-[#4C1D95]' },
      { name: 'Electric Iris', color: '#6366F1', borderColor: 'border-[#6366F1]' },
    ],
    features: [
      { icon: '⚡', label: '100h Battery' },
      { icon: '🧠', label: 'Neural Sync' },
      { icon: '💎', label: 'Titanium Core' },
    ],
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
