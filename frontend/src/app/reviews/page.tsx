"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CompareToggle } from "@/components/ui/compare-toggle"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { PageHeader } from "@/components/ui/page-header"
import { ReviewTable } from "@/components/features/reviews/review-table"
import { AddAppModal } from "@/components/features/reviews/add-app-modal"
import { api, sentimentLabel, type AppStat, type Review } from "@/lib/api"

const RATING_OPTIONS = ["Semua Peringkat", "5 Bintang", "4 Bintang", "3 Bintang", "2 Bintang", "1 Bintang"]
const SENTIMENT_OPTIONS = ["Semua Sentimen", "Positif", "Netral", "Negatif"]

function toRowData(reviews: Review[], appNames: Map<number, string>) {
  return reviews.map((r) => ({
    id: r.id,
    appName: appNames.get(r.app_id) ?? `App #${r.app_id}`,
    user: {
      name: r.user_name,
      avatar: r.user_avatar ?? "",
      initials: r.user_name.slice(0, 2).toUpperCase(),
      meta: "Play Store",
    },
    rating: r.score,
    title: "",
    content: r.content,
    sentiment: sentimentLabel(r.sentiment),
    date: new Date(r.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
  }))
}

export default function ReviewsPage() {
  const [compareMode, setCompareMode] = React.useState(false)
  const [isSyncing, setIsSyncing] = React.useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)

  const [apps, setApps] = React.useState<AppStat[]>([])
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [total, setTotal] = React.useState(0)

  const [app1, setApp1] = React.useState("Semua Aplikasi")
  const [app2, setApp2] = React.useState("")
  const [ratingFilter, setRatingFilter] = React.useState("Semua Peringkat")
  const [sentimentFilter, setSentimentFilter] = React.useState("Semua Sentimen")
  const [search, setSearch] = React.useState("")

  const appNames = React.useMemo(() => new Map(apps.map((a) => [a.id, a.name])), [apps])
  const uniqueApps = apps.map((a) => a.name)

  const loadApps = React.useCallback(async () => {
    try {
      const data = await api.appStats()
      setApps(data)
      if (data.length > 0 && !app2) setApp2(data[Math.min(1, data.length - 1)].name)
    } catch (e) {
      console.error("Gagal memuat daftar aplikasi:", e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadReviews = React.useCallback(async () => {
    try {
      const params: Parameters<typeof api.reviews>[0] = { limit: 200 }
      if (!compareMode && app1 !== "Semua Aplikasi") {
        const found = apps.find((a) => a.name === app1)
        if (found) params.app_id = found.id
      }
      if (sentimentFilter !== "Semua Sentimen") params.sentiment = sentimentFilter.toLowerCase()
      if (ratingFilter !== "Semua Peringkat") params.score = parseInt(ratingFilter)
      if (search.trim()) params.q = search.trim()
      const data = await api.reviews(params)
      setReviews(data.items)
      setTotal(data.total)
    } catch (e) {
      console.error("Gagal memuat ulasan:", e)
    }
  }, [apps, app1, compareMode, sentimentFilter, ratingFilter, search])

  React.useEffect(() => { loadApps() }, [loadApps])
  React.useEffect(() => {
    const t = setTimeout(loadReviews, search ? 400 : 0) // debounce untuk pencarian
    return () => clearTimeout(t)
  }, [loadReviews, search])

  const handleAddApp = async (appId: string, title: string, count: string, region: string) => {
    setIsSyncing(true)
    try {
      const res = await api.triggerScrape({ app_id: appId, title, count: parseInt(count) || 100, region })
      // poll review count sampai berhenti naik (2x poll stabil) atau max 60 detik
      let last = -1
      let stable = 0
      for (let i = 0; i < 20 && stable < 2; i++) {
        await new Promise((r) => setTimeout(r, 3000))
        const { review_count } = await api.scrapeStatus(res.app_id)
        stable = review_count === last ? stable + 1 : 0
        last = review_count
      }
      await loadApps()
      await loadReviews()
    } catch (e) {
      console.error("Gagal menarik data ulasan:", e)
    } finally {
      setIsSyncing(false)
    }
  }

  const rows = React.useMemo(() => toRowData(reviews, appNames), [reviews, appNames])

  return (
    <div className="max-w-container-max mx-auto space-y-lg">
      <PageHeader
        title="Manajemen Ulasan"
        description={`Analisis dan tanggapi umpan balik pengguna. ${total} ulasan tersimpan.`}
      >
        <Button onClick={() => setIsAddModalOpen(true)} disabled={isSyncing} className="gap-2 rounded-full px-5 h-10 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">{isSyncing ? "sync" : "add"}</span>
          {isSyncing ? "Menarik data..." : "Tarik Data Aplikasi"}
        </Button>
        <Button variant="secondary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Ekspor
        </Button>
      </PageHeader>

      {/* Compare Mode Toggle */}
      <div className="flex justify-end">
        <CompareToggle
          checked={compareMode}
          onChange={setCompareMode}
          label="Mode Banding Layar Terbagi"
        />
      </div>

      {isSyncing && (
        <Alert className="shadow-sm border-outline-variant">
          <span className="material-symbols-outlined text-primary animate-spin">sync</span>
          <div className="flex-1">
            <AlertTitle>Menarik data ulasan…</AlertTitle>
            <AlertDescription className="text-on-surface-variant">
              Scraping dan analisis sentimen berjalan di latar belakang. Tabel akan diperbarui otomatis.
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex flex-wrap items-center gap-3 shadow-sm relative z-20">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Saring ulasan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<span className="material-symbols-outlined text-sm">filter_list</span>}
            className="bg-surface-container-low border-none focus-visible:ring-primary-container/50"
          />
        </div>
        <div className="h-6 w-px bg-outline-variant hidden md:block mx-1"></div>
        {!compareMode && (
          <div className="text-primary border-r border-outline-variant pr-3 hidden md:block">
            <SearchableSelect
              value={app1}
              onChange={setApp1}
              options={["Semua Aplikasi", ...uniqueApps]}
            />
          </div>
        )}
        <SearchableSelect
          value={ratingFilter}
          onChange={setRatingFilter}
          options={RATING_OPTIONS}
          showSearch={false}
          className="text-on-surface"
        />
        <SearchableSelect
          value={sentimentFilter}
          onChange={setSentimentFilter}
          options={SENTIMENT_OPTIONS}
          showSearch={false}
          className="text-on-surface"
        />
      </div>

      {/* Reviews Table Container */}
      <div className={`grid gap-md relative z-10 ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Main/Left Table */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
          {compareMode && (
            <div className="bg-surface-container-low border-b border-outline-variant p-2 text-primary flex items-center justify-center">
              <SearchableSelect value={app1 === "Semua Aplikasi" ? (uniqueApps[0] ?? "") : app1} onChange={setApp1} options={uniqueApps} align="center" />
            </div>
          )}
          <ReviewTable
            data={compareMode ? rows.filter((r) => r.appName === (app1 === "Semua Aplikasi" ? uniqueApps[0] : app1)) : rows}
            showAppColumn={!compareMode}
          />
        </div>

        {/* Right Table (Compare Mode Only) */}
        {compareMode && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
            <div className="bg-surface-container-low border-b border-outline-variant p-2 text-indigo-600 flex items-center justify-center">
              <SearchableSelect value={app2} onChange={setApp2} options={uniqueApps} align="center" />
            </div>
            <ReviewTable data={rows.filter((r) => r.appName === app2)} showAppColumn={false} />
          </div>
        )}
      </div>

      <AddAppModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddApp}
      />
    </div>
  )
}
