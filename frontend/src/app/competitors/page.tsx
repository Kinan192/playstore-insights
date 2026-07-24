"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/ui/page-header"
import { MarketShareChart } from "@/components/features/competitors/market-share-chart"
import { SentimentComparisonChart } from "@/components/features/competitors/sentiment-comparison-chart"
import { CompetitorComparisonTable } from "@/components/features/competitors/competitor-comparison-table"

// Initial Mock Data representing Tiket.com vs Traveloka
const initialMarketShare = [
  { name: "Tiket.com", value: 45, color: "#2563eb" },
  { name: "Traveloka", value: 55, color: "#4f46e5" },
]

const initialTableData = [
  {
    id: "tiket",
    name: "Tiket.com",
    initial: "T",
    color: "bg-blue-600",
    subtitle: "Baseline App",
    rating: 4.6,
    reviews: "12,450",
    growth: "+15.2%",
    growthPositive: true,
    sentimentScore: 85,
    trend: "trending_up",
    positive: 85,
    neutral: 10,
    negative: 5
  },
  {
    id: "traveloka",
    name: "Traveloka",
    initial: "TV",
    color: "bg-indigo-600",
    subtitle: "Primary Competitor",
    rating: 4.5,
    reviews: "45,200",
    growth: "-2.4%",
    growthPositive: false,
    sentimentScore: 78,
    trend: "trending_down",
    positive: 78,
    neutral: 15,
    negative: 7
  }
]

export default function Competitors() {
  const [compareInput, setCompareInput] = React.useState("")
  const [fetchCount, setFetchCount] = React.useState("1000")
  
  // States to hold the interactive data
  const [marketShareData, setMarketShareData] = React.useState(initialMarketShare)
  const [tableData, setTableData] = React.useState(initialTableData)
  
  const handleCompare = () => {
    if (!compareInput) return
    
    // Create a mock object for the new competitor (e.g. Agoda)
    const newAppName = compareInput.trim()
    const newAppInitial = newAppName.substring(0, 2).toUpperCase()
    
    // Add to Market Share (adjusting values slightly to look realistic)
    const newMarketShare = [
      { name: "Tiket.com", value: 35, color: "#2563eb" },
      { name: "Traveloka", value: 45, color: "#4f46e5" },
      { name: newAppName, value: 20, color: "#059669" } // Emerald green
    ]
    
    // Add to Table / Sentiment Data
    const newAppTableData = {
      id: newAppName.toLowerCase().replace(/\s+/g, '-'),
      name: newAppName,
      initial: newAppInitial,
      color: "bg-emerald-600",
      subtitle: "New Competitor",
      rating: (Math.random() * (4.9 - 3.5) + 3.5).toFixed(1), // Random rating between 3.5 and 4.9
      reviews: fetchCount,
      growth: "+5.0%",
      growthPositive: true,
      sentimentScore: Math.floor(Math.random() * (90 - 60) + 60),
      trend: "trending_up",
      positive: Math.floor(Math.random() * (85 - 50) + 50),
      neutral: 15,
      negative: Math.floor(Math.random() * (20 - 5) + 5)
    }
    
    setMarketShareData(newMarketShare)
    setTableData([...tableData, newAppTableData as any])
    setCompareInput("")
  }

  const handleRemove = (idToRemove: string) => {
    // Keep baseline apps, only filter out the newly added ones
    setTableData(tableData.filter(app => app.id === idToRemove ? false : true))
    // Also remove from market share by name
    const appToRemove = tableData.find(app => app.id === idToRemove)?.name
    if (appToRemove) {
      setMarketShareData(marketShareData.filter(app => app.name !== appToRemove))
    }
  }

  // Derive Sentiment data from Table Data for the Bar Chart
  const sentimentChartData = tableData.map(app => ({
    name: app.name,
    Positive: app.positive,
    Neutral: app.neutral,
    Negative: app.negative
  }))

  return (
    <div className="max-w-container-max mx-auto">
      <PageHeader 
        title="Competitor Analysis (UPDATED)" 
        description="Head-to-head comparison between Tiket.com, Traveloka, and other tracked apps."
      >
        <Button variant="secondary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </Button>
      </PageHeader>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-lg">
        <MarketShareChart 
          data={marketShareData} 
          centerText="VS" 
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
            <p className="font-body-sm text-body-sm text-on-surface-variant">Detailed performance breakdown vs top competitors</p>
          </div>
          <div className="flex items-center gap-3 w-full xl:w-auto mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {/* Pill-shaped Add Competitor Input */}
            <div className="flex items-center bg-surface-container-lowest rounded-full p-1.5 border border-outline-variant shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all flex-shrink-0">
              <Input 
                icon={<span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>}
                placeholder="App Name (e.g. Agoda)" 
                value={compareInput}
                onChange={(e) => setCompareInput(e.target.value)}
                className="border-none bg-transparent w-48 text-body-md focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="w-px h-6 bg-outline-variant mx-1"></div>
              <div className="flex items-center text-on-surface-variant group relative" title="Reviews to fetch">
                <span className="material-symbols-outlined text-[18px] ml-3">format_list_numbered</span>
                <Input 
                  type="number"
                  value={fetchCount}
                  onChange={(e) => setFetchCount(e.target.value)}
                  placeholder="Count"
                  className="w-20 bg-transparent border-none text-center px-2 text-body-md focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button onClick={handleCompare} disabled={!compareInput} className="gap-2 rounded-full px-4 h-9 ml-2 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>
        </div>
        
        <CompetitorComparisonTable data={tableData} onDelete={handleRemove} />
      </div>
    </div>
  )
}
