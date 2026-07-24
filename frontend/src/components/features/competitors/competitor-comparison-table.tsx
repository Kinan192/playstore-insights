import * as React from "react"
import { cn } from "@/lib/utils"

interface CompetitorComparisonTableProps {
  data?: any[]
  onDelete?: (id: string) => void
}

export function CompetitorComparisonTable({ data, onDelete }: CompetitorComparisonTableProps) {
  if (!data) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            <th className="p-4 font-medium min-w-[200px]">Application</th>
            <th className="p-4 font-medium text-right">Avg Rating</th>
            <th className="p-4 font-medium text-right">Reviews Analyzed</th>
            <th className="p-4 font-medium text-right">MoM Growth</th>
            <th className="p-4 font-medium text-right">Positive Sentiment</th>
            <th className="p-4 font-medium text-center">Trend</th>
            <th className="p-4 font-medium text-center w-12"></th>
          </tr>
        </thead>
        <tbody className="font-body-sm text-body-sm text-on-surface">
          {data.map((app, index) => (
            <tr key={app.id} className={cn("border-b border-outline-variant hover:bg-surface-container-low transition-colors", index === 0 ? "bg-secondary-fixed/20 hover:bg-surface-container-lowest" : "")}>
              <td className="p-4 flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded text-white flex items-center justify-center font-bold text-lg shadow-sm", app.color)}>{app.initial}</div>
                <div className="flex flex-col">
                  <span className={cn("font-label-md text-label-md", index === 0 ? "font-semibold" : "")}>{app.name}</span>
                  <span className="text-xs text-on-surface-variant">{app.subtitle}</span>
                </div>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className={cn(index === 0 ? "font-semibold" : "font-medium")}>{app.rating}</span>
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </td>
              <td className="p-4 text-right">{app.reviews}</td>
              <td className={cn("p-4 text-right font-medium", app.growthPositive ? "text-emerald-600" : "text-rose-600")}>{app.growth}</td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${app.positive}%` }}></div>
                  </div>
                  <span className="w-10 text-right font-mono text-xs">{app.positive}%</span>
                </div>
              </td>
              <td className="p-4 text-center">
                <span className={cn("material-symbols-outlined", app.trend === "trending_up" ? "text-emerald-500" : "text-rose-500")}>
                  {app.trend}
                </span>
              </td>
              <td className="p-4 text-center">
                {/* Only allow deleting apps that are not the baseline (index 0 and 1) */}
                {index > 1 && onDelete && (
                  <button 
                    onClick={() => onDelete(app.id)}
                    className="text-on-surface-variant hover:text-error hover:bg-error-container p-1.5 rounded-full transition-colors flex items-center justify-center"
                    title="Remove Competitor"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
