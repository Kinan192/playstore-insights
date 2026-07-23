import * as React from "react"
import { Button } from "@/components/ui/button"

export default function AppsPage() {
  return (
    <div className="max-w-container-max mx-auto">
      <div className="flex justify-between items-center mb-lg">
        <h2 className="font-h2 text-h2 text-on-surface">Tracked Applications</h2>
        <Button className="gap-2">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New App
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
        {/* App Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md hover:bg-surface-container-low transition-colors duration-200">
          <div className="flex items-start justify-between border-b border-outline-variant pb-sm">
            <div className="flex items-center gap-3">
              <img 
                className="w-12 h-12 rounded-[10px] shadow-sm object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt_D2gSbuf4l44B0ykgFfDKP2YrbdiMcv44OM4lmWWhxQIy88cU8HQlDzi82W03ltZSRVrqzvIYocQeYZkDmQXjreJNma96QPCgCAz5eNJdFvbIhPT908iEHj2bfM3ggMnMNaivWSMaptd8LRA5naXiAb13wVe_Q9HqipWIxW6nFd_v8NGTvvIgUEuHz2ckIppzHY_J5xYZcvyqxXLT8yRNJaQ5CDxql9A2ym-LyC6NuF8Fu2vEJ0Ggg" 
                alt="FinTrack iOS" 
              />
              <div>
                <h3 className="font-h3 text-h3 text-on-surface">FinTrack iOS</h3>
                <p className="font-body-sm text-body-sm text-secondary">Finance & Productivity</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]">apps</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Current Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-h2 text-h2 text-on-surface">4.8</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Downloads</span>
              <span className="font-h3 text-h3 text-on-surface">12.4k</span>
            </div>
          </div>
          
          <div className="mt-sm h-12 w-full flex items-end justify-between gap-1">
            <div className="w-full bg-primary-fixed rounded-t-sm h-[20%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[30%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[25%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[55%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[45%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[70%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[85%]"></div>
            <div className="w-full bg-primary-container rounded-t-sm h-[100%]"></div>
          </div>
        </div>

        {/* App Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md hover:bg-surface-container-low transition-colors duration-200">
          <div className="flex items-start justify-between border-b border-outline-variant pb-sm">
            <div className="flex items-center gap-3">
              <img 
                className="w-12 h-12 rounded-full shadow-sm object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLMTsbw-CHf1y1BIx0XsrEsv9ezvWMZb8wBpwwVzqyAXRagVh0MgRH_0crahg9wHP-d6d35RdKLoLc_S_BfEGl4CZWvEVjKjA51FBrMAqXfpRu1mkiRoAdU-j1k22C7ZFLDmOeEfcIMO_CTbmXb_RZLQYRFoQVodih-WsMni3emD4IUv7Xt6-z2BCahBKSxkbXQQKDPAbpiYgmDiffb_0DftnneDdJn5C1OVJP5o20Qm4XcIBVKrzBpw" 
                alt="HealthSync" 
              />
              <div>
                <h3 className="font-h3 text-h3 text-on-surface">HealthSync</h3>
                <p className="font-body-sm text-body-sm text-secondary">Health & Fitness</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]">android</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Current Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-h2 text-h2 text-on-surface">4.5</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Downloads</span>
              <span className="font-h3 text-h3 text-on-surface">8.2k</span>
            </div>
          </div>
          
          <div className="mt-sm h-12 w-full flex items-end justify-between gap-1">
            <div className="w-full bg-primary-fixed rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[35%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[50%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[45%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[75%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[65%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[50%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-primary-container rounded-t-sm h-[40%]"></div>
          </div>
        </div>

        {/* App Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md hover:bg-surface-container-low transition-colors duration-200">
          <div className="flex items-start justify-between border-b border-outline-variant pb-sm">
            <div className="flex items-center gap-3">
              <img 
                className="w-12 h-12 rounded-[10px] shadow-sm object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUY5f8XW6wOGrnQhjt0Xzubo_5n6Uct2vfdY3Mv6Mxnl7WxMK6ysSAey2BCI9fm_Jog5l-Tc09DAsX0bdFpYOasjBCwmbwcxm7ZkltC-TnTk96jj0cN2W-47NlGgsyHYgjMrdvW-bmfX5OKxW72Jpa_Tmb9hUAvwLHfCQzEXL8NmRd7l1VYLZ0BtkRMaMP0L6ccbPA3eSD7HdUnkm_mf93wjtxJM-XosqCsbuYNbSZ_dimKNoLapkQtA" 
                alt="LensPro Max" 
              />
              <div>
                <h3 className="font-h3 text-h3 text-on-surface">LensPro Max</h3>
                <p className="font-body-sm text-body-sm text-secondary">Photo & Video</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[20px]">apps</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Current Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-h2 text-h2 text-on-surface">4.9</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Downloads</span>
              <span className="font-h3 text-h3 text-on-surface">32.1k</span>
            </div>
          </div>
          
          <div className="mt-sm h-12 w-full flex items-end justify-between gap-1">
            <div className="w-full bg-primary-fixed rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[70%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[65%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[80%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[85%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[75%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[90%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[95%]"></div>
            <div className="w-full bg-primary-fixed rounded-t-sm h-[85%]"></div>
            <div className="w-full bg-primary-container rounded-t-sm h-[100%]"></div>
          </div>
        </div>

      </div>
    </div>
  )
}
