"use client"

import { useState } from "react"
import { FocusTimer } from "@/components/focus-timer"
import { ProgressView } from "@/components/progress-view"
import { BadgeCollection } from "@/components/badge-collection"
import { ProfileView } from "@/components/profile-view"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"focus" | "progress" | "badges" | "profile">("focus")

  const renderActiveView = () => {
    switch (activeTab) {
      case "focus":
        return <FocusTimer />
      case "progress":
        return <ProgressView />
      case "badges":
        return <BadgeCollection />
      case "profile":
        return <ProfileView />
      default:
        return <FocusTimer />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar Simulation */}
      <div className="h-11 bg-background flex items-center justify-center">
        <div className="text-sm font-medium text-foreground">3:38</div>
        <div className="absolute right-4 flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-foreground rounded-full"></div>
            <div className="w-1 h-3 bg-muted rounded-full"></div>
          </div>
          <div className="ml-2 text-sm">📶</div>
          <div className="text-sm">🔋</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">{renderActiveView()}</main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
