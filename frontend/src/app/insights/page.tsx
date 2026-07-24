"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

import { CompareToggle } from "@/components/ui/compare-toggle"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { PageHeader } from "@/components/ui/page-header"
import { SentimentTrendChart } from "@/components/features/insights/sentiment-trend-chart"
import { OverallSentimentChart } from "@/components/features/insights/overall-sentiment-chart"
import { TopKeywordsChart } from "@/components/features/insights/top-keywords-chart"

// Mock data
const sentimentTrendDataApp1 = [
  { date: "Jan 01", Positif: 120, Netral: 40, Negatif: 30 },
  { date: "Jan 08", Positif: 132, Netral: 45, Negatif: 25 },
  { date: "Jan 15", Positif: 101, Netral: 50, Negatif: 20 },
  { date: "Jan 22", Positif: 145, Netral: 35, Negatif: 15 },
  { date: "Jan 29", Positif: 160, Netral: 30, Negatif: 10 },
]

const sentimentTrendDataApp2 = [
  { date: "Jan 01", Positif: 90, Netral: 30, Negatif: 40 },
  { date: "Jan 08", Positif: 85, Netral: 35, Negatif: 50 },
  { date: "Jan 15", Positif: 110, Netral: 40, Negatif: 35 },
  { date: "Jan 22", Positif: 100, Netral: 30, Negatif: 45 },
  { date: "Jan 29", Positif: 125, Netral: 35, Negatif: 30 },
]

const sentimentDistributionDataApp1 = [
  { name: 'Positif', value: 658, color: '#10b981' }, 
  { name: 'Netral', value: 200, color: '#94a3b8' },  
  { name: 'Negatif', value: 100, color: '#ef4444' }, 
]

const sentimentDistributionDataApp2 = [
  { name: 'Positif', value: 510, color: '#10b981' }, 
  { name: 'Netral', value: 170, color: '#94a3b8' },  
  { name: 'Negatif', value: 200, color: '#ef4444' }, 
]

const topKeywordsDataApp1 = [
  { keyword: "harga murah", count: 320, sentiment: "Positif", fill: "#10b981" },
  { keyword: "mudah digunakan", count: 250, sentiment: "Positif", fill: "#10b981" },
  { keyword: "customer service", count: 180, sentiment: "Netral", fill: "#94a3b8" },
  { keyword: "proses refund", count: 150, sentiment: "Negatif", fill: "#ef4444" },
  { keyword: "aplikasi error", count: 120, sentiment: "Negatif", fill: "#ef4444" },
]

const topKeywordsDataApp2 = [
  { keyword: "banyak promo", count: 280, sentiment: "Positif", fill: "#10b981" },
  { keyword: "fitur lengkap", count: 210, sentiment: "Positif", fill: "#10b981" },
  { keyword: "pilihan bayar", count: 190, sentiment: "Netral", fill: "#94a3b8" },
  { keyword: "lambat buka", count: 170, sentiment: "Negatif", fill: "#ef4444" },
  { keyword: "susah login", count: 140, sentiment: "Negatif", fill: "#ef4444" },
]

export default function InsightsPage() {
  const [compareMode, setCompareMode] = React.useState(true)
  const [app1, setApp1] = React.useState("Tiket.com")
  const [app2, setApp2] = React.useState("Traveloka")

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qApp1 = params.get("app1");
    const qApp2 = params.get("app2");
    if (qApp1) setApp1(qApp1);
    if (qApp2) setApp2(qApp2);
  }, []);
  const uniqueApps = ["Tiket.com", "Traveloka", "Agoda"]

  const renderAppCharts = (
    appName: string, 
    setApp: (val: string) => void, 
    trendData: any, 
    distData: any, 
    keywordData: any,
    totalReviews: string,
    avgScore: string,
    positiveRatio: string,
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
          <span className="font-bold text-xl text-on-surface">{totalReviews}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Skor Rata-rata</span>
          <span className="font-bold text-xl text-indigo-500">{avgScore}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Positif</span>
          <span className="font-bold text-xl text-emerald-500">{positiveRatio}</span>
        </div>
      </div>

      <SentimentTrendChart data={trendData} />
      <OverallSentimentChart data={distData} centerText={positiveRatio} />
      <TopKeywordsChart data={keywordData} />
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
          {renderAppCharts(app1, setApp1, sentimentTrendDataApp1, sentimentDistributionDataApp1, topKeywordsDataApp1, "3,567", "4.2", "68%", true)}
          {renderAppCharts(app2, setApp2, sentimentTrendDataApp2, sentimentDistributionDataApp2, topKeywordsDataApp2, "3,566", "3.9", "58%", false)}
        </div>
      ) : (
        /* Single Mode Grid (The original bento grid) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-12 flex justify-end">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-2 shadow-sm text-primary">
              <SearchableSelect value={app1} onChange={setApp1} options={uniqueApps} align="left" />
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <SentimentTrendChart data={sentimentTrendDataApp1} />
          </div>

          <div className="lg:col-span-4">
            <OverallSentimentChart data={sentimentDistributionDataApp1} centerText="68%" />
          </div>

          <div className="lg:col-span-12">
             <TopKeywordsChart data={topKeywordsDataApp1} />
          </div>
        </div>
      )}
    </div>
  )
}
