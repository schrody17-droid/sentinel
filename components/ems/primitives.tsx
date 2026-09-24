'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function NeonCard({
  children,
  className,
  glow,
}: {
  children: ReactNode
  className?: string
  glow?: 'cyan' | 'magenta' | 'none'
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm',
        glow === 'cyan' && 'glow-cyan',
        glow === 'magenta' && 'glow-magenta',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80">
      {children}
    </p>
  )
}

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300',
        on
          ? 'border-primary/70 bg-primary/25 glow-cyan'
          : 'border-border bg-muted',
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all duration-300',
          on
            ? 'left-[calc(100%-1.375rem)] bg-primary'
            : 'left-0.5 bg-muted-foreground',
        )}
      />
    </button>
  )
}

export function StatChip({
  value,
  label,
  tone = 'cyan',
}: {
  value: string
  label: string
  tone?: 'cyan' | 'magenta' | 'success' | 'warning'
}) {
  const toneClass = {
    cyan: 'text-primary',
    magenta: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
  }[tone]

  return (
    <div className="flex flex-col rounded-xl border border-border bg-background/50 px-3 py-2.5">
      <span className={cn('font-display text-xl font-bold text-glow', toneClass)}>
        {value}
      </span>
      <span className="mt-0.5 text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
