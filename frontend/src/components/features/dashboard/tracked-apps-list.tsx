"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { AppStat } from "@/lib/api"

export function TrackedAppsList({ apps }: { apps: AppStat[] }) {
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-md">
        <h2 className="font-h2 text-h2 text-on-surface">Aplikasi Terpantau</h2>
        <Link href="/reviews">
          <Button variant="secondary" className="gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Aplikasi
          </Button>
        </Link>
      </div>

      {apps.length === 0 && (
        <div className="text-body-md text-on-surface-variant border border-dashed border-outline-variant rounded-xl p-8 text-center">
          Belum ada aplikasi terpantau. Tarik data lewat halaman Ulasan.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
        {apps.map((app) => {
          const total = app.review_count || 1
          const bars = [app.sentiment.negatif, app.sentiment.netral, app.sentiment.positif]
          const maxBar = Math.max(...bars, 1)
          return (
            <div key={app.id} className="group outline-none relative bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md transition-all duration-200 hover:shadow-md hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary h-full overflow-hidden">
              <Link href={`/insights?app1=${encodeURIComponent(app.name)}`} className="absolute inset-0 z-0" aria-label={`Lihat wawasan untuk ${app.name}`}></Link>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>

              <div className="flex items-start justify-between border-b border-outline-variant pb-sm relative z-10">
                <div className="flex items-center gap-3">
                  {app.icon_url ? (
                    <img className="w-12 h-12 shadow-sm object-cover rounded-[10px]" src={app.icon_url} alt={app.name} />
                  ) : (
                    <div className="w-12 h-12 rounded-[10px] bg-primary-container flex items-center justify-center font-bold text-primary text-lg shadow-sm">
                      {app.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">{app.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{app.developer ?? "Play Store"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center relative z-10 pointer-events-none">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Skor Rata-rata</span>
                  <div className="flex items-center gap-1">
                    <span className="font-h2 text-h2 text-on-surface">{app.avg_score.toFixed(1)}</span>
                    <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Ulasan</span>
                  <span className="font-h3 text-h3 text-on-surface">{app.review_count.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-sm text-label-sm text-on-surface-muted uppercase tracking-wider">Positif</span>
                  <span className="font-h3 text-h3 text-on-surface">{app.positive_ratio}%</span>
                </div>
              </div>

              {/* Bar sentiment: negatif / netral / positif */}
              <div className="mt-sm h-12 w-full flex items-end justify-between gap-2 relative z-10 pointer-events-none">
                {(["negatif", "netral", "positif"] as const).map((key, i) => (
                  <div key={key} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-300 ${key === "positif" ? "bg-primary" : key === "netral" ? "bg-primary-fixed" : "bg-error/40"}`}
                      style={{ height: `${Math.max((bars[i] * 100) / maxBar, 4)}%` }}
                    ></div>
                    <span className="text-[9px] uppercase text-on-surface-muted">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between border-t border-outline-variant pt-4 mt-6">
        <span className="text-body-sm text-on-surface-variant">
          Menampilkan {apps.length} aplikasi
        </span>
      </div>
    </div>
  )
}
