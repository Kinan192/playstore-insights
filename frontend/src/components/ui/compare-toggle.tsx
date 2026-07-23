"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CompareToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

export function CompareToggle({ checked, onChange, label = "Compare Mode", className }: CompareToggleProps) {
  return (
    <label className={cn("flex items-center gap-2 cursor-pointer bg-surface-container-lowest border border-outline-variant px-3 py-1.5 rounded-lg shadow-sm hover:bg-surface-container-low transition-colors", className)}>
      <input 
        type="checkbox" 
        className="sr-only" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <span className="font-label-md text-label-md text-on-surface">{label}</span>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
    </label>
  )
}
