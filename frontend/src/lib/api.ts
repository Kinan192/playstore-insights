const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

// ---- Types (mirror backend responses) ----

export interface SentimentBreakdown {
  positif: number
  netral: number
  negatif: number
}

export interface Overview {
  total_apps: number
  total_reviews: number
  avg_score: number
  sentiment: SentimentBreakdown
}

export interface AppStat {
  id: number
  app_id: string
  name: string
  developer: string | null
  icon_url: string | null
  review_count: number
  avg_score: number
  sentiment: SentimentBreakdown
  positive_ratio: number
}

export interface TrendRow {
  date: string
  positif: number
  netral: number
  negatif: number
}

export interface Keyword {
  keyword: string
  count: number
  sentiment: string
}

export interface Review {
  id: number
  app_id: number
  playstore_review_id: string
  user_name: string
  user_avatar: string | null
  content: string
  score: number
  sentiment: string | null
  date: string
  created_at: string
}

export interface ReviewList {
  total: number
  items: Review[]
}

export interface AppSearchResult {
  appId: string
  title: string
  icon: string
  developer: string
}

export interface ReviewParams {
  app_id?: number
  sentiment?: string
  score?: number
  q?: string
  offset?: number
  limit?: number
}

// ---- Client ----

function qs(params: Record<string, string | number | undefined>): string {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") p.set(k, String(v))
  }
  return p.toString()
}

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}${path}`)
  if (!r.ok) throw new Error(`API ${r.status}: ${path}`)
  return r.json()
}

export const api = {
  overview: () => get<Overview>("/api/stats/overview"),
  appStats: () => get<AppStat[]>("/api/stats/apps"),
  trend: (appIds?: number[], days = 30) =>
    get<TrendRow[]>(
      `/api/stats/sentiment-trend?days=${days}${appIds?.length ? `&app_ids=${appIds.join(",")}` : ""}`
    ),
  keywords: (appId?: number, sentiment?: string, limit = 15) =>
    get<Keyword[]>(`/api/stats/keywords?${qs({ app_id: appId, sentiment, limit })}`),
  reviews: (params: ReviewParams = {}) =>
    get<ReviewList>(`/api/reviews/?${qs({ ...params })}`),
  scrapeStatus: (appId: number) =>
    get<{ review_count: number }>(`/api/reviews/scrape-status?app_id=${appId}`),
  searchApps: (q: string, limit = 5) =>
    get<AppSearchResult[]>(`/api/scraper/search?q=${encodeURIComponent(q)}&limit=${limit}`),
  triggerScrape: (p: { app_id: string; title: string; count: number; region: string }) =>
    fetch(`${BASE}/api/reviews/scrape?${qs(p)}`, { method: "POST" }).then((r) => {
      if (!r.ok) throw new Error(`API ${r.status}: scrape`)
      return r.json() as Promise<{ message: string; app_id: number }>
    }),
}

const LABELS: Record<string, string> = { positif: "Positif", netral: "Netral", negatif: "Negatif" }
export const sentimentLabel = (s: string | null | undefined) =>
  s ? (LABELS[s.toLowerCase()] ?? s) : "-"
