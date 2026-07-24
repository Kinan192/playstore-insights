import * as React from "react"
import { MetricCard } from "@/components/metric-card"

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      <MetricCard
        title="Aplikasi Terpantau"
        icon="apps"
        value="12"
        trend="+2"
        trendLabel="bulan ini"
        trendUp={true}
      />
      <MetricCard
        title="Total Ulasan Dianalisis"
        icon="database"
        value="24.5k"
        trend="+1.2k"
        trendLabel="minggu ini"
        trendUp={true}
      />
      <MetricCard
        title="Indeks Sentimen Global"
        icon="mood"
        value="78%"
        trend="+5%"
        trendLabel="vs bulan lalu"
        trendUp={true}
      />
      <MetricCard
        title="Scraper Aktif"
        icon="memory"
        value="Online"
      >
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-body-sm text-on-surface-variant">2 tugas berjalan</span>
        </div>
      </MetricCard>
    </div>
  )
}
