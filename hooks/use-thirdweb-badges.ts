"use client"

import { useState, useEffect } from "react"
import { useSimpleWallet } from "./use-simple-wallet"

export const BADGE_TOKEN_IDS = {
  ROOKIE: 1,
  STREAK_STARTER: 2,
  LIGHTNING_FOCUS: 3,
  DIAMOND_MIND: 4,
  FOCUS_MASTER: 5,
  ZEN_WARRIOR: 6,
  ULTIMATE_FOCUS: 7,
} as const

export const BADGE_REQUIREMENTS = {
  ROOKIE: 1,
  STREAK_STARTER: 7,
  LIGHTNING_FOCUS: 14,
  DIAMOND_MIND: 21,
  FOCUS_MASTER: 35,
  ZEN_WARRIOR: 50,
  ULTIMATE_FOCUS: 100,
} as const

export function useThirdwebBadges() {
  const { address, isConnected } = useSimpleWallet()
  const [badges, setBadges] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock implementation for now to avoid thirdweb loading issues
  const fetchBadges = async () => {
    if (!address || !isConnected) return

    setLoading(true)
    setError(null)

    try {
      // Simulate fetching badges from localStorage for now
      const storedBadges = localStorage.getItem(`badges-${address}`)
      const badgeBalances = storedBadges ? JSON.parse(storedBadges) : {}

      // Initialize all badges to 0 if not present
      Object.keys(BADGE_TOKEN_IDS).forEach((badgeName) => {
        if (!(badgeName in badgeBalances)) {
          badgeBalances[badgeName] = 0
        }
      })

      setBadges(badgeBalances)
    } catch (err) {
      console.error("Error fetching badges:", err)
      setError("Failed to fetch badges")
    } finally {
      setLoading(false)
    }
  }

  const mintBadge = async (badgeType: keyof typeof BADGE_TOKEN_IDS, completedSessions: number) => {
    if (!address || !isConnected) {
      throw new Error("Wallet not connected")
    }

    const requiredSessions = BADGE_REQUIREMENTS[badgeType]

    if (completedSessions < requiredSessions) {
      throw new Error(`Need ${requiredSessions} sessions to earn ${badgeType} badge`)
    }

    if (badges[badgeType] > 0) {
      throw new Error(`You already have the ${badgeType} badge`)
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate minting by updating localStorage
      const newBadges = { ...badges, [badgeType]: 1 }
      localStorage.setItem(`badges-${address}`, JSON.stringify(newBadges))
      setBadges(newBadges)

      console.log("[v0] Badge minted successfully:", badgeType)
      return { success: true, badgeType }
    } catch (err) {
      console.error("Error minting badge:", err)
      setError("Failed to mint badge")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getNextBadge = (completedSessions: number) => {
    for (const [badgeName, requirement] of Object.entries(BADGE_REQUIREMENTS)) {
      if (completedSessions >= requirement && badges[badgeName] === 0) {
        return {
          name: badgeName,
          requirement,
          tokenId: BADGE_TOKEN_IDS[badgeName as keyof typeof BADGE_TOKEN_IDS],
        }
      }
    }
    return null
  }

  const getProgressToNextBadge = (completedSessions: number) => {
    const sortedBadges = Object.entries(BADGE_REQUIREMENTS).sort(([, a], [, b]) => a - b)

    for (const [badgeName, requirement] of sortedBadges) {
      if (completedSessions < requirement) {
        return {
          name: badgeName,
          current: completedSessions,
          required: requirement,
          progress: (completedSessions / requirement) * 100,
        }
      }
    }

    return null
  }

  useEffect(() => {
    if (isConnected && address) {
      fetchBadges()
    }
  }, [isConnected, address])

  return {
    badges,
    loading,
    error,
    mintBadge,
    fetchBadges,
    getNextBadge,
    getProgressToNextBadge,
  }
}
