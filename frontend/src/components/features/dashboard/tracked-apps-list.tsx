import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const trackedApps = [
  {
    id: "fintrack",
    name: "FinTrack iOS",
    category: "Finance & Productivity",
    platform: "apple",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt_D2gSbuf4l44B0ykgFfDKP2YrbdiMcv44OM4lmWWhxQIy88cU8HQlDzi82W03ltZSRVrqzvIYocQeYZkDmQXjreJNma96QPCgCAz5eNJdFvbIhPT908iEHj2bfM3ggMnMNaivWSMaptd8LRA5naXiAb13wVe_Q9HqipWIxW6nFd_v8NGTvvIgUEuHz2ckIppzHY_J5xYZcvyqxXLT8yRNJaQ5CDxql9A2ym-LyC6NuF8Fu2vEJ0Ggg",
    rating: "4.8",
    downloads: "12.4k",
    chartHeights: [20, 30, 25, 40, 55, 45, 70, 60, 85, 100],
    platformIcon: "apps"
  },
  {
    id: "healthsync",
    name: "HealthSync",
    category: "Health & Fitness",
    platform: "android",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLMTsbw-CHf1y1BIx0XsrEsv9ezvWMZb8wBpwwVzqyAXRagVh0MgRH_0crahg9wHP-d6d35RdKLoLc_S_BfEGl4CZWvEVjKjA51FBrMAqXfpRu1mkiRoAdU-j1k22C7ZFLDmOeEfcIMO_CTbmXb_RZLQYRFoQVodih-WsMni3emD4IUv7Xt6-z2BCahBKSxkbXQQKDPAbpiYgmDiffb_0DftnneDdJn5C1OVJP5o20Qm4XcIBVKrzBpw",
    rating: "4.5",
    downloads: "8.2k",
    chartHeights: [40, 35, 50, 45, 60, 75, 65, 50, 60, 40],
    platformIcon: "android"
  },
  {
    id: "lenspromax",
    name: "LensPro Max",
    category: "Photo & Video",
    platform: "ios",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUY5f8XW6wOGrnQhjt0Xzubo_5n6Uct2vfdY3Mv6Mxnl7WxMK6ysSAey2BCI9fm_Jog5l-Tc09DAsX0bdFpYOasjBCwmbwcxm7ZkltC-TnTk96jj0cN2W-47NlGgsyHYgjMrdvW-bmfX5OKxW72Jpa_Tmb9hUAvwLHfCQzEXL8NmRd7l1VYLZ0BtkRMaMP0L6ccbPA3eSD7HdUnkm_mf93wjtxJM-XosqCsbuYNbSZ_dimKNoLapkQtA",
    rating: "4.9",
    downloads: "32.1k",
    chartHeights: [60, 70, 65, 80, 85, 75, 90, 95, 85, 100],
    platformIcon: "apps"
  }
]

export function TrackedAppsList() {
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-md">
        <h2 className="font-h2 text-h2 text-on-surface">Tracked Applications</h2>
        <Button variant="secondary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add App
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
        {trackedApps.map((app) => (
          <Link href="/insights" key={app.id} className="group outline-none">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md transition-all duration-200 group-hover:shadow-md group-hover:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-primary h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="flex items-start justify-between border-b border-outline-variant pb-sm relative z-10">
                <div className="flex items-center gap-3">
                  <img 
                    className={`w-12 h-12 shadow-sm object-cover ${app.platformIcon === 'android' ? 'rounded-full' : 'rounded-[10px]'}`} 
                    src={app.icon} 
                    alt={app.name} 
                  />
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">{app.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{app.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="material-symbols-outlined text-on-surface-muted text-[20px]">{app.platformIcon}</span>
                  <span className="material-symbols-outlined text-primary text-[18px] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">arrow_forward</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Current Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="font-h2 text-h2 text-on-surface">{app.rating}</span>
                    <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Downloads</span>
                  <span className="font-h3 text-h3 text-on-surface">{app.downloads}</span>
                </div>
              </div>
              
              <div className="mt-sm h-12 w-full flex items-end justify-between gap-1 relative z-10">
                {app.chartHeights.map((height, i) => (
                  <div 
                    key={i}
                    className={`w-full rounded-t-sm transition-all duration-300 ${i === app.chartHeights.length - 1 ? 'bg-primary group-hover:bg-primary-container' : 'bg-primary-fixed group-hover:bg-primary/40'}`}
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-between border-t border-outline-variant pt-4 mt-6">
        <span className="text-body-sm text-on-surface-variant">Showing 1-3 of 12 applications</span>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="gap-1 pointer-events-none opacity-50" tabIndex={-1}>
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            Previous
          </Button>
          <Button variant="secondary" size="sm" className="gap-1">
            Next
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
