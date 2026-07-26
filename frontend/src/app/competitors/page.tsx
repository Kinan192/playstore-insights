"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { MarketShareChart } from "@/components/features/competitors/market-share-chart"
import { SentimentComparisonChart } from "@/components/features/competitors/sentiment-comparison-chart"
import { CompetitorComparisonTable } from "@/components/features/competitors/competitor-comparison-table"
import { AddAppModal } from "@/components/features/reviews/add-app-modal"
import { api, type AppStat } from "@/lib/api"

const COLORS = ["#2563eb", "#4f46e5", "#059669", "#d97706", "#dc2626", "#7c3aed"]
const BG_COLORS = ["bg-blue-600", "bg-indigo-600", "bg-emerald-600", "bg-amber-600", "bg-red-600", "bg-violet-600"]

export default function Competitors() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isSyncing, setIsSyncing] = React.useState(false)
  const [apps, setApps] = React.useState<AppStat[]>([])
  const [hidden, setHidden] = React.useState<Set<number>>(new Set())

  const load = React.useCallback(() => {
    api.appStats().then(setApps).catch((e) => console.error("Gagal memuat statistik aplikasi:", e))
  }, [])
  React.useEffect(load, [load])

  const visible = apps.filter((a) => !hidden.has(a.id))
  const grandTotal = visible.reduce((s, a) => s + a.review_count, 0) || 1

  const marketShareData = visible.map((a, i) => ({
    name: a.name,
    value: Math.round((a.review_count * 1000) / grandTotal) / 10,
    count: a.review_count,
    color: COLORS[i % COLORS.length],
  }))

  const tableData = visible.map((a, i) => {
    const total = a.review_count || 1
    return {
      id: String(a.id),
      name: a.name,
      initial: a.name.slice(0, 2).toUpperCase(),
      color: BG_COLORS[i % BG_COLORS.length],
      subtitle: a.developer ?? "Play Store",
      rating: a.avg_score,
      reviews: a.review_count.toLocaleString("id-ID"),
      growth: "",
      growthPositive: a.positive_ratio >= 50,
      sentimentScore: Math.round(a.positive_ratio),
      trend: a.positive_ratio >= 50 ? "trending_up" : "trending_down",
      positive: Math.round((a.sentiment.positif * 100) / total),
      neutral: Math.round((a.sentiment.netral * 100) / total),
      negative: Math.round((a.sentiment.negatif * 100) / total),
    }
  })

  const sentimentChartData = tableData.map((app) => ({
    name: app.name,
    Positif: app.positive,
    Netral: app.neutral,
    Negatif: app.negative,
    totalReviews: parseInt(app.reviews.replace(/[.,]/g, "")) || 0,
  }))

  // ponytail: "remove" hanya sembunyikan di UI — tambah DELETE /api/apps bila perlu hapus permanen
  const handleRemove = (id: string) => setHidden((prev) => new Set(prev).add(parseInt(id)))

  const handleAddCompetitor = async (appId: string, title: string, count: string, region: string) => {
    setIsSyncing(true)
    try {
      const res = await api.triggerScrape({ app_id: appId, title, count: parseInt(count) || 100, region })
      let last = -1
      let stable = 0
      for (let i = 0; i < 20 && stable < 2; i++) {
        await new Promise((r) => setTimeout(r, 3000))
        const { review_count } = await api.scrapeStatus(res.app_id)
        stable = review_count === last ? stable + 1 : 0
        last = review_count
      }
      load()
    } catch (e) {
      console.error("Gagal menambah kompetitor:", e)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="max-w-container-max mx-auto">
      <PageHeader
        title="Analisis Kompetitor"
        description="Perbandingan langsung antar aplikasi terpantau."
      >
        <Link href={`/insights?app1=${encodeURIComponent(visible[0]?.name || "")}&app2=${encodeURIComponent(visible[1]?.name || "")}`}>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border-none">
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
            Wawasan Mendalam
          </Button>
        </Link>
        <Button variant="secondary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Ekspor Laporan
        </Button>
      </PageHeader>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-lg">
        <MarketShareChart
          data={marketShareData}
          centerText={visible.length ? String(visible.length) : "-"}
          centerSubText="Share of Voice"
        />
        <SentimentComparisonChart
          data={sentimentChartData}
        />
      </div>

      {/* Comparison Table Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col w-full overflow-hidden mb-lg">
        <div className="p-md border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-bright gap-4">
          <div>
            <h2 className="font-h3 text-h3 text-on-surface">Core Metrics Comparison</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Perbandingan performa detail antar aplikasi</p>
          </div>
          <div className="flex items-center gap-3 w-full xl:w-auto mt-4 md:mt-0">
            <Button onClick={() => setIsAddModalOpen(true)} disabled={isSyncing} className="gap-2 rounded-full w-full md:w-auto shadow-sm">
              <span className="material-symbols-outlined text-[18px]">{isSyncing ? "sync" : "add"}</span>
              {isSyncing ? "Menarik data..." : "Add Competitor"}
            </Button>
          </div>
        </div>

        <CompetitorComparisonTable data={tableData} onDelete={handleRemove} />
      </div>

      <AddAppModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCompetitor}
      />
    </div>
  )
}
