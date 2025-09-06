export enum BadgeLevel {
  ROOKIE = 0,
  STREAK_STARTER = 1,
  LIGHTNING_FOCUS = 2,
  DIAMOND_MIND = 3,
  FOCUS_MASTER = 4,
  ZEN_WARRIOR = 5,
  ULTIMATE_FOCUS = 6,
}

export interface Badge {
  id: BadgeLevel
  name: string
  description: string
  requirement: number
  icon: string
  color: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export const BADGE_DEFINITIONS: Record<BadgeLevel, Badge> = {
  [BadgeLevel.ROOKIE]: {
    id: BadgeLevel.ROOKIE,
    name: "Focus Rookie",
    description: "Complete your first focus session",
    requirement: 1,
    icon: "🌱",
    color: "#10b981", // emerald-500
    rarity: "common",
  },
  [BadgeLevel.STREAK_STARTER]: {
    id: BadgeLevel.STREAK_STARTER,
    name: "Streak Starter",
    description: "Complete 7 focus sessions",
    requirement: 7,
    icon: "🔥",
    color: "#f59e0b", // amber-500
    rarity: "common",
  },
  [BadgeLevel.LIGHTNING_FOCUS]: {
    id: BadgeLevel.LIGHTNING_FOCUS,
    name: "Lightning Focus",
    description: "Complete 14 focus sessions",
    requirement: 14,
    icon: "⚡",
    color: "#3b82f6", // blue-500
    rarity: "rare",
  },
  [BadgeLevel.DIAMOND_MIND]: {
    id: BadgeLevel.DIAMOND_MIND,
    name: "Diamond Mind",
    description: "Complete 21 focus sessions",
    requirement: 21,
    icon: "💎",
    color: "#8b5cf6", // violet-500
    rarity: "rare",
  },
  [BadgeLevel.FOCUS_MASTER]: {
    id: BadgeLevel.FOCUS_MASTER,
    name: "Focus Master",
    description: "Complete 35 focus sessions",
    requirement: 35,
    icon: "🎯",
    color: "#ec4899", // pink-500
    rarity: "epic",
  },
  [BadgeLevel.ZEN_WARRIOR]: {
    id: BadgeLevel.ZEN_WARRIOR,
    name: "Zen Warrior",
    description: "Complete 50 focus sessions",
    requirement: 50,
    icon: "🧘",
    color: "#06b6d4", // cyan-500
    rarity: "epic",
  },
  [BadgeLevel.ULTIMATE_FOCUS]: {
    id: BadgeLevel.ULTIMATE_FOCUS,
    name: "Ultimate Focus",
    description: "Complete 100 focus sessions",
    requirement: 100,
    icon: "👑",
    color: "#fbbf24", // amber-400
    rarity: "legendary",
  },
}

export function getBadgeForSessionCount(sessionCount: number): Badge | null {
  const badges = Object.values(BADGE_DEFINITIONS).reverse() // Start from highest

  for (const badge of badges) {
    if (sessionCount >= badge.requirement) {
      return badge
    }
  }

  return null
}

export function getNextBadge(currentSessionCount: number): Badge | null {
  const badges = Object.values(BADGE_DEFINITIONS)

  for (const badge of badges) {
    if (currentSessionCount < badge.requirement) {
      return badge
    }
  }

  return null // Already at max level
}

export function getBadgeProgress(currentSessionCount: number, targetBadge: Badge): number {
  const previousBadge = getBadgeForSessionCount(targetBadge.requirement - 1)
  const baseCount = previousBadge ? previousBadge.requirement : 0
  const progressCount = currentSessionCount - baseCount
  const totalNeeded = targetBadge.requirement - baseCount

  return Math.min((progressCount / totalNeeded) * 100, 100)
}

export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common":
      return "#10b981" // emerald-500
    case "rare":
      return "#3b82f6" // blue-500
    case "epic":
      return "#8b5cf6" // violet-500
    case "legendary":
      return "#fbbf24" // amber-400
    default:
      return "#6b7280" // gray-500
  }
}
