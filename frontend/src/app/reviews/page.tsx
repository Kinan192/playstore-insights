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

const reviewsData = [
  {
    id: 1,
    appName: "Tiket.com",
    user: { name: "Sarah J.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd0qvp8kMfzAFEgPQTO9d8idKECsjwVlh96lLN7yRNCGHImbq-3Bf_frYWIvWbADvH_l65Q4eA1tWeyCbHwwu-HkaIJrYpppQTkaPvYK6sEJvzmaJlMuUHKlX4c9i4kRWSsVJRwCxkoJ0eTssgpjHw6cwpkX6FXHc2uY79ITtSz9ajLIL5Ro8-r_Ln9NuZDPJ2KafqC-lfXkQxRx6d6TpXFIN6QCnEqnd8bhN1azKFC7-WSvmqb7_E5w", meta: "v5.9.1 • iOS" },
    rating: 5,
    title: "Love the new analytics dashboard!",
    content: "The redesign is fantastic. It's so much easier to find the specific metrics I need for my weekly reports. The new charting library feels a lot snappier too. Great job team!",
    sentiment: "Positive",
    date: "Oct 24, 2026"
  },
  {
    id: 2,
    appName: "Traveloka",
    user: { name: "Marcus K.", avatar: "", initials: "MK", meta: "v3.1.0 • Web" },
    rating: 3,
    title: "Good, but missing export options",
    content: "Overall it's a solid tool, but I really need the ability to export these custom charts directly to PDF rather than just CSV data. It adds an extra step to my workflow.",
    sentiment: "Neutral",
    date: "Oct 23, 2026"
  },
  {
    id: 3,
    appName: "Tiket.com",
    user: { name: "David R.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ_b84zJ5cknVoIFJ9SnO_V0QK1pcJgrixbxTa1VbPIS5vFHyxrYKrAYX_MNU_Qj1Rz0u7BqKmKqkoS3udLJ35Af6D0CBHKO9ZWaebkTVmeiVGPumAUUho1if8-NTEOK1jPMr8ijyVtAMJCPZrFfmwb6EQksHiqPCZdNPna9PmUgoUzDRuQmHgj31NBlLQZzsgVXmzJVewSI2NoBkVuFEFBvcc3doSpbs9YNe98sA3lVNKNl7r_kKkdg", meta: "v5.8.2 • iOS" },
    rating: 2,
    title: "App crashes on sync",
    content: "Since the last update, the app crashes every time I try to force a sync on my iPhone 13. I've reinstalled twice but the issue persists. Very frustrating as I rely on this daily.",
    sentiment: "Negative",
    date: "Oct 22, 2026"
  }
]

