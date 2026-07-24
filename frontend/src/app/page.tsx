import * as React from "react"
import { MetricCard } from "@/components/metric-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const trackedApps = [
  {
    id: "fintrack",
    name: "FinTrack iOS",
    category: "Finance & Productivity",
    platform: "apple",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt_D2gSbuf4l44B0ykgFfDKP2YrbdiMcv44OM4lmWWhxQIy88cU8HQlDzi82W03ltZSRVrqzvIYocQeYZkDmQXjreJNma96QPCgCAz5eNJdFvbIhPT908iEHj2bfM3ggMnMNaivWSMaptd8LRA5naXiAb13wVe_Q9HqipWIxW6nFd_v8NGTvvIgUEuHz2ckIppzHY_J5xYZcvyqxXLT8yRNJaQ5CDxql9A2ym-LyC6NuF8Fu2vEJ0Ggg",
    rating: "4.8",
    downloads: "12.4k",
    chartHeights: [20, 30, 25, 40, 55, 45, 70, 60, 85, 100],
    platformIcon: "apps"
  },
  {
    id: "healthsync",
    name: "HealthSync",
    category: "Health & Fitness",
    platform: "android",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLMTsbw-CHf1y1BIx0XsrEsv9ezvWMZb8wBpwwVzqyAXRagVh0MgRH_0crahg9wHP-d6d35RdKLoLc_S_BfEGl4CZWvEVjKjA51FBrMAqXfpRu1mkiRoAdU-j1k22C7ZFLDmOeEfcIMO_CTbmXb_RZLQYRFoQVodih-WsMni3emD4IUv7Xt6-z2BCahBKSxkbXQQKDPAbpiYgmDiffb_0DftnneDdJn5C1OVJP5o20Qm4XcIBVKrzBpw",
    rating: "4.5",
    downloads: "8.2k",
    chartHeights: [40, 35, 50, 45, 60, 75, 65, 50, 60, 40],
    platformIcon: "android"
  },
  {
    id: "lenspromax",
    name: "LensPro Max",
    category: "Photo & Video",
    platform: "ios",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUY5f8XW6wOGrnQhjt0Xzubo_5n6Uct2vfdY3Mv6Mxnl7WxMK6ysSAey2BCI9fm_Jog5l-Tc09DAsX0bdFpYOasjBCwmbwcxm7ZkltC-TnTk96jj0cN2W-47NlGgsyHYgjMrdvW-bmfX5OKxW72Jpa_Tmb9hUAvwLHfCQzEXL8NmRd7l1VYLZ0BtkRMaMP0L6ccbPA3eSD7HdUnkm_mf93wjtxJM-XosqCsbuYNbSZ_dimKNoLapkQtA",
    rating: "4.9",
    downloads: "32.1k",
    chartHeights: [60, 70, 65, 80, 85, 75, 90, 95, 85, 100],
    platformIcon: "apps"
  }
]

export default function Dashboard() {
  return (
    <div className="max-w-container-max mx-auto space-y-lg">
      {/* Hero Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-md">
        <div className="flex items-center gap-lg">
          <div className="w-20 h-20 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center border border-outline-variant shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
          </div>
          <div>
            <h2 className="text-display font-display text-on-surface mb-1">Platform Overview</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-surface-variant font-body-sm text-body-sm">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">database</span> Multiple App Sources</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">smart_toy</span> AI Sentiment Active</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-label-sm text-label-sm text-on-surface-variant mb-2">Dataset: Universal Play Store</div>
          <Button className="gap-2"><span className="material-symbols-outlined text-[18px]">sync</span> Run Master Sync</Button>
        </div>
      </div>

      {/* KPI Cards */}
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

      {/* Tracked Apps Grid */}
      <div className="pt-4">
        <div className="flex justify-between items-center mb-md">
          <h2 className="font-h2 text-h2 text-on-surface">Tracked Applications</h2>
          <Button variant="secondary" className="gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add App
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
          {trackedApps.map((app) => (
            <Link href="/insights" key={app.id} className="group outline-none">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md transition-all duration-200 group-hover:shadow-md group-hover:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-primary h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                
                <div className="flex items-start justify-between border-b border-outline-variant pb-sm relative z-10">
                  <div className="flex items-center gap-3">
                    <img 
                      className={`w-12 h-12 shadow-sm object-cover ${app.platformIcon === 'android' ? 'rounded-full' : 'rounded-[10px]'}`} 
                      src={app.icon} 
                      alt={app.name} 
                    />
                    <div>
                      <h3 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">{app.name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{app.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="material-symbols-outlined text-on-surface-muted text-[20px]">{app.platformIcon}</span>
                    <span className="material-symbols-outlined text-primary text-[18px] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">arrow_forward</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Current Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="font-h2 text-h2 text-on-surface">{app.rating}</span>
                      <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Downloads</span>
                    <span className="font-h3 text-h3 text-on-surface">{app.downloads}</span>
                  </div>
                </div>
                
                <div className="mt-sm h-12 w-full flex items-end justify-between gap-1 relative z-10">
                  {app.chartHeights.map((height, i) => (
                    <div 
                      key={i}
                      className={`w-full rounded-t-sm transition-all duration-300 ${i === app.chartHeights.length - 1 ? 'bg-primary group-hover:bg-primary-container' : 'bg-primary-fixed group-hover:bg-primary/40'}`}
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
