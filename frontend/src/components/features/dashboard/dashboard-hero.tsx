import * as React from "react"
import { Button } from "@/components/ui/button"

export function DashboardHero() {
  return (
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
  )
}
