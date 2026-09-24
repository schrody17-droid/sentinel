"use server"

import { stripe } from "@/lib/stripe"
import { getPlan } from "@/lib/products"

export async function startSubscriptionSession(planId: string) {
  const plan = getPlan(planId)
  if (!plan) {
    throw new Error(`Plan with id "${planId}" not found`)
  }

  const session = await stripe.checkout.sessions.create({
    // `embedded_page` replaced `embedded` in Stripe API 2026-03-25.dahlia (stripe-node v21+).
    ui_mode: "embedded_page",
    redirect_on_completion: "never",
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.name,
            description: plan.description,
          },
          unit_amount: plan.priceInCents,
          recurring: {
            interval: plan.interval,
          },
        },
        quantity: 1,
      },
    ],
    ...(plan.trialPeriodDays
      ? { subscription_data: { trial_period_days: plan.trialPeriodDays } }
      : {}),
  })

  return session.client_secret
}
