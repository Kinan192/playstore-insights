"use client"

import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"

interface SentimentComparisonChartProps {
  data: any[]
}

export function SentimentComparisonChart({ data }: SentimentComparisonChartProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col col-span-1 md:col-span-1 lg:col-span-2 h-[360px]">
      <div className="border-b border-outline-variant pb-3 mb-4 flex justify-between items-center">
        <div>
          <h2 className="font-h3 text-h3 text-on-surface">Sentiment Analysis</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Positive vs Negative mentions across platforms</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low rounded-md p-1">
          <button className="px-3 py-1 bg-surface-container-lowest rounded shadow-sm text-xs font-medium text-on-surface">7D</button>
          <button className="px-3 py-1 text-xs font-medium text-on-surface-variant hover:text-on-surface">30D</button>
          <button className="px-3 py-1 text-xs font-medium text-on-surface-variant hover:text-on-surface">90D</button>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-on-surface-variant)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-on-surface-variant)' }} tickFormatter={(val) => `${val}%`} />
            <RechartsTooltip cursor={{ fill: 'var(--color-surface-container-low)' }} contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-outline-variant)' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Positive" stackId="a" fill="var(--color-primary-container)" radius={[0, 0, 4, 4]} barSize={40} />
            <Bar dataKey="Neutral" stackId="a" fill="var(--color-primary-fixed-dim)" barSize={40} />
            <Bar dataKey="Negative" stackId="a" fill="var(--color-error-container)" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
