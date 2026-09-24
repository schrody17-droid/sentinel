'use client'

import { NeonCard, SectionLabel, StatChip, Toggle } from '@/components/ems/primitives'
import { Ban, PhoneOff } from 'lucide-react'
import { useState } from 'react'

const blocked = [
  { number: '+1 (877) 402‑1188', label: 'Auto warranty scam', time: '4m ago' },
  { number: '+1 (305) 555‑0142', label: 'Robocall', time: '3h ago' },
  { number: 'Unknown', label: 'Spoofed number', time: '5h ago' },
  { number: '+1 (800) 733‑9021', label: 'IRS impersonation', time: 'Yesterday' },
  { number: '+1 (646) 555‑0110', label: 'Telemarketer', time: 'Yesterday' },
  { number: '+44 20 7946 0991', label: 'Overseas scam', time: '2d ago' },
]

export function CallsScreen() {
  const [blockSpam, setBlockSpam] = useState(true)
  const [silenceUnknown, setSilenceUnknown] = useState(true)

  return (
    <div className="space-y-5">
      <header>
        <SectionLabel>Call Shield</SectionLabel>
        <h1 className="font-display text-xl font-bold text-foreground">Spam Call Blocker</h1>
      </header>

      <div className="grid grid-cols-2 gap-2.5">
        <StatChip value="1,284" label="Blocked this month" tone="cyan" />
        <StatChip value="99.4%" label="Detection rate" tone="success" />
      </div>

      <NeonCard className="divide-y divide-border">
        <SettingRow
          title="Block known spam"
          desc="Auto‑reject numbers in the threat database"
          on={blockSpam}
          onChange={setBlockSpam}
        />
        <SettingRow
          title="Silence unknown callers"
          desc="Send unsaved numbers straight to voicemail"
          on={silenceUnknown}
          onChange={setSilenceUnknown}
        />
      </NeonCard>

      <section aria-label="Recently blocked" className="space-y-2">
        <SectionLabel>Recently blocked</SectionLabel>
        <NeonCard className="divide-y divide-border">
          {blocked.map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10">
                <Ban className="h-4 w-4 text-destructive" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm text-foreground">{c.number}</p>
                <p className="truncate text-xs text-muted-foreground">{c.label}</p>
              </div>
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                {c.time}
              </span>
            </div>
          ))}
        </NeonCard>
      </section>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <PhoneOff className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Powered by a live database of 4.2M+ reported scam numbers
      </p>
    </div>
  )
}

function SettingRow({
  title,
  desc,
  on,
  onChange,
}: {
  title: string
  desc: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <Toggle on={on} onChange={onChange} label={title} />
    </div>
  )
}
