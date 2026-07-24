import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchableSelect } from "@/components/ui/searchable-select"
import { cn } from "@/lib/utils"

interface AddCompetitorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, count: string, region: string) => void
}

export function AddCompetitorModal({ isOpen, onClose, onAdd }: AddCompetitorModalProps) {
  const [appName, setAppName] = React.useState("")
  const [fetchCount, setFetchCount] = React.useState("1000")
  const [region, setRegion] = React.useState("Indonesia (ID)")

  // Reset form when opened
  React.useEffect(() => {
    if (isOpen) {
      setAppName("")
      setFetchCount("1000")
      setRegion("Indonesia (ID)")
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAdd = () => {
    if (!appName.trim()) return
    onAdd(appName, fetchCount, region)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-scrim/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-[500px] max-w-[95vw] bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low/50">
          <div>
            <h3 className="font-h3 text-h3 text-on-surface">Tambah Kompetitor</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Tarik data untuk membandingkan dengan aplikasi dasar Anda.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* App Name */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface font-medium">Nama Aplikasi</label>
            <Input 
              autoFocus
              placeholder="misal: Agoda, Pegipegi, Booking.com"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              icon={<span className="material-symbols-outlined text-sm">search</span>}
              className="bg-surface-container-low"
            />
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-4">
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
          <div className="bg-primary-container/30 text-on-primary-container p-3 rounded-lg flex gap-3 items-start mt-2 border border-primary-container/50">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">info</span>
            <p className="text-xs leading-relaxed">
              Menarik ulasan mungkin membutuhkan waktu. Agen AI akan segera menganalisis sentimen di seluruh kumpulan data.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low/50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleAdd} disabled={!appName.trim()} className="gap-2">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Tambah & Tarik Data
          </Button>
        </div>

      </div>
    </div>
  )
}
