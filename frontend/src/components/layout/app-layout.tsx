"use client"
import * as React from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  
  return (
    <div className="bg-background text-on-surface h-screen flex overflow-hidden">
      <Sidebar currentPath={pathname} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-64 h-screen overflow-hidden">
        <TopNav onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-md md:p-lg custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
