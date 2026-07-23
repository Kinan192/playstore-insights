import * as React from "react"
import { Input } from "@/components/ui/input"

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 w-full border-b border-outline-variant flex justify-between items-center h-16 px-lg transition-all duration-200">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-on-surface-variant hover:text-on-surface transition-colors p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:block font-h3 font-semibold text-on-surface">AnalyticsPro</div>
      </div>
      
      <div className="flex items-center gap-4 text-primary font-label-md text-label-md">
        <div className="relative hidden sm:block w-64 mr-2">
          <Input 
            placeholder="Search..." 
            icon={<span className="material-symbols-outlined text-sm">search</span>}
            className="py-1.5"
          />
        </div>
        
        <button className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">calendar_today</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
        <button className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full border border-outline-variant ml-2 overflow-hidden bg-surface-container-highest flex-shrink-0">
          <img 
            alt="User Profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS_b391ww4rn8UgwJFSoQBL-5sq1bQ7HpH-vw3J5LmJ8Occ-AJVQkTQa2d7IjL49M0uUkYoAuTTI4YSZKab1Vu22suPZB6GIR4RQQewLBC9-oahKOHznprbK8mAj_ZvQiUzd1dEz8Yh9lDTe9hO7jAWdW8iXKO0D4JwwAwbfIpyqV9r7kJAWpUdewzaMeXWaAnONgPPjFgh9LyazFP40gOyHTz_TORQldCqUgBZcb9pxW7DQIzDUmmTA"
          />
        </div>
      </div>
    </header>
  )
}
