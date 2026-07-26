"use client"
import * as React from "react"
import { DashboardHero } from "@/components/features/dashboard/dashboard-hero"
import { DashboardKPIs } from "@/components/features/dashboard/dashboard-kpis"
import { TrackedAppsList } from "@/components/features/dashboard/tracked-apps-list"
import { api, type AppStat, type Overview } from "@/lib/api"

export default function Dashboard() {
  const [overview, setOverview] = React.useState<Overview | null>(null)
  const [apps, setApps] = React.useState<AppStat[]>([])

  React.useEffect(() => {
    api.overview().then(setOverview).catch((e) => console.error("Gagal memuat overview:", e))
    api.appStats().then(setApps).catch((e) => console.error("Gagal memuat statistik aplikasi:", e))
  }, [])

  return (
    <div className="max-w-container-max mx-auto space-y-lg">
      <DashboardHero />
      <DashboardKPIs overview={overview} />
      <TrackedAppsList apps={apps} />
    </div>
  )
}
