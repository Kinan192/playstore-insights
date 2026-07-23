"use client"

import * as React from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"

interface SentimentTrendChartProps {
  data: any[]
}

export function SentimentTrendChart({ data }: SentimentTrendChartProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col shadow-sm">
      <h3 className="font-h3 text-h3 text-on-surface flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">ssid_chart</span>
        Sentiment Trends
      </h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-on-surface-variant)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-on-surface-variant)' }} />
            <RechartsTooltip 
              cursor={{ stroke: 'var(--color-outline-variant)', strokeWidth: 1, strokeDasharray: '4 4' }} 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-outline-variant)', backgroundColor: 'var(--color-surface-container-lowest)' }} 
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
            <Line type="monotone" dataKey="Positive" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Neutral" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
