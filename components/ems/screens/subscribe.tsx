'use client'

import { NeonCard, SectionLabel } from '@/components/ems/primitives'
import { Checkout } from '@/components/ems/checkout'
import { PLANS } from '@/lib/products'
import { CheckCheck, Crown, PhoneOff, Radar, ScanSearch, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

const features = [
  { icon: PhoneOff, text: 'Unlimited spam & robocall blocking' },
  { icon: Radar, text: 'AI scam text & phishing‑link filtering' },
  { icon: ScanSearch, text: 'Unlimited dark web identity scans' },
  { icon: Sparkles, text: '24/7 breach monitoring & instant alerts' },
  { icon: CheckCheck, text: 'Real‑time protection for up to 5 devices' },
]

const plan = PLANS[0]

export function SubscribeScreen() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="space-y-5">
      <header>
        <SectionLabel>Membership</SectionLabel>
        <h1 className="font-display text-xl font-bold text-foreground">EMS Premium</h1>
      </header>

      <NeonCard glow="magenta" className="cyber-grid overflow-hidden">
        <div className="cyber-scanlines pointer-events-none absolute inset-0" />
        <div className="relative px-5 py-6">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-accent text-glow" aria-hidden="true" />
            <span className="font-display text-sm font-bold uppercase tracking-widest text-accent">
              Full Protection
            </span>
          </div>

          <div className="mt-3 flex items-end gap-1.5">
            <span className="font-display text-5xl font-extrabold text-foreground text-glow">
              $9.99
            </span>
            <span className="mb-1.5 text-sm text-muted-foreground">/ month</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Cancel anytime · 7‑day free trial · No contracts
          </p>

          <ul className="mt-5 space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
                <span className="text-sm text-foreground/90">{text}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-accent/70 bg-accent/25 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground glow-magenta transition-transform active:scale-[0.98]"
          >
            <Crown className="h-4 w-4" aria-hidden="true" />
            Start 7‑day free trial
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Then $9.99/month. Billed securely by Stripe.
          </p>
        </div>
      </NeonCard>

      <NeonCard className="px-4 py-3.5">
        <p className="text-center text-xs text-muted-foreground">
          Rated <span className="font-semibold text-foreground">4.8★</span> by 120,000+
          members · Bank‑grade encryption · Zero data selling
        </p>
      </NeonCard>

      {checkoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Subscribe to EMS Premium"
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="relative max-h-[92%] w-full max-w-md overflow-y-auto rounded-t-2xl border-t border-accent/40 bg-card glow-magenta"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-card/95 px-4 py-3 backdrop-blur">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-accent">
                  EMS Premium
                </p>
                <p className="text-[11px] text-muted-foreground">
                  $9.99/month · 7‑day free trial
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close checkout"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4">
              <Checkout planId={plan.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
