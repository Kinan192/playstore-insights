"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"

interface OverallSentimentChartProps {
  data: any[]
  centerText: string
}

export function OverallSentimentChart({ data, centerText }: OverallSentimentChartProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col shadow-sm">
      <h3 className="font-h3 text-h3 text-on-surface flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-indigo-500">donut_large</span>
        Sentimen Keseluruhan
      </h3>
      <div className="flex-1 flex flex-col justify-center items-center py-4 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-outline-variant)', backgroundColor: 'var(--color-surface-container-lowest)' }} 
              formatter={(value: any, name: any, props: any) => {
                // Calculate percentage based on the sum of all data items in this chart
                const total = props.payload.payload ? (data.reduce((acc, cur) => acc + cur.value, 0)) : 1;
                const percent = ((value / total) * 100).toFixed(1);
                return [`${value} ulasan (${percent}%)`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-on-surface">{centerText}</span>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs font-medium text-on-surface-variant">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
