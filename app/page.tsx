import { EmsApp } from '@/components/ems/app'

export default function Page() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-0 sm:p-6">
      {/* ambient electric backdrop for larger screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-60 sm:block cyber-grid"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 hidden h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 hidden h-72 w-72 rounded-full bg-accent/20 blur-3xl sm:block"
      />

      {/* phone frame */}
      <div className="relative z-10 flex h-svh w-full flex-col overflow-hidden bg-background sm:h-[860px] sm:max-h-[92vh] sm:w-[400px] sm:rounded-[2.75rem] sm:border sm:border-border sm:shadow-2xl sm:shadow-primary/10 sm:ring-1 sm:ring-primary/20">
        <EmsApp />
      </div>
    </div>
  )
}
