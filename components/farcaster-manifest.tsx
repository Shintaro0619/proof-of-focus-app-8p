"use client"

import { useEffect } from "react"

export function FarcasterMiniAppDetection() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const isMiniApp = url.pathname.startsWith("/miniapp") || url.searchParams.get("miniApp") === "true"

    if (isMiniApp) {
      import("@farcaster/miniapp-sdk")
        .then(({ sdk }) => {
          console.log("[v0] Farcaster Mini App SDK loaded")
          // Initialize Mini App specific features
          if (sdk?.actions?.ready) {
            sdk.actions.ready()
          }
        })
        .catch((error) => {
          console.log("[v0] Farcaster SDK not available:", error)
        })
    }
  }, [])

  return null
}
