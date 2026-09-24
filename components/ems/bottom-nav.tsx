'use client'

import { cn } from '@/lib/utils'
import { Crown, PhoneOff, Radar, ScanSearch, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type TabId = 'dashboard' | 'calls' | 'messages' | 'darkweb' | 'plan'

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Shield', icon: ShieldCheck },
  { id: 'calls', label: 'Calls', icon: PhoneOff },
  { id: 'messages', label: 'Texts', icon: Radar },
  { id: 'darkweb', label: 'Dark Web', icon: ScanSearch },
  { id: 'plan', label: 'Plan', icon: Crown },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <nav
      aria-label="Primary"
      className="border-t border-border bg-background/90 px-2 pt-2 pb-3 backdrop-blur-md"
    >
      <ul className="flex items-stretch justify-between">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1 rounded-xl py-1.5 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg transition-all',
                    isActive && 'bg-primary/15 glow-cyan',
                  )}
                >
                  <Icon
                    className={cn('h-5 w-5', isActive && 'text-glow')}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[10px] font-medium tracking-wide">
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
