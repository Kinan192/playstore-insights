"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"

interface MarketShareChartProps {
  data: any[]
  centerText: string
  centerSubText: string
}

export function MarketShareChart({ data, centerText, centerSubText }: MarketShareChartProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col col-span-1 h-[360px]">
      <div className="border-b border-outline-variant pb-3 mb-4">
        <h2 className="font-h3 text-h3 text-on-surface">Share of Voice</h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Based on Total Reviews Analyzed</p>
      </div>
      <div className="flex-1 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-outline-variant)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`${value}%`, 'Market Share']}
            />
            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2 mr-24">
          <span className="font-display text-display text-on-surface">{centerText}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{centerSubText}</span>
        </div>
      </div>
    </div>
  )
}
