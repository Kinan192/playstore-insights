import * as React from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: number
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  className,
  ...props
}: MetricCardProps) {
  // If changeType isn't explicitly provided, infer it from the change value
  const type = changeType || (change && change > 0 ? "positive" : change && change < 0 ? "negative" : "neutral")
  
  return (
    <div
      className={cn(
        "rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-[0_4px_6px_-1px_rgb(0,0,0,0.05)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-label-md text-label-md text-on-surface-variant">
          {title}
        </h3>
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-low">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-on-surface">{value}</div>
        
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center font-label-sm text-label-sm font-medium",
              type === "positive" ? "text-emerald-600" : type === "negative" ? "text-red-600" : "text-on-surface-variant"
            )}
          >
            <span className="material-symbols-outlined text-[16px]">
              {type === "positive" ? "arrow_upward" : type === "negative" ? "arrow_downward" : "horizontal_rule"}
            </span>
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  )
}
