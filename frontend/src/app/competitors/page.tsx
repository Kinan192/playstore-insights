"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { MarketShareChart } from "@/components/features/competitors/market-share-chart"
import { SentimentComparisonChart } from "@/components/features/competitors/sentiment-comparison-chart"
import { CompetitorComparisonTable } from "@/components/features/competitors/competitor-comparison-table"

const marketShareData = [
  { name: "Your App", value: 24, color: "#2563eb" },
  { name: "Nova Analytics", value: 38, color: "#4f46e5" },
  { name: "Pulse Metrics", value: 15, color: "#f43f5e" },
  { name: "OmniTrack", value: 12, color: "#475569" },
  { name: "Others", value: 11, color: "#cbd5e1" },
]

const sentimentData = [
  { name: "Your App", Positive: 82, Neutral: 12, Negative: 6 },
  { name: "Nova Analytics", Positive: 75, Neutral: 15, Negative: 10 },
  { name: "Pulse Metrics", Positive: 68, Neutral: 20, Negative: 12 },
  { name: "OmniTrack", Positive: 45, Neutral: 35, Negative: 20 },
]

export default function Competitors() {
  const [compareInput, setCompareInput] = React.useState("")
  
  const handleCompare = () => {
    if (!compareInput) return
    alert(`Searching and adding competitor: ${compareInput}`)
    setCompareInput("")
  }

  return (
    <div className="max-w-container-max mx-auto">
      <PageHeader 
        title="Competitor Analysis" 
        description="Benchmarking your app against top market alternatives."
      >
        <Button variant="secondary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </Button>
        <Button className="gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Competitor
        </Button>
      </PageHeader>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-lg">
        <MarketShareChart 
          data={marketShareData} 
          centerText="24%" 
          centerSubText="Your App" 
        />
        <SentimentComparisonChart 
          data={sentimentData} 
        />
      </div>

      {/* Comparison Table Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col w-full overflow-hidden mb-lg">
        <div className="p-md border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-bright gap-4">
          <div>
            <h2 className="font-h3 text-h3 text-on-surface">Core Metrics Comparison</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Detailed performance breakdown vs top competitors</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* NEW FEATURE: App Comparison Input with Fetch Limit */}
            <div className="flex-1 flex gap-2 items-center bg-surface-container-low rounded-lg p-1 pr-2 border border-outline-variant">
              <Input 
                placeholder="App Name (e.g. Agoda)" 
                value={compareInput}
                onChange={(e) => setCompareInput(e.target.value)}
                icon={<span className="material-symbols-outlined text-sm">search</span>}
                className="border-none bg-transparent w-40"
              />
              <div className="w-px h-6 bg-outline-variant mx-1 hidden sm:block"></div>
              <Input 
                type="number"
                placeholder="Count"
                defaultValue={1000}
                className="border-none bg-transparent w-24 hidden sm:block px-2 text-center"
                title="Reviews to fetch"
              />
              <Button size="icon" onClick={handleCompare} disabled={!compareInput} className="h-8 w-8 ml-1 shrink-0">
                <span className="material-symbols-outlined text-sm">add</span>
              </Button>
            </div>
            <button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-secondary-fixed transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>
        
        <CompetitorComparisonTable />
      </div>
    </div>
  )
}
