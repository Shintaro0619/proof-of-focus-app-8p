"use client"

import { Timer, TrendingUp, Award, User } from "lucide-react"

interface BottomNavigationProps {
  activeTab: "focus" | "progress" | "badges" | "profile"
  onTabChange: (tab: "focus" | "progress" | "badges" | "profile") => void
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "focus" as const, icon: Timer, label: "Focus" },
    { id: "progress" as const, icon: TrendingUp, label: "Progress" },
    { id: "badges" as const, icon: Award, label: "Badges" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="bg-card border-t border-border">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
