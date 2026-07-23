import * as React from "react"
import { MetricCard } from "@/components/metric-card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="max-w-container-max mx-auto space-y-lg">
      {/* Hero Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-md">
        <div className="flex items-center gap-lg">
          <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center border border-outline-variant shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>insert_chart</span>
          </div>
          <div>
            <h2 className="text-display font-display text-on-surface mb-1">AnalyticsPro</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-surface-variant font-body-sm text-body-sm">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">code</span> Zenith Labs</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">category</span> Productivity</span>
              <span className="flex items-center gap-1 text-tertiary-container"><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">download</span> 1.2M</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-label-sm text-label-sm text-on-surface-variant mb-2">Last Updated: 2 days ago</div>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        <MetricCard
          title="Average Rating"
          icon="star"
          value="4.8"
          subValue="/ 5.0"
          trend="+0.2"
          trendLabel="this month"
          trendUp={true}
        />
        <MetricCard
          title="Total Reviews"
          icon="rate_review"
          value="12.4k"
          trend="+850"
          trendLabel="this week"
          trendUp={true}
        />
        <MetricCard
          title="Downloads"
          icon="download"
          value="1.2M"
          trend="+15%"
          trendLabel="vs last month"
          trendUp={true}
        />
        <MetricCard
          title="Sentiment Score"
          icon="mood"
          value="92%"
        >
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-1">
            <div className="bg-primary-container h-full rounded-full" style={{ width: "92%" }}></div>
          </div>
        </MetricCard>
      </div>
    </div>
  )
}
