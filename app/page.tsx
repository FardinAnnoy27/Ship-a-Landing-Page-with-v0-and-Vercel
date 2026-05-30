'use client'

import { useState, useEffect } from 'react'
import { PRODUCTS } from '@/lib/products'
import Checkout from '@/components/checkout'

const product = PRODUCTS[0]

type View = 'hero' | 'product' | 'checkout'

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>('hero')
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (view: View) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentView(view)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#0B071E] relative">
      {/* Background ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366F1]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-[#A855F7]/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#8B5CF6]/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Progress indicator */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {(['hero', 'product', 'checkout'] as View[]).map((view, idx) => (
          <div key={view} className="flex items-center gap-3">
            <button
              onClick={() => navigateTo(view)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentView === view 
                  ? 'bg-[#A855F7] w-8' 
                  : 'bg-[#A855F7]/30 hover:bg-[#A855F7]/50'
              }`}
            />
            {idx < 2 && <div className="w-8 h-0.5 bg-[#A855F7]/20" />}
          </div>
        ))}
      </div>

      {/* View container */}
      <div className={`h-full w-full relative z-10 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {currentView === 'hero' && (
          <HeroView onNavigate={() => navigateTo('product')} />
        )}
        {currentView === 'product' && (
          <ProductView 
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            onNavigate={() => navigateTo('checkout')}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutView onBack={() => navigateTo('product')} />
        )}
      </div>
    </main>
  )
}

/* ===========================================
   STEP 1: HERO LANDING PAGE
   =========================================== */
function HeroView({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="h-full w-full flex">
      {/* Left: Copy */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16 xl:px-24">
        <div className="space-y-8">
          {/* Brand tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 backdrop-blur-sm w-fit">
            <div className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="text-xs font-mono text-[#A855F7] tracking-wider">NEON_PULSE</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
            <span className="text-[#E9D5FF]">UPGRADE YOUR</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#C084FC]">
              COGNITIVE REALITY.
            </span>
          </h1>

          {/* Subheadline with typing effect */}
          <TypewriterText />

          {/* CTA Button */}
          <button 
            onClick={onNavigate}
            className="group relative mt-6"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-full opacity-40 blur-md group-hover:opacity-70 transition-all duration-300" />
            <div className="relative px-10 py-4 bg-[#0B071E]/80 backdrop-blur-md rounded-full border border-[#A855F7]/30 text-[#E9D5FF] font-medium flex items-center gap-3 group-hover:border-[#A855F7]/60 transition-all duration-300">
              <span className="text-lg">Explore Tech Specs</span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>

          {/* Stats row */}
          <div className="flex gap-12 mt-10 pt-8 border-t border-[#A855F7]/10">
            <Stat value="100h" label="Battery Life" />
            <Stat value="<1ms" label="Latency" />
            <Stat value="Ti-6" label="Titanium Grade" />
          </div>
        </div>
      </div>

      {/* Right: Animated 3D Geometric Shape */}
      <div className="w-1/2 h-full flex items-center justify-center relative">
        <div className="relative w-80 h-80 xl:w-96 xl:h-96">
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-3xl rotate-45 opacity-20 blur-3xl animate-pulse" />
          
          {/* Middle layer */}
          <div className="absolute inset-8 bg-gradient-to-br from-[#6366F1]/30 to-[#A855F7]/30 rounded-2xl rotate-45 backdrop-blur-xl border border-[#A855F7]/40 animate-float" />
          
          {/* Inner core */}
          <div className="absolute inset-16 bg-gradient-to-br from-[#6366F1]/60 to-[#A855F7]/60 rounded-xl rotate-45 shadow-[0_0_60px_rgba(168,85,247,0.4)]" />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#0B071E]/80 backdrop-blur-sm border border-[#A855F7]/50 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#6366F1] rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#A855F7] rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-[#C084FC] rounded-full opacity-50 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  )
}

/* ===========================================
   STEP 2: PRODUCT DETAIL PAGE
   =========================================== */
function ProductView({ 
  selectedVariant, 
  setSelectedVariant, 
  onNavigate
}: { 
  selectedVariant: number
  setSelectedVariant: (v: number) => void
  onNavigate: () => void
}) {
  return (
    <div className="h-full w-full flex">
      {/* Left: Product Media */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center px-16">
        {/* Product preview card */}
        <div className={`relative w-64 h-64 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 backdrop-blur-xl border-2 ${product.variants[selectedVariant].borderColor} flex items-center justify-center transition-all duration-500 overflow-hidden`}>
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#A855F7]/5 to-[#6366F1]/10" />
          
          {/* Animated rings */}
          <div className="absolute w-32 h-32 rounded-full border border-[#A855F7]/20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-44 h-44 rounded-full border border-[#6366F1]/10 animate-ping" style={{ animationDuration: '4s' }} />
          
          {/* Center product icon */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#A855F7] shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Variant selector */}
        <div className="mt-8">
          <p className="text-xs text-[#E9D5FF]/50 uppercase tracking-widest mb-4 text-center">Select Variant</p>
          <div className="flex gap-4">
            {product.variants.map((variant, idx) => (
              <button
                key={variant.name}
                onClick={() => setSelectedVariant(idx)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-300 ${
                  selectedVariant === idx 
                    ? 'border-[#A855F7] bg-[#A855F7]/15 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                    : 'border-[#A855F7]/20 hover:border-[#A855F7]/50 bg-[#A855F7]/5'
                }`}
              >
                <div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: variant.color }} />
                <span className="text-sm text-[#E9D5FF]/90 font-medium">{variant.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-1/2 h-full flex flex-col justify-center px-16">
        {/* Rating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6366F1]/20 to-[#A855F7]/20 border border-[#A855F7]/30 backdrop-blur-sm w-fit mb-6">
          <svg className="w-4 h-4 text-[#A855F7]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold text-[#A855F7]">{product.rating} Rated</span>
        </div>

        {/* Product title */}
        <h2 className="text-4xl xl:text-5xl font-bold text-[#E9D5FF] tracking-tight mb-4">
          {product.name}
        </h2>
        <p className="text-lg text-[#E9D5FF]/60 mb-8 max-w-lg leading-relaxed">
          {product.description}
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {product.features.map((feature) => (
            <div key={feature.label} className="p-4 rounded-2xl bg-[#A855F7]/5 border border-[#A855F7]/10 backdrop-blur-sm text-center hover:bg-[#A855F7]/10 hover:border-[#A855F7]/20 transition-all duration-300">
              <span className="text-2xl">{feature.icon}</span>
              <p className="text-sm text-[#E9D5FF]/70 mt-2 font-medium">{feature.label}</p>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end gap-4 mb-8">
          <div className="text-5xl font-bold text-[#E9D5FF]">
            ${((product.priceInCents - product.discountInCents) / 100).toFixed(2)}
          </div>
          <div className="text-xl text-[#E9D5FF]/40 line-through mb-1">
            ${(product.priceInCents / 100).toFixed(2)}
          </div>
          <div className="px-3 py-1 rounded-full bg-[#A855F7]/20 text-[#A855F7] text-sm font-semibold mb-1">
            Save ${(product.discountInCents / 100).toFixed(2)}
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onNavigate}
          className="group relative w-fit overflow-hidden px-12 py-4 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-3">
            PROCEED TO CHECKOUT
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Pulsing ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-2xl opacity-30 animate-pulse blur-sm -z-10" />
        </button>
      </div>
    </div>
  )
}

/* ===========================================
   STEP 3: CHECKOUT PAGE
   =========================================== */
function CheckoutView({ onBack }: { onBack: () => void }) {
  const finalPrice = (product.priceInCents - product.discountInCents) / 100

  return (
    <div className="h-full w-full flex">
      {/* Left: Payment Form */}
      <div className="w-3/5 h-full flex flex-col justify-center px-16 xl:px-24 border-r border-[#A855F7]/10">
        <h2 className="text-3xl font-bold text-[#E9D5FF] mb-8">Complete your purchase</h2>
        <div className="max-w-lg">
          <Checkout productId={product.id} />
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="w-2/5 h-full flex flex-col justify-center px-12 xl:px-16 bg-[#A855F7]/5">
        <h3 className="text-xl font-semibold text-[#E9D5FF] mb-6">Order summary</h3>
        
        {/* Order item card */}
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-[#A855F7]/10 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#A855F7]/20 border border-[#A855F7]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-[#E9D5FF]">{product.name}</p>
              <p className="text-sm text-[#E9D5FF]/50">{product.variants[0].name} Edition</p>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#E9D5FF]/60">Subtotal</span>
            <span className="text-[#E9D5FF]">${(product.priceInCents / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#E9D5FF]/60">Shipping</span>
            <span className="text-[#E9D5FF]">Free</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-[#A855F7]/10">
            <span className="text-lg font-bold text-[#E9D5FF]">Total</span>
            <span className="text-lg font-bold text-[#E9D5FF]">${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===========================================
   SHARED COMPONENTS
   =========================================== */
function TypewriterText() {
  const phrases = ['The Next-Gen Neural Wearable is here.', 'Sync your mind. Expand your limits.', 'Experience cognitive enhancement.']
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[currentPhrase]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < phrase.length) {
          setDisplayText(phrase.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        }
      }
    }, isDeleting ? 30 : 50)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase, phrases])

  return (
    <p className="text-xl text-[#E9D5FF]/70 font-light h-8">
      {displayText}
      <span className="inline-block w-0.5 h-6 bg-[#A855F7] ml-1 animate-blink" />
    </p>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-[#E9D5FF]">{value}</div>
      <div className="text-sm text-[#E9D5FF]/50 uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}
