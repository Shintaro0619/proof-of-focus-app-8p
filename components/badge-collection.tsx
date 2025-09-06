"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Star, ExternalLink, Trophy } from "lucide-react"
import { useThirdwebBadges } from "@/hooks/use-thirdweb-badges"
import { useSimpleWallet } from "@/hooks/use-simple-wallet"
import type { BADGE_REQUIREMENTS } from "@/lib/thirdweb-config"
import { getSessionCount } from "@/lib/session-storage"

const BADGE_DEFINITIONS = [
  {
    id: "ROOKIE",
    name: "Focus Rookie",
    description: "Complete your first focus session",
    icon: "🔥",
    color: "#10b981",
    rarity: "common" as const,
    requirement: 1,
  },
  {
    id: "STREAK_STARTER",
    name: "Streak Starter",
    description: "Complete 7 focus sessions",
    icon: "⚡",
    color: "#3b82f6",
    rarity: "rare" as const,
    requirement: 7,
  },
  {
    id: "LIGHTNING_FOCUS",
    name: "Lightning Focus",
    description: "Complete 14 focus sessions",
    icon: "⚡",
    color: "#8b5cf6",
    rarity: "epic" as const,
    requirement: 14,
  },
  {
    id: "DIAMOND_MIND",
    name: "Diamond Mind",
    description: "Complete 21 focus sessions",
    icon: "💎",
    color: "#06b6d4",
    rarity: "legendary" as const,
    requirement: 21,
  },
  {
    id: "FOCUS_MASTER",
    name: "Focus Master",
    description: "Complete 35 focus sessions",
    icon: "👑",
    color: "#f59e0b",
    rarity: "legendary" as const,
    requirement: 35,
  },
  {
    id: "ZEN_WARRIOR",
    name: "Zen Warrior",
    description: "Complete 50 focus sessions",
    icon: "🧘",
    color: "#ef4444",
    rarity: "legendary" as const,
    requirement: 50,
  },
  {
    id: "ULTIMATE_FOCUS",
    name: "Ultimate Focus",
    description: "Complete 100 focus sessions",
    icon: "🌟",
    color: "#8b5cf6",
    rarity: "legendary" as const,
    requirement: 100,
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "#10b981"
    case "rare":
      return "#3b82f6"
    case "epic":
      return "#8b5cf6"
    case "legendary":
      return "#f59e0b"
    default:
      return "#6b7280"
  }
}

export function BadgeCollection() {
  const { badges, loading, mintBadge, getNextBadge, getProgressToNextBadge } = useThirdwebBadges()
  const { isConnected, address } = useSimpleWallet()

  const sessionCount = getSessionCount()
  const nextBadgeInfo = getNextBadge(sessionCount)
  const progressInfo = getProgressToNextBadge(sessionCount)

  const stats = {
    earned: Object.values(badges).reduce((sum, count) => sum + (count > 0 ? 1 : 0), 0),
    total: BADGE_DEFINITIONS.length,
    completionPercentage: Math.round(
      (Object.values(badges).reduce((sum, count) => sum + (count > 0 ? 1 : 0), 0) / BADGE_DEFINITIONS.length) * 100,
    ),
    common: BADGE_DEFINITIONS.filter((b) => b.rarity === "common" && badges[b.id] > 0).length,
    rare: BADGE_DEFINITIONS.filter((b) => b.rarity === "rare" && badges[b.id] > 0).length,
    epic: BADGE_DEFINITIONS.filter((b) => b.rarity === "epic" && badges[b.id] > 0).length,
    legendary: BADGE_DEFINITIONS.filter((b) => b.rarity === "legendary" && badges[b.id] > 0).length,
  }

  const handleMintBadge = async (badgeId: string) => {
    if (!isConnected) return

    try {
      await mintBadge(badgeId as keyof typeof BADGE_REQUIREMENTS, sessionCount)
    } catch (error) {
      console.error("Failed to mint badge:", error)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Badge Collection</h1>
        <p className="text-muted-foreground">Earn badges for your focus achievements</p>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
            <Star className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.earned}</div>
          <div className="text-sm text-muted-foreground">Badges Earned</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-8 h-8 bg-chart-5 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="text-sm font-bold text-background">{stats.completionPercentage}%</div>
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.completionPercentage}%</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </Card>
      </div>

      {/* Rarity Breakdown */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Collection Breakdown</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">{stats.common}</div>
            <div className="text-xs text-muted-foreground">Common</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{stats.rare}</div>
            <div className="text-xs text-muted-foreground">Rare</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{stats.epic}</div>
            <div className="text-xs text-muted-foreground">Epic</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">{stats.legendary}</div>
            <div className="text-xs text-muted-foreground">Legendary</div>
          </div>
        </div>
      </Card>

      {/* Next Badge Progress */}
      {progressInfo && (
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Next Badge</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-primary/20 text-primary">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground">{progressInfo.name}</span>
                <Badge variant="secondary" className="text-xs">
                  NEXT
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                {progressInfo.current} / {progressInfo.required} sessions
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300 bg-primary"
                  style={{ width: `${progressInfo.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{Math.round(progressInfo.progress)}% complete</div>
            </div>
          </div>
        </Card>
      )}

      {/* Badge Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">All Badges</h3>
          {isConnected && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ExternalLink className="w-4 h-4" />
              View on Chain
            </Button>
          )}
        </div>

        {BADGE_DEFINITIONS.map((badge) => {
          const earned = badges[badge.id] > 0
          const canMint = sessionCount >= badge.requirement && !earned && isConnected
          const progress = Math.min((sessionCount / badge.requirement) * 100, 100)

          return (
            <Card key={badge.id} className={`p-4 ${earned ? "bg-card" : "bg-muted/50"}`}>
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    earned ? "" : "bg-muted border-2 border-dashed border-muted-foreground grayscale"
                  }`}
                  style={
                    earned
                      ? {
                          backgroundColor: badge.color + "20",
                          color: badge.color,
                          border: `2px solid ${badge.color}40`,
                        }
                      : {}
                  }
                >
                  {earned ? badge.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{
                        backgroundColor: getRarityColor(badge.rarity) + "20",
                        color: getRarityColor(badge.rarity),
                      }}
                    >
                      {badge.rarity.toUpperCase()}
                    </Badge>
                    {isConnected && earned && (
                      <Badge variant="outline" className="text-xs">
                        NFT
                      </Badge>
                    )}
                    {canMint && (
                      <Button
                        size="sm"
                        onClick={() => handleMintBadge(badge.id)}
                        disabled={loading}
                        className="ml-auto"
                      >
                        {loading ? "Minting..." : "Mint NFT"}
                      </Button>
                    )}
                  </div>
                  <h4 className={`font-semibold ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                    {badge.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">Requirement: {badge.requirement} sessions</div>
                  {!earned && progress > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: badge.color,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% complete</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Blockchain Info */}
      {isConnected && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Blockchain Verified</h3>
              <p className="text-sm text-muted-foreground">
                Your badges are ERC-1155 NFTs stored on Base L2, providing verifiable proof of your focus achievements.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
