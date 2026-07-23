import * as React from "react"

export function CompetitorComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            <th className="p-4 font-medium min-w-[200px]">Application</th>
            <th className="p-4 font-medium text-right">Avg Rating</th>
            <th className="p-4 font-medium text-right">Total Reviews</th>
            <th className="p-4 font-medium text-right">MoM Growth</th>
            <th className="p-4 font-medium text-right">Download Velocity</th>
            <th className="p-4 font-medium text-center">Trend</th>
          </tr>
        </thead>
        <tbody className="font-body-sm text-body-sm text-on-surface">
          {/* Your App Row */}
          <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors bg-secondary-fixed/20">
            <td className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">A</div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold">Your App (Pro)</span>
                <span className="text-xs text-on-surface-variant">Current</span>
              </div>
            </td>
            <td className="p-4 text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="font-semibold">4.8</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </td>
            <td className="p-4 text-right">12,450</td>
            <td className="p-4 text-right text-emerald-600 font-medium">+15.2%</td>
            <td className="p-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="w-8 text-right font-mono text-xs">85k</span>
              </div>
            </td>
            <td className="p-4 text-center">
              <span className="material-symbols-outlined text-emerald-500">trending_up</span>
            </td>
          </tr>
          
          {/* Competitor 1 */}
          <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
            <td className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">N</div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md">Nova Analytics</span>
                <span className="text-xs text-on-surface-variant">Market Leader</span>
              </div>
            </td>
            <td className="p-4 text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="font-medium">4.9</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </td>
            <td className="p-4 text-right">45,200</td>
            <td className="p-4 text-right text-emerald-600 font-medium">+8.4%</td>
            <td className="p-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <span className="w-8 text-right font-mono text-xs">120k</span>
              </div>
            </td>
            <td className="p-4 text-center">
              <span className="material-symbols-outlined text-emerald-500">trending_up</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
