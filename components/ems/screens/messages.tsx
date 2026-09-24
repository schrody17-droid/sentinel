'use client'

import { NeonCard, SectionLabel, StatChip, Toggle } from '@/components/ems/primitives'
import { cn } from '@/lib/utils'
import { MessageSquareWarning, Radar } from 'lucide-react'
import { useState } from 'react'

const messages = [
  {
    sender: '+1 (202) 555‑0173',
    preview: 'USPS: your package is on hold. Confirm details at usps‑redeliver.co',
    risk: 'high',
    tag: 'Smishing link',
  },
  {
    sender: 'SHORT‑5567',
    preview: 'Your bank account is locked. Verify now: secure‑chase‑alert.net',
    risk: 'high',
    tag: 'Phishing',
  },
  {
    sender: '+1 (415) 555‑0128',
    preview: 'Congrats! You won a $1,000 gift card. Claim within 24h…',
    risk: 'medium',
    tag: 'Scam',
  },
  {
    sender: '+1 (718) 555‑0199',
    preview: 'Crypto doubling event ends tonight, send 0.1 BTC to…',
    risk: 'high',
    tag: 'Fraud',
  },
  {
    sender: 'INFO‑8841',
    preview: 'Toll payment overdue. Avoid late fee: ez‑pass‑settle.info',
    risk: 'medium',
    tag: 'Smishing link',
  },
]

const riskStyles = {
  high: 'border-destructive/40 bg-destructive/10 text-destructive',
  medium: 'border-warning/40 bg-warning/10 text-warning',
} as const

export function MessagesScreen() {
  const [filter, setFilter] = useState(true)
  const [scanLinks, setScanLinks] = useState(true)

  return (
    <div className="space-y-5">
      <header>
        <SectionLabel>Message Guard</SectionLabel>
        <h1 className="font-display text-xl font-bold text-foreground">Scam Text Filter</h1>
      </header>

      <div className="grid grid-cols-2 gap-2.5">
        <StatChip value="512" label="Filtered this month" tone="magenta" />
        <StatChip value="47" label="Malicious links" tone="warning" />
      </div>

      <NeonCard className="divide-y divide-border">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Filter scam messages</p>
            <p className="text-xs text-muted-foreground">
              Move suspicious texts to a quarantine folder
            </p>
          </div>
          <Toggle on={filter} onChange={setFilter} label="Filter scam messages" />
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">Scan links in real time</p>
            <p className="text-xs text-muted-foreground">
              Warn before opening dangerous URLs
            </p>
          </div>
          <Toggle on={scanLinks} onChange={setScanLinks} label="Scan links in real time" />
        </div>
      </NeonCard>

      <section aria-label="Quarantined messages" className="space-y-2">
        <div className="flex items-center justify-between">
          <SectionLabel>Quarantined</SectionLabel>
          <span className="font-mono text-[11px] text-accent">{messages.length} items</span>
        </div>
        <div className="space-y-2.5">
          {messages.map((m, i) => (
            <NeonCard key={i} className="px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {m.sender}
                </span>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                    riskStyles[m.risk as keyof typeof riskStyles],
                  )}
                >
                  {m.tag}
                </span>
              </div>
              <p className="mt-1.5 flex items-start gap-2 text-sm text-foreground/90">
                <MessageSquareWarning
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="line-clamp-2">{m.preview}</span>
              </p>
            </NeonCard>
          ))}
        </div>
      </section>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Radar className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        On‑device AI scans every message — your texts never leave your phone
      </p>
    </div>
  )
}
