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
  { date: "Jan 01", Positive: 120, Neutral: 40, Negative: 30 },
  { date: "Jan 08", Positive: 132, Neutral: 45, Negative: 25 },
  { date: "Jan 15", Positive: 101, Neutral: 50, Negative: 20 },
  { date: "Jan 22", Positive: 145, Neutral: 35, Negative: 15 },
  { date: "Jan 29", Positive: 160, Neutral: 30, Negative: 10 },
]

const sentimentTrendDataApp2 = [
  { date: "Jan 01", Positive: 90, Neutral: 30, Negative: 40 },
  { date: "Jan 08", Positive: 85, Neutral: 35, Negative: 50 },
  { date: "Jan 15", Positive: 110, Neutral: 40, Negative: 35 },
  { date: "Jan 22", Positive: 100, Neutral: 30, Negative: 45 },
  { date: "Jan 29", Positive: 125, Neutral: 35, Negative: 30 },
]

const sentimentDistributionDataApp1 = [
  { name: 'Positive', value: 658, color: '#10b981' }, 
  { name: 'Neutral', value: 200, color: '#94a3b8' },  
  { name: 'Negative', value: 100, color: '#ef4444' }, 
]

const sentimentDistributionDataApp2 = [
  { name: 'Positive', value: 510, color: '#10b981' }, 
  { name: 'Neutral', value: 170, color: '#94a3b8' },  
  { name: 'Negative', value: 200, color: '#ef4444' }, 
]

const topKeywordsDataApp1 = [
  { keyword: "harga murah", count: 320, sentiment: "Positive", fill: "#10b981" },
  { keyword: "mudah digunakan", count: 250, sentiment: "Positive", fill: "#10b981" },
  { keyword: "customer service", count: 180, sentiment: "Neutral", fill: "#94a3b8" },
  { keyword: "proses refund", count: 150, sentiment: "Negative", fill: "#ef4444" },
  { keyword: "aplikasi error", count: 120, sentiment: "Negative", fill: "#ef4444" },
]

const topKeywordsDataApp2 = [
  { keyword: "banyak promo", count: 280, sentiment: "Positive", fill: "#10b981" },
  { keyword: "fitur lengkap", count: 210, sentiment: "Positive", fill: "#10b981" },
  { keyword: "pilihan bayar", count: 190, sentiment: "Neutral", fill: "#94a3b8" },
  { keyword: "lambat buka", count: 170, sentiment: "Negative", fill: "#ef4444" },
  { keyword: "susah login", count: 140, sentiment: "Negative", fill: "#ef4444" },
]

export default function InsightsPage() {
  const [compareMode, setCompareMode] = React.useState(true)
  const [app1, setApp1] = React.useState("Tiket.com")
  const [app2, setApp2] = React.useState("Traveloka")
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
          <span className="font-label-sm text-label-sm text-on-surface-variant">Total Reviews</span>
          <span className="font-bold text-xl text-on-surface">{totalReviews}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Avg Score</span>
          <span className="font-bold text-xl text-indigo-500">{avgScore}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-sm flex flex-col items-center justify-center">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Positive</span>
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
        title="Data-Driven Insights" 
        description="Aggregated NLP analytics from your processed datasets."
      >
        <CompareToggle checked={compareMode} onChange={setCompareMode} />
        <Button variant="secondary" className="gap-2 bg-surface hover:bg-surface-container-low">
          <span className="material-symbols-outlined text-[18px]">download</span> Export
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