export default function ReviewsPage() {
  const [compareMode, setCompareMode] = React.useState(false)
  const [isSyncing, setIsSyncing] = React.useState(false)
  const [app1, setApp1] = React.useState("Tiket.com")
  const [app2, setApp2] = React.useState("Traveloka")
  const [ratingFilter, setRatingFilter] = React.useState("All Ratings")
  const [sentimentFilter, setSentimentFilter] = React.useState("All Sentiment")

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  // Get unique app names for the dropdown
  const uniqueApps = Array.from(new Set(reviewsData.map(r => r.appName)))

  return (
    <div className="max-w-container-max mx-auto space-y-lg">
      <PageHeader 
        title="Reviews Management" 
        description="Analyze and respond to user feedback across all platforms."
      >
        <div className="flex items-center bg-surface-container-lowest rounded-full p-1.5 border border-outline-variant shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <Input 
            icon={<span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>}
            placeholder="Search and fetch app..." 
            className="border-none bg-transparent w-56 text-body-md focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="w-px h-6 bg-outline-variant mx-1"></div>
          <div className="flex items-center text-on-surface-variant group relative" title="Number of reviews to fetch">
            <span className="material-symbols-outlined text-[18px] ml-3">format_list_numbered</span>
            <Input 
              type="number"
              defaultValue={1000}
              className="w-20 bg-transparent border-none text-center px-2 text-body-md focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button onClick={handleSync} disabled={isSyncing} className="gap-2 rounded-full px-5 h-10 ml-2 shadow-sm">
            <span className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
            {isSyncing ? "Fetching..." : "Fetch Data"}
          </Button>
        </div>
        <Button variant="secondary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export
        </Button>
      </PageHeader>

      {/* Compare Mode Toggle */}
      <div className="flex justify-end">
        <CompareToggle 
          checked={compareMode} 
          onChange={setCompareMode} 
          label="Split-Screen Compare Mode" 
        />
      </div>

      {/* AI Summary Cards */}
      <div className={`grid gap-md ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        <Alert className="relative overflow-hidden shadow-sm border-outline-variant">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <span className="material-symbols-outlined text-primary bg-secondary-container p-2 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 z-10">auto_awesome</span>
          <div className="flex-1 z-10 relative">
            <AlertTitle className="flex items-center gap-2 text-h3 font-h3 text-on-surface mb-2 mt-1">
              {compareMode && <span className="text-primary font-bold mr-1">{app1}</span>} 
              AI Insights
              <Badge variant="outline" className="text-primary bg-primary-container/10 border-none rounded uppercase font-bold px-2">Beta</Badge>
            </AlertTitle>
            <AlertDescription className="text-on-surface-variant leading-relaxed text-body-md font-body-md mt-2">
              Recent feedback trends show a <strong className="text-on-surface font-medium">15% increase in positive sentiment</strong> regarding the new booking layout. However, several users in v5.8.2 reported <strong className="text-error font-medium">syncing issues on iOS</strong>.
            </AlertDescription>
          </div>
        </Alert>

        {compareMode && (
          <Alert className="relative overflow-hidden shadow-sm border-outline-variant">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <span className="material-symbols-outlined text-indigo-600 bg-indigo-100 p-2 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 z-10">auto_awesome</span>
            <div className="flex-1 z-10 relative">
              <AlertTitle className="flex items-center gap-2 text-h3 font-h3 text-on-surface mb-2 mt-1">
                <span className="text-indigo-600 font-bold mr-1">{app2}</span> 
                AI Insights
                <Badge variant="outline" className="text-indigo-600 bg-indigo-100 border-none rounded uppercase font-bold px-2">Beta</Badge>
              </AlertTitle>
              <AlertDescription className="text-on-surface-variant leading-relaxed text-body-md font-body-md mt-2">
                Users appreciate the wide variety of payment options. The primary source of <strong className="text-error font-medium">negative sentiment (12%)</strong> involves delayed refund processing for cancelled flights.
              </AlertDescription>
            </div>
          </Alert>
        )}
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex flex-wrap items-center gap-3 shadow-sm relative z-20">
        <div className="flex-1 min-w-[200px]">
          <Input 
            placeholder="Filter reviews..." 
            icon={<span className="material-symbols-outlined text-sm">filter_list</span>}
            className="bg-surface-container-low border-none focus-visible:ring-primary-container/50"
          />
        </div>
        <div className="h-6 w-px bg-outline-variant hidden md:block mx-1"></div>
        {!compareMode && (
          <div className="text-primary border-r border-outline-variant pr-3 hidden md:block">
            <SearchableSelect 
              value={app1 === "All Apps" ? app1 : "All Apps"} 
              onChange={setApp1} 
              options={["All Apps", ...uniqueApps]} 
            />
          </div>
        )}
        <SearchableSelect 
          value={ratingFilter}
          onChange={setRatingFilter}
          options={["All Ratings", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"]}
          showSearch={false}
          className="text-on-surface"
        />
        <SearchableSelect 
          value={sentimentFilter}
          onChange={setSentimentFilter}
          options={["All Sentiment", "Positive", "Neutral", "Negative"]}
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
              <SearchableSelect value={app1} onChange={setApp1} options={uniqueApps} align="center" />
            </div>
          )}
          <ReviewTable data={reviewsData.filter(r => !compareMode || r.appName === app1)} showAppColumn={!compareMode} />
        </div>

        {/* Right Table (Compare Mode Only) */}
        {compareMode && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
            <div className="bg-surface-container-low border-b border-outline-variant p-2 text-indigo-600 flex items-center justify-center">
              <SearchableSelect value={app2} onChange={setApp2} options={uniqueApps} align="center" />
            </div>
            <ReviewTable data={reviewsData.filter(r => r.appName === app2)} showAppColumn={false} />
          </div>
        )}
      </div>
    </div>
  )
}
