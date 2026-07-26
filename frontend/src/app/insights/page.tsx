"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

import { CompareToggle } from "@/components/ui/compare-toggle"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { PageHeader } from "@/components/ui/page-header"
import { SentimentTrendChart } from "@/components/features/insights/sentiment-trend-chart"
import { OverallSentimentChart } from "@/components/features/insights/overall-sentiment-chart"
import { TopKeywordsChart } from "@/components/features/insights/top-keywords-chart"
import { api, type AppStat, type TrendRow, type Keyword } from "@/lib/api"

const SENT_COLORS: Record<string, string> = { positif: "#10b981", netral: "#94a3b8", negatif: "#ef4444" }
const LABEL: Record<string, string> = { positif: "Positif", netral: "Netral", negatif: "Negatif" }

interface AppInsight {
  trend: { date: string; Positif: number; Netral: number; Negatif: number }[]
  dist: { name: string; value: number; color: string }[]
  keywords: { keyword: string; count: number; sentiment: string; fill: string }[]
  totalReviews: string
  avgScore: string
  positiveRatio: string
}

const EMPTY: AppInsight = { trend: [], dist: [], keywords: [], totalReviews: "-", avgScore: "-", positiveRatio: "-" }

async function loadInsight(app: AppStat): Promise<AppInsight> {
  const [trendRows, keywords] = await Promise.all([
    api.trend([app.id], 90),
    api.keywords(app.id),
  ])
  return {
    trend: trendRows.map((r: TrendRow) => ({
      date: new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      Positif: r.positif,
      Netral: r.netral,
      Negatif: r.negatif,
    })),
    dist: (["positif", "netral", "negatif"] as const).map((k) => ({
      name: LABEL[k],
      value: app.sentiment[k],
      color: SENT_COLORS[k],
    })),
    keywords: keywords.map((k: Keyword) => ({
      keyword: k.keyword,
      count: k.count,
      sentiment: LABEL[k.sentiment] ?? k.sentiment,
      fill: SENT_COLORS[k.sentiment] ?? "#94a3b8",
    })),
    totalReviews: app.review_count.toLocaleString("id-ID"),
    avgScore: app.avg_score.toFixed(1),
    positiveRatio: `${Math.round(app.positive_ratio)}%`,
  }
}

export default function InsightsPage() {
  const [compareMode, setCompareMode] = React.useState(true)
  const [apps, setApps] = React.useState<AppStat[]>([])
  const [app1, setApp1] = React.useState("")
  const [app2, setApp2] = React.useState("")
  const [insight1, setInsight1] = React.useState<AppInsight>(EMPTY)
  const [insight2, setInsight2] = React.useState<AppInsight>(EMPTY)

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const qApp1 = params.get("app1")
    const qApp2 = params.get("app2")
    api.appStats().then((data) => {
      setApps(data)
      setApp1(qApp1 || data[0]?.name || "")
      setApp2(qApp2 || data[1]?.name || data[0]?.name || "")
    }).catch((e) => console.error("Gagal memuat daftar aplikasi:", e))
  }, [])

  React.useEffect(() => {
    const found = apps.find((a) => a.name === app1)
    if (found) loadInsight(found).then(setInsight1).catch((e) => console.error("Gagal memuat insight:", e))
  }, [apps, app1])

  React.useEffect(() => {
    const found = apps.find((a) => a.name === app2)
    if (found) loadInsight(found).then(setInsight2).catch((e) => console.error("Gagal memuat insight:", e))
  }, [apps, app2])

  const uniqueApps = apps.map((a) => a.name)

  const renderAppCharts = (
    appName: string,
    setApp: (val: string) => void,
    insight: AppInsight,
    isApp1: boolean
  ) => (
    <div className="flex flex-col gap-lg h-full">
      {/* App Header Dropdown */}
      <div className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex items-center justify-center text-lg ${isApp1 ? 'text-primary' : 'text-indigo-600'}`}>
        <SearchableSelect value={appName} onChange={setApp} options={uniqueApps} align="center" />
      </div>

      {/* Mini Metrics for this App */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Total Ulasan</span>
          <span className="font-bold text-xl text-on-surface">{insight.totalReviews}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Skor Rata-rata</span>
          <span className="font-bold text-xl text-indigo-500">{insight.avgScore}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Positif</span>
          <span className="font-bold text-xl text-emerald-500">{insight.positiveRatio}</span>
        </div>
      </div>

      <SentimentTrendChart data={insight.trend} />
      <OverallSentimentChart data={insight.dist} centerText={insight.positiveRatio} />
      <TopKeywordsChart data={insight.keywords} />
    </div>
  )

  return (
    <div className="max-w-container-max mx-auto space-y-lg w-full">
      <PageHeader
        title="Wawasan Berbasis Data"
        description="Analitik NLP agregat dari kumpulan data yang diproses."
      >
        <CompareToggle checked={compareMode} onChange={setCompareMode} />
        <Button variant="secondary" className="gap-2 bg-surface hover:bg-surface-container-low">
          <span className="material-symbols-outlined text-[18px]">download</span> Ekspor
        </Button>
      </PageHeader>

      {compareMode ? (
        /* Compare Mode Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-md items-stretch">
          {renderAppCharts(app1, setApp1, insight1, true)}
          {renderAppCharts(app2, setApp2, insight2, false)}
        </div>
      ) : (
        /* Single Mode Grid (bento) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-12 flex justify-end">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-2 shadow-sm text-primary">
              <SearchableSelect value={app1} onChange={setApp1} options={uniqueApps} align="left" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <SentimentTrendChart data={insight1.trend} />
          </div>

          <div className="lg:col-span-4">
            <OverallSentimentChart data={insight1.dist} centerText={insight1.positiveRatio} />
          </div>

          <div className="lg:col-span-12">
            <TopKeywordsChart data={insight1.keywords} />
          </div>
        </div>
      )}
    </div>
  )
}
