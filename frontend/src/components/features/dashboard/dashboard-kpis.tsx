import * as React from "react"
import { MetricCard } from "@/components/metric-card"

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      <MetricCard
        title="Apps Monitored"
        icon="apps"
        value="12"
        trend="+2"
        trendLabel="this month"
        trendUp={true}
      />
      <MetricCard
        title="Total Reviews Analyzed"
        icon="database"
        value="24.5k"
        trend="+1.2k"
        trendLabel="this week"
        trendUp={true}
      />
      <MetricCard
        title="Global Sentiment Index"
        icon="mood"
        value="78%"
        trend="+5%"
        trendLabel="vs last month"
        trendUp={true}
      />
      <MetricCard
        title="Active Scrapers"
        icon="memory"
        value="Online"
      >
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          <span className="text-body-sm text-on-surface-variant">2 jobs running</span>
        </div>
      </MetricCard>
    </div>
  )
}
