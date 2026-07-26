import * as React from "react"
import { MetricCard } from "@/components/metric-card"
import type { Overview } from "@/lib/api"

export function DashboardKPIs({ overview }: { overview: Overview | null }) {
  const total = overview?.total_reviews ?? 0
  const positif = overview?.sentiment.positif ?? 0
  const sentimentIndex = total > 0 ? Math.round((positif * 100) / total) : 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      <MetricCard
        title="Aplikasi Terpantau"
        icon="apps"
        value={overview ? String(overview.total_apps) : "…"}
      />
      <MetricCard
        title="Total Ulasan Dianalisis"
        icon="database"
        value={overview ? total.toLocaleString("id-ID") : "…"}
      />
      <MetricCard
        title="Indeks Sentimen Global"
        icon="mood"
        value={overview ? `${sentimentIndex}%` : "…"}
        trendLabel="ulasan positif"
      />
      <MetricCard
        title="Rata-rata Skor"
        icon="star"
        value={overview ? overview.avg_score.toFixed(2) : "…"}
        trendLabel="dari 5.0"
      />
    </div>
  )
}
