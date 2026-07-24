import * as React from "react"
import Link from "next/link"

const navItems = [
  { name: "Dashboard", href: "/", icon: "dashboard" },
  { name: "Reviews", href: "/reviews", icon: "rate_review" },
  { name: "Insights", href: "/insights", icon: "query_stats" },
  { name: "Competitors", href: "/competitors", icon: "analytics" },
  { name: "Reports", href: "/reports", icon: "description" },
]

export function Sidebar({ currentPath = "/", isOpen = false, setIsOpen }: { currentPath?: string, isOpen?: boolean, setIsOpen?: (val: boolean) => void }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}
      
      <nav className={`bg-background border-r border-outline-variant fixed left-0 top-0 h-screen w-64 flex-col p-md gap-sm z-50 transition-transform duration-300 md:translate-x-0 flex ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-3 py-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg">A</div>
            <div>
              <h1 className="text-h3 font-h3 font-semibold text-on-surface">AnalyticsPro</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Sentiment Analytics</p>
            </div>
          </div>
          <button className="md:hidden text-on-surface-variant p-1" onClick={() => setIsOpen && setIsOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar font-body-md text-body-md font-label-md text-label-md">
          {navItems.map((item) => {
            const isActive = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen && setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out active:scale-95 group ${
                  isActive
                    ? "text-primary bg-secondary-container"
                    : "text-secondary hover:bg-surface-container-low"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            )
          })}
          <Link
            href="/settings"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-container-low rounded-lg transition-all duration-200 ease-in-out active:scale-95 group mt-auto"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
            <span>Settings</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
