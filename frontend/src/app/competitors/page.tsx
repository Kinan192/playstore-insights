"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { MarketShareChart } from "@/components/features/competitors/market-share-chart"
import { SentimentComparisonChart } from "@/components/features/competitors/sentiment-comparison-chart"
import { CompetitorComparisonTable } from "@/components/features/competitors/competitor-comparison-table"
import { AddCompetitorModal } from "@/components/features/competitors/add-competitor-modal"

// Initial Mock Data representing Tiket.com vs Traveloka
const initialMarketShare = [
  { name: "Tiket.com", value: 45, count: 12450, color: "#2563eb" },
  { name: "Traveloka", value: 55, count: 45200, color: "#4f46e5" },
]

const initialTableData = [
  {
    id: "tiket",
    name: "Tiket.com",
    initial: "T",
    color: "bg-blue-600",
    subtitle: "Aplikasi Dasar",
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
    subtitle: "Kompetitor Utama",
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
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  
  // States to hold the interactive data
  const [marketShareData, setMarketShareData] = React.useState(initialMarketShare)
  const [tableData, setTableData] = React.useState(initialTableData)
  
  const handleAddCompetitor = (name: string, count: string, region: string) => {
    // Create a mock object for the new competitor (e.g. Agoda)
    const newAppName = name.trim()
    const newAppInitial = newAppName.substring(0, 2).toUpperCase()
    
    // Add to Market Share (adjusting values slightly to look realistic)
    const newMarketShare = [
      { name: "Tiket.com", value: 35, count: 12450, color: "#2563eb" },
      { name: "Traveloka", value: 45, count: 45200, color: "#4f46e5" },
      { name: newAppName, value: 20, count: parseInt(count) || 1000, color: "#059669" } // Emerald green
    ]
    
    // Add to Table / Sentiment Data
    const newAppTableData = {
      id: newAppName.toLowerCase().replace(/\s+/g, '-'),
      name: newAppName,
      initial: newAppInitial,
      color: "bg-emerald-600",
      subtitle: region, // Use region as subtitle for the mock
      rating: (Math.random() * (4.9 - 3.5) + 3.5).toFixed(1), // Random rating between 3.5 and 4.9
      reviews: count,
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
    Positif: app.positive,
    Netral: app.neutral,
    Negatif: app.negative,
    totalReviews: parseInt(app.reviews.toString().replace(/,/g, '')) || 0
  }))

  return (
    <div className="max-w-container-max mx-auto">
      <PageHeader 
        title="Analisis Kompetitor" 
        description="Perbandingan langsung antara Tiket.com, Traveloka, dan aplikasi terpantau lainnya."
      >
        <Link href={`/insights?app1=${encodeURIComponent(tableData[0]?.name || 'Tiket.com')}&app2=${encodeURIComponent(tableData[1]?.name || 'Traveloka')}`}>
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
          <div className="flex items-center gap-3 w-full xl:w-auto mt-4 md:mt-0">
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 rounded-full w-full md:w-auto shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Competitor
            </Button>
          </div>
        </div>
        
        <CompetitorComparisonTable data={tableData} onDelete={handleRemove} />
      </div>

      <AddCompetitorModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddCompetitor} 
      />
    </div>
  )
}
