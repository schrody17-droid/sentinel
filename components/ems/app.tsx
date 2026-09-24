'use client'

import { BottomNav, type TabId } from '@/components/ems/bottom-nav'
import { StatusBar } from '@/components/ems/status-bar'
import { CallsScreen } from '@/components/ems/screens/calls'
import { DashboardScreen } from '@/components/ems/screens/dashboard'
import { DarkWebScreen } from '@/components/ems/screens/darkweb'
import { MessagesScreen } from '@/components/ems/screens/messages'
import { SubscribeScreen } from '@/components/ems/screens/subscribe'
import { useState } from 'react'

export function EmsApp() {
  const [tab, setTab] = useState<TabId>('dashboard')

  return (
    <div className="relative flex h-full flex-col">
      <StatusBar />
      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-6">
        {tab === 'dashboard' && <DashboardScreen onNavigate={setTab} />}
        {tab === 'calls' && <CallsScreen />}
        {tab === 'messages' && <MessagesScreen />}
        {tab === 'darkweb' && <DarkWebScreen />}
        {tab === 'plan' && <SubscribeScreen />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
