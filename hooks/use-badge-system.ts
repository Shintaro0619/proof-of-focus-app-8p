"use client"

import { useState, useEffect, useCallback } from "react"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { getUserStats } from "@/lib/session-storage"
import {
  BADGE_DEFINITIONS,
  getBadgeForSessionCount,
  getNextBadge,
  getBadgeProgress,
  type Badge,
} from "@/lib/badge-system"
import { useToast } from "@/hooks/use-toast"

// Mock contract address - in production this would be the deployed contract
const FOCUS_BADGES_CONTRACT = "0x..." // To be replaced with actual deployed contract

export function useBadgeSystem() {
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  const [userBadges, setUserBadges] = useState<Badge[]>([])
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null)
  const [nextBadge, setNextBadge] = useState<Badge | null>(null)
  const [progress, setProgress] = useState(0)

  // Get user session count from local storage
  const userStats = getUserStats()
  const sessionCount = userStats.completedSessions

  // Mock contract reads - in production these would be real contract calls
  const { data: contractSessionCount } = useReadContract({
    address: FOCUS_BADGES_CONTRACT as `0x${string}`,
    abi: [
      {
        name: "getUserSessionCount",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "user", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
      },
    ],
    functionName: "getUserSessionCount",
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  })

  const { data: userBadgeLevel } = useReadContract({
    address: FOCUS_BADGES_CONTRACT as `0x${string}`,
    abi: [
      {
        name: "getUserBadgeLevel",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "user", type: "address" }],
        outputs: [{ name: "", type: "uint8" }],
      },
    ],
    functionName: "getUserBadgeLevel",
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  })

  const { writeContract: completeSession } = useWriteContract()

  // Update badge state based on session count
  useEffect(() => {
    const current = getBadgeForSessionCount(sessionCount)
    const next = getNextBadge(sessionCount)

    setCurrentBadge(current)
    setNextBadge(next)

    if (next) {
      setProgress(getBadgeProgress(sessionCount, next))
    } else {
      setProgress(100) // Max level reached
    }

    // Get all earned badges
    const earned: Badge[] = []
    Object.values(BADGE_DEFINITIONS).forEach((badge) => {
      if (sessionCount >= badge.requirement) {
        earned.push(badge)
      }
    })
    setUserBadges(earned)
  }, [sessionCount])

  // Simulate contract interaction for session completion
  const handleSessionComplete = useCallback(async () => {
    if (!isConnected || !address) {
      return
    }

    try {
      // In production, this would call the actual contract
      // completeSession({
      //   address: FOCUS_BADGES_CONTRACT as `0x${string}`,
      //   abi: [...],
      //   functionName: 'completeSession',
      //   args: [address],
      // })

      // For now, we'll simulate the badge upgrade check
      const previousBadge = currentBadge
      const newBadge = getBadgeForSessionCount(sessionCount)

      if (newBadge && (!previousBadge || newBadge.id > previousBadge.id)) {
        toast({
          title: "Badge Upgraded!",
          description: `You've earned the ${newBadge.name} badge!`,
        })
      }
    } catch (error) {
      console.error("Failed to complete session on contract:", error)
    }
  }, [isConnected, address, currentBadge, sessionCount, toast])

  // Get all available badges with earned status
  const getAllBadges = useCallback(() => {
    return Object.values(BADGE_DEFINITIONS).map((badge) => ({
      ...badge,
      earned: sessionCount >= badge.requirement,
      progress: sessionCount >= badge.requirement ? 100 : getBadgeProgress(sessionCount, badge),
    }))
  }, [sessionCount])

  // Get badge rarity distribution
  const getBadgeStats = useCallback(() => {
    const stats = {
      total: Object.keys(BADGE_DEFINITIONS).length,
      earned: userBadges.length,
      common: userBadges.filter((b) => b.rarity === "common").length,
      rare: userBadges.filter((b) => b.rarity === "rare").length,
      epic: userBadges.filter((b) => b.rarity === "epic").length,
      legendary: userBadges.filter((b) => b.rarity === "legendary").length,
    }

    return {
      ...stats,
      completionPercentage: Math.round((stats.earned / stats.total) * 100),
    }
  }, [userBadges])

  return {
    userBadges,
    currentBadge,
    nextBadge,
    progress,
    sessionCount,
    contractSessionCount: contractSessionCount ? Number(contractSessionCount) : 0,
    userBadgeLevel: userBadgeLevel ? Number(userBadgeLevel) : 0,
    isConnected,
    handleSessionComplete,
    getAllBadges,
    getBadgeStats,
  }
}
