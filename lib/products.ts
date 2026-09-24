export interface Plan {
  id: string
  name: string
  description: string
  priceInCents: number
  interval: "month" | "year"
  trialPeriodDays?: number
}

// Source of truth for all billing plans.
// The server validates the price from this catalog — the client only sends the plan id.
export const PLANS: Plan[] = [
  {
    id: "ems-premium-monthly",
    name: "EMS Premium",
    description:
      "Unlimited spam & robocall blocking, AI scam text filtering, unlimited dark web identity scans, 24/7 breach monitoring, and protection for up to 5 devices.",
    priceInCents: 999, // $9.99
    interval: "month",
    trialPeriodDays: 7,
  },
]

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}
