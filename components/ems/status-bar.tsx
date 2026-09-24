'use client'

import { BatteryFull, SignalHigh, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'

export function StatusBar() {
  const [time, setTime] = useState('9:41')

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
      )
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 font-mono text-xs text-foreground/90">
      <span className="tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5">
        <SignalHigh className="h-3.5 w-3.5" aria-hidden="true" />
        <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
        <BatteryFull className="h-4 w-4 text-success" aria-hidden="true" />
      </div>
    </div>
  )
}
