import * as React from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | React.ReactNode
  icon?: string
  trend?: string
  trendLabel?: string
  subValue?: string
  trendUp?: boolean
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  subValue,
  trendUp = true,
  className,
  children,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-sm",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center text-on-surface-variant">
        <span className="font-label-md text-label-md">{title}</span>
        {icon && (
          <span className={cn("material-symbols-outlined", icon === "star" ? "text-tertiary-container" : "")}>
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-h1 font-h1 text-on-surface">{value}</span>
        {subValue && (
          <span className="text-on-surface-variant font-body-sm text-body-sm mb-1">{subValue}</span>
        )}
      </div>
      {(trend || children) && (
        <div className="mt-auto pt-2">
          {trend ? (
            <div
              className={cn(
                "flex items-center gap-1 font-label-sm text-label-sm",
                trendUp ? "text-primary-container" : "text-error"
              )}
            >
              <span className="material-symbols-outlined text-sm">
                {trendUp ? "trending_up" : "trending_down"}
              </span>
              {trend} {trendLabel}
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  )
}
