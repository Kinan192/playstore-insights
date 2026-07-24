import * as React from "react"
import { DashboardHero } from "@/components/features/dashboard/dashboard-hero"
import { DashboardKPIs } from "@/components/features/dashboard/dashboard-kpis"
import { TrackedAppsList } from "@/components/features/dashboard/tracked-apps-list"

export default function Dashboard() {
  return (
    <div className="max-w-container-max mx-auto space-y-lg">
      <DashboardHero />
      <DashboardKPIs />
      <TrackedAppsList />
    </div>
  )
}
