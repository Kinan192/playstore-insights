"use client";

import React, { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Minus } from "lucide-react";

// --- MOCK DATA ---
const APPS = [
  {
    id: "traveloka",
    name: "Traveloka",
    totalReviews: 3600,
    avgRating: 4.2,
    sentiments: [
      { name: "Positive", value: 2150, color: "var(--sentiment-positive)" },
      { name: "Neutral", value: 850, color: "var(--sentiment-neutral)" },
      { name: "Negative", value: 600, color: "var(--sentiment-negative)" },
    ],
    topKeywords: ["Mudah", "Promo", "Tiket Pesawat", "Customer Service", "Mahal"]
  },
  {
    id: "tiket",
    name: "Tiket.com",
    totalReviews: 3600,
    avgRating: 4.0,
    sentiments: [
      { name: "Positive", value: 1900, color: "var(--sentiment-positive)" },
      { name: "Neutral", value: 900, color: "var(--sentiment-neutral)" },
      { name: "Negative", value: 800, color: "var(--sentiment-negative)" },
    ],
    topKeywords: ["Diskon", "Gampang", "Hotel", "Error", "Refund lambat"]
  }
];

const COMPARISON_DATA = [
  { name: 'Positive', Traveloka: 2150, 'Tiket.com': 1900 },
  { name: 'Neutral', Traveloka: 850, 'Tiket.com': 900 },
  { name: 'Negative', Traveloka: 600, 'Tiket.com': 800 },
];

export default function Dashboard() {
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  // Minimalist Stat Card
  const StatCard = ({ title, value, icon: Icon, subtitle }: any) => (
    <div className="card-minimal p-5 flex flex-col gap-2">
      <div className="flex justify-between items-center text-muted-foreground">
        <span className="text-sm font-medium">{title}</span>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sentiment Comparison</h1>
          <p className="text-muted-foreground mt-1">Comparing user reviews across top applications.</p>
        </div>
        <div className="flex gap-2">
          <select className="card-minimal px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Traveloka vs Tiket.com</option>
            <option>Agoda vs Pegipegi</option>
          </select>
          <button 
            onClick={() => {
              setIsSimulatingLoad(true);
              setTimeout(() => setIsSimulatingLoad(false), 800);
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {isSimulatingLoad ? (
        <div className="space-y-4" aria-busy="true">
          <div className="h-32 bg-muted animate-pulse rounded-lg" />
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
        </div>
      ) : (
        <>
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Analyzed" 
              value="7,200" 
              icon={MessageSquare} 
              subtitle="Reviews across 2 apps" 
            />
            <StatCard 
              title="Avg. Positive" 
              value="56.2%" 
              icon={ThumbsUp} 
              subtitle="+2.4% from last month" 
            />
            <StatCard 
              title="Avg. Neutral" 
              value="24.3%" 
              icon={Minus} 
              subtitle="Consistent" 
            />
            <StatCard 
              title="Avg. Negative" 
              value="19.5%" 
              icon={ThumbsDown} 
              subtitle="Needs attention" 
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bar Chart Comparison */}
            <div className="card-minimal p-5 flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Sentiment Distribution</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={COMPARISON_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                    <Tooltip 
                      cursor={{ fill: 'var(--muted)' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="Traveloka" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Tiket.com" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Individual App Breakdown */}
            <div className="card-minimal p-5 flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Traveloka Breakdown</h2>
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={APPS[0].sentiments}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {APPS[0].sentiments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold">{APPS[0].avgRating}</span>
                  <div className="flex text-yellow-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
