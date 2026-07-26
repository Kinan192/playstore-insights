import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { cn } from "@/lib/utils"
import { api, type AppSearchResult } from "@/lib/api"

interface AddAppModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (appId: string, title: string, count: string, region: string) => void
}

export function AddAppModal({ isOpen, onClose, onAdd }: AddAppModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<AppSearchResult[]>([])
  const [isSearching, setIsSearching] = React.useState(false)
  const [selectedApp, setSelectedApp] = React.useState<AppSearchResult | null>(null)

  const [fetchCount, setFetchCount] = React.useState("1000")
  const [region, setRegion] = React.useState("Indonesia (ID)")

  // Reset form when opened
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery("")
      setSearchResults([])
      setSelectedApp(null)
      setFetchCount("1000")
      setRegion("Indonesia (ID)")
    }
  }, [isOpen])

  // Debounce search
  React.useEffect(() => {
    // Jika input kosong atau user sudah memilih aplikasi, bersihkan hasil
    if (!searchQuery.trim() || selectedApp) {
      setSearchResults([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true)
      try {
        setSearchResults(await api.searchApps(searchQuery, 5))
      } catch (error) {
        console.error("Failed to search apps:", error)
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, selectedApp])

  if (!isOpen) return null

  const handleAdd = () => {
    if (!selectedApp) return
    onAdd(selectedApp.appId, selectedApp.title, fetchCount, region)
    onClose()
  }

  const handleSelectApp = (app: AppSearchResult) => {
    setSelectedApp(app)
    setSearchQuery(app.title)
    setSearchResults([]) // tutup dropdown
  }

  const handleClearSelection = () => {
    setSelectedApp(null)
    setSearchQuery("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-scrim/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-[500px] max-w-[95vw] bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-visible animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low/50 rounded-t-2xl">
          <div>
            <h3 className="font-h3 text-h3 text-on-surface">Tarik Data Aplikasi</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Cari aplikasi di Play Store untuk dianalisis.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 overflow-visible">
          {/* App Name Search */}
          <div className="flex flex-col gap-2 relative z-20">
            <label className="font-label-md text-label-md text-on-surface font-medium">Cari Aplikasi</label>
            <div className="relative">
              <Input 
                autoFocus
                placeholder="misal: Tiket.com, Traveloka"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (selectedApp) setSelectedApp(null) // Reset selection if typing again
                }}
                icon={<span className="material-symbols-outlined text-sm">search</span>}
                className="bg-surface-container-low w-full pr-10"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined animate-spin text-primary text-[18px]">sync</span>
                </div>
              )}
              {selectedApp && (
                <button 
                  onClick={handleClearSelection}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-error"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {searchResults.length > 0 && !selectedApp && (
              <div className="absolute top-[100%] left-0 w-full mt-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg overflow-hidden flex flex-col z-50 max-h-64 overflow-y-auto">
                {searchResults.map((app) => (
                  <button
                    key={app.appId}
                    className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors text-left border-b border-outline-variant/30 last:border-0"
                    onClick={() => handleSelectApp(app)}
                  >
                    <img src={app.icon} alt={app.title} className="w-10 h-10 rounded-lg shadow-sm" />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-medium text-body-md text-on-surface truncate">{app.title}</h4>
                      <p className="text-body-sm text-on-surface-variant truncate">{app.developer}</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant text-[18px]">chevron_right</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected App Display (Optional UI feedback) */}
          {selectedApp && (
            <div className="bg-primary-container/20 border border-primary/20 rounded-xl p-3 flex items-center gap-3">
              <img src={selectedApp.icon} alt={selectedApp.title} className="w-12 h-12 rounded-lg shadow-sm" />
              <div className="flex-1">
                <h4 className="font-bold text-body-md text-on-surface">{selectedApp.title}</h4>
                <p className="text-body-sm text-primary font-mono text-[11px] mt-0.5">{selectedApp.appId}</p>
              </div>
              <div className="text-primary bg-primary-container/30 px-2 py-1 rounded-full text-xs font-medium">Terpilih</div>
            </div>
          )}

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Jumlah Ulasan</label>
              <Input 
                type="number"
                placeholder="Jumlah"
                value={fetchCount}
                onChange={(e) => setFetchCount(e.target.value)}
                icon={<span className="material-symbols-outlined text-sm">format_list_numbered</span>}
                className="bg-surface-container-low"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface font-medium">Wilayah / Toko</label>
              <SearchableSelect 
                value={region}
                onChange={setRegion}
                options={["Indonesia (ID)", "United States (US)", "Global"]}
                showSearch={false}
                className="w-full bg-surface-container-low border-outline-variant"
              />
            </div>
          </div>
          
          {/* Info Box */}
          <div className="bg-surface-container-low text-on-surface-variant p-3 rounded-lg flex gap-3 items-start mt-2 border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">info</span>
            <p className="text-xs leading-relaxed">
              Menarik ulasan membutuhkan waktu tergantung jumlah yang diminta. Agen AI akan memproses analisis sentimen di latar belakang.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low/50 flex justify-end gap-3 rounded-b-2xl relative z-10">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleAdd} disabled={!selectedApp} className="gap-2">
            <span className="material-symbols-outlined text-[18px]">sync</span>
            Tarik Data Ulasan
          </Button>
        </div>

      </div>
    </div>
  )
}
