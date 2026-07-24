"use client"

import * as React from "react"
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

interface TopKeywordsChartProps {
  data: any[]
}

export function TopKeywordsChart({ data }: TopKeywordsChartProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col shadow-sm flex-1 min-h-[300px]">
      <h3 className="font-h3 text-h3 text-on-surface flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-amber-500">format_quote</span>
        Kata Kunci Teratas (TF-IDF)
      </h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="keyword" type="category" axisLine={false} tickLine={false} width={110} tick={{ fontSize: 11, fill: 'var(--color-on-surface)', fontWeight: 500 }} />
            <RechartsTooltip 
              cursor={{ fill: 'var(--color-surface-container-low)' }} 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-outline-variant)', backgroundColor: 'var(--color-surface-container-lowest)' }} 
              formatter={(value: any, name: any, props: any) => {
                // Mock calculation: assuming ~1000 total keyword occurrences for this demo
                const percent = ((value / 1000) * 100).toFixed(1);
                return [`${value} penyebutan (~${percent}%)`, 'Frekuensi'];
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
