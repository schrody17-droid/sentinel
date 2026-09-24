'use client'

import { NeonCard, SectionLabel, StatChip } from '@/components/ems/primitives'
import type { TabId } from '@/components/ems/bottom-nav'
import {
  Ban,
  ChevronRight,
  MessageSquareWarning,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react'
import Image from 'next/image'

const feed = [
  {
    icon: Ban,
    tone: 'text-destructive',
    title: 'Blocked spam call',
    meta: '+1 (877) 402‑1188 · 4m ago',
  },
  {
    icon: MessageSquareWarning,
    tone: 'text-warning',
    title: 'Quarantined smishing text',
    meta: '“Your package is held” · 22m ago',
  },
  {
    icon: ScanSearch,
    tone: 'text-accent',
    title: 'Dark web scan complete',
    meta: '1 new exposure found · 1h ago',
  },
  {
    icon: Ban,
    tone: 'text-destructive',
    title: 'Blocked robocall',
    meta: '+1 (305) 555‑0142 · 3h ago',
  },
]

export function DashboardScreen({ onNavigate }: { onNavigate: (t: TabId) => void }) {
  return (
    <div className="space-y-5">
      <header className="flex items-center gap-3">
        <Image
          src="/ems-shield.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-lg"
        />
        <div>
          <SectionLabel>Electronic Mobile Security</SectionLabel>
          <h1 className="font-display text-lg font-bold leading-tight text-foreground">
            Good evening, Alex
          </h1>
        </div>
      </header>

      {/* Protection status */}
      <NeonCard glow="cyan" className="cyber-grid px-5 py-7">
        <div className="cyber-scanlines pointer-events-none absolute inset-0" />
        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-primary/50 animate-pulse-ring" />
            <span
              className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-ring"
              style={{ animationDelay: '0.8s' }}
            />
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/60 bg-primary/10 glow-cyan">
              <ShieldCheck className="h-12 w-12 text-primary text-glow" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-4 font-display text-2xl font-extrabold tracking-wide text-primary text-glow">
            PROTECTED
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            All defense systems active · Real‑time monitoring on
          </p>
        </div>
      </NeonCard>

      {/* Stats */}
      <section aria-label="This month" className="space-y-2">
        <SectionLabel>Blocked this month</SectionLabel>
        <div className="grid grid-cols-3 gap-2.5">
          <StatChip value="1,284" label="Spam calls" tone="cyan" />
          <StatChip value="512" label="Scam texts" tone="magenta" />
          <StatChip value="3" label="Data leaks" tone="warning" />
        </div>
      </section>

      {/* Activity feed */}
      <section aria-label="Recent activity" className="space-y-2">
        <SectionLabel>Live threat feed</SectionLabel>
        <NeonCard className="divide-y divide-border">
          {feed.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/60">
                <item.icon className={`h-4 w-4 ${item.tone}`} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {item.meta}
                </p>
              </div>
            </div>
          ))}
        </NeonCard>
      </section>

      <button
        type="button"
        onClick={() => onNavigate('darkweb')}
        className="flex w-full items-center justify-between rounded-2xl border border-accent/50 bg-accent/10 px-4 py-3.5 text-left glow-magenta transition-transform active:scale-[0.99]"
      >
        <span className="flex items-center gap-3">
          <ScanSearch className="h-5 w-5 text-accent" aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">
            Run a dark web scan now
          </span>
        </span>
        <ChevronRight className="h-4 w-4 text-accent" aria-hidden="true" />
      </button>
    </div>
  )
}
