'use client'

import { NeonCard, SectionLabel } from '@/components/ems/primitives'
import { cn } from '@/lib/utils'
import { CircleCheckBig, Globe, LockKeyhole, ScanSearch, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'scanning' | 'results'

const breaches = [
  {
    source: 'ShopFlow Marketplace',
    date: 'Mar 2024',
    exposed: ['Email', 'Password hash', 'Home address'],
    severity: 'critical',
  },
  {
    source: 'FitTrack App',
    date: 'Nov 2023',
    exposed: ['Email', 'Phone number', 'Date of birth'],
    severity: 'high',
  },
  {
    source: 'NewsDaily Forums',
    date: 'Jul 2022',
    exposed: ['Email', 'Username'],
    severity: 'low',
  },
]

const severityStyles = {
  critical: 'border-destructive/50 bg-destructive/10 text-destructive',
  high: 'border-warning/50 bg-warning/10 text-warning',
  low: 'border-primary/50 bg-primary/10 text-primary',
} as const

const scanTargets = [
  'Breach databases',
  'Paste sites',
  'Hacker forums',
  'Credential dumps',
  'Marketplace listings',
]

export function DarkWebScreen() {
  const [email, setEmail] = useState('alex@example.com')
  const [phase, setPhase] = useState<Phase>('idle')
  const [step, setStep] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const startScan = () => {
    if (!email.trim()) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('scanning')
    setStep(0)
    scanTargets.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setStep(i + 1), (i + 1) * 650),
      )
    })
    timers.current.push(
      setTimeout(() => setPhase('results'), scanTargets.length * 650 + 500),
    )
  }

  return (
    <div className="space-y-5">
      <header>
        <SectionLabel>Identity Monitor</SectionLabel>
        <h1 className="font-display text-xl font-bold text-foreground">Dark Web Scan</h1>
      </header>

      <NeonCard glow="magenta" className="cyber-grid space-y-3 px-4 py-5">
        <label htmlFor="scan-email" className="text-sm font-medium text-foreground">
          Scan for a leaked identity
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2.5 focus-within:border-primary/70">
          <Globe className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <input
            id="scan-email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        <button
          type="button"
          onClick={startScan}
          disabled={phase === 'scanning'}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/70 bg-primary/20 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary glow-cyan transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          <ScanSearch className="h-4 w-4" aria-hidden="true" />
          {phase === 'scanning' ? 'Scanning…' : 'Start scan'}
        </button>
      </NeonCard>

      {phase === 'scanning' && (
        <NeonCard className="relative overflow-hidden px-4 py-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/25 to-transparent animate-sweep" />
          <ul className="relative space-y-2.5">
            {scanTargets.map((t, i) => {
              const done = step > i
              const activeItem = step === i
              return (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full border text-[10px]',
                      done
                        ? 'border-success/60 bg-success/15 text-success'
                        : activeItem
                          ? 'border-primary/60 bg-primary/15 text-primary'
                          : 'border-border text-muted-foreground',
                    )}
                  >
                    {done ? '✓' : i + 1}
                  </span>
                  <span
                    className={cn(
                      'font-mono',
                      done
                        ? 'text-foreground'
                        : activeItem
                          ? 'text-primary'
                          : 'text-muted-foreground',
                    )}
                  >
                    {t}
                  </span>
                </li>
              )
            })}
          </ul>
        </NeonCard>
      )}

      {phase === 'results' && (
        <section aria-label="Scan results" className="space-y-3">
          <NeonCard className="flex items-center gap-3 px-4 py-3.5">
            <TriangleAlert className="h-6 w-6 shrink-0 text-warning" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {breaches.length} exposures found
              </p>
              <p className="font-mono text-xs text-muted-foreground">{email}</p>
            </div>
          </NeonCard>

          {breaches.map((b, i) => (
            <NeonCard key={i} className="px-4 py-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{b.source}</p>
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                    severityStyles[b.severity as keyof typeof severityStyles],
                  )}
                >
                  {b.severity}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                Breached {b.date}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {b.exposed.map((x) => (
                  <span
                    key={x}
                    className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-[11px] text-foreground/80"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </NeonCard>
          ))}

          <NeonCard className="flex items-start gap-3 border-success/40 bg-success/5 px-4 py-3.5">
            <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
            <p className="text-sm text-foreground/90">
              We&apos;ll keep monitoring 24/7 and alert you the moment your data appears
              anywhere new.
            </p>
          </NeonCard>
        </section>
      )}

      {phase === 'idle' && (
        <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <LockKeyhole className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Continuous monitoring across 15B+ leaked records
        </p>
      )}
    </div>
  )
}
