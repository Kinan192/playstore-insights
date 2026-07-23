import * as React from "react"
import { Badge } from "@/components/ui/badge"

interface ReviewData {
  id: number
  appName: string
  user: { name: string, avatar: string, initials?: string, meta: string }
  rating: number
  title: string
  content: string
  sentiment: string
  date: string
}

interface ReviewTableProps {
  data: ReviewData[]
  showAppColumn?: boolean
}

export function ReviewTable({ data, showAppColumn = true }: ReviewTableProps) {
  return (
    <div className="overflow-y-auto flex-1 custom-scrollbar">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant bg-surface-container-low/50 sticky top-0 z-10 backdrop-blur-md">
            <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">User</th>
            {showAppColumn && <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">App</th>}
            <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium w-24">Rating</th>
            <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium">Review</th>
            <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium w-24">Sentiment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/50">
          {data.map((review) => (
            <tr key={review.id} className="hover:bg-surface-container-low/30 transition-colors group">
              <td className="py-4 px-4 align-top w-48">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/50 flex-shrink-0 text-secondary font-label-md">
                    {review.user.avatar ? (
                      <img src={review.user.avatar} alt={review.user.name} className="w-full h-full object-cover" />
                    ) : (
                      review.user.initials
                    )}
                  </div>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface line-clamp-1">{review.user.name}</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant">{review.user.meta}</div>
                  </div>
                </div>
              </td>
              {showAppColumn && (
                <td className="py-4 px-4 align-top">
                  <Badge variant="neutral" className="bg-surface-container-high whitespace-nowrap">{review.appName}</Badge>
                </td>
              )}
              <td className="py-4 px-4 align-top">
                <div className="flex text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-[14px] ${i < review.rating ? "text-tertiary-container" : "text-outline-variant"}`} style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1">{review.date}</div>
              </td>
              <td className="py-4 px-4 align-top">
                <p className="font-body-sm text-body-sm text-secondary line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {review.content}
                </p>
              </td>
              <td className="py-4 px-4 align-top">
                <Badge variant={review.sentiment === "Positive" ? "success" : review.sentiment === "Negative" ? "danger" : "neutral"} className="rounded uppercase text-[10px] px-2 font-bold tracking-wider">
                  {review.sentiment}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
