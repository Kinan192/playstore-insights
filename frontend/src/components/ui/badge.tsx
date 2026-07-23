import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "neutral" | "danger" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-label-sm text-xs transition-colors",
        {
          "bg-primary-container text-on-primary-container": variant === "default",
          "bg-emerald-100 text-emerald-800": variant === "success",
          "bg-surface-container-high text-on-surface-variant": variant === "neutral",
          "bg-error-container text-on-error-container": variant === "danger",
          "border border-outline-variant text-on-surface-variant": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
