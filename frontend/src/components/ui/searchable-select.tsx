"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SearchableSelectProps {
  value: string
  onChange: (val: string) => void
  options: string[]
  align?: "left" | "center"
  className?: string
  showSearch?: boolean
}

export function SearchableSelect({ value, onChange, options, align = "left", className, showSearch = true }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()))
  
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("relative inline-block text-left", className)} ref={wrapperRef}>
      <button 
        type="button"
        onClick={() => { setIsOpen(!isOpen); setSearch("") }}
        className={cn(
          "flex items-center gap-1 bg-transparent border-none outline-none cursor-pointer hover:bg-surface-container-high px-3 py-1 rounded-md transition-colors",
          align === "center" && "mx-auto"
        )}
      >
        <span className="font-bold text-inherit truncate max-w-[150px]">{value}</span>
        <span className="material-symbols-outlined text-[18px]">expand_more</span>
      </button>
      
      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-1 w-56 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-lg overflow-hidden",
          align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
        )}>
          {showSearch && (
            <div className="p-2 border-b border-outline-variant bg-surface-container-low">
              <div className="flex items-center bg-surface-container-lowest rounded-md px-2 border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">search</span>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search..." 
                  className="w-full bg-transparent border-none text-body-sm px-2 py-1.5 focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          )}
          <ul className="max-h-60 overflow-auto py-1 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-body-sm text-on-surface-variant text-center">No apps found</li>
            ) : (
              filteredOptions.map(opt => (
                <li 
                  key={opt}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={cn(
                    "px-4 py-2 text-body-sm cursor-pointer hover:bg-surface-container-low flex items-center justify-between",
                    value === opt ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface'
                  )}
                >
                  {opt}
                  {value === opt && <span className="material-symbols-outlined text-[18px]">check</span>}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
