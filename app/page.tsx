"use client"

import { useState, useEffect } from "react"
import sdk from "@farcaster/frame-sdk"
import { FocusTimer } from "@/components/focus-timer"
import { ProgressView } from "@/components/progress-view"
import { BadgeCollection } from "@/components/badge-collection"
import { ProfileView } from "@/components/profile-view"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"focus" | "progress" | "badges" | "profile">("focus")
  const [isSDKLoaded, setIsSDKLoaded] = useState(false)

  useEffect(() => {
    const initSDK = async () => {
      try {
        console.log("[v0] Starting Farcaster SDK initialization...")
        console.log("[v0] SDK object:", sdk)

        if (typeof window !== "undefined") {
          console.log("[v0] Window is defined, checking Farcaster context...")

          // Check if we're in a Farcaster context
          if (sdk && sdk.context) {
            const context = await sdk.context
            console.log("[v0] Farcaster context:", context)
          }

          // Signal to Farcaster that the app is ready
          if (sdk && sdk.actions && sdk.actions.ready) {
            sdk.actions.ready()
            console.log("[v0] Farcaster SDK ready() called successfully")
          } else {
            console.log("[v0] SDK actions not available")
          }
        }
      } catch (error) {
        console.log("[v0] SDK initialization error:", error)
        // This is normal when testing outside of Farcaster
      } finally {
        console.log("[v0] Setting SDK as loaded")
        setIsSDKLoaded(true)
      }
    }

    initSDK()
  }, [])

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

  if (!isSDKLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Proof of Focus...</p>
        </div>
      </div>
    )
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
