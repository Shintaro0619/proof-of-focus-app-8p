export interface FocusSession {
  id: string
  startTime: number
  endTime?: number
  duration: number // in minutes
  completed: boolean
  attestationId?: string
  signature?: string
  date: string // YYYY-MM-DD format
}

export interface UserStats {
  totalSessions: number
  completedSessions: number
  currentStreak: number
  bestStreak: number
  totalFocusTime: number // in minutes
  lastSessionDate?: string
}

const SESSIONS_KEY = "proof-of-focus-sessions"
const STATS_KEY = "proof-of-focus-stats"

export function saveFocusSession(session: FocusSession): void {
  const sessions = getFocusSessions()
  sessions.push(session)
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
  updateUserStats(session)
}

export function getFocusSessions(): FocusSession[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(SESSIONS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function getUserStats(): UserStats {
  if (typeof window === "undefined") {
    return {
      totalSessions: 0,
      completedSessions: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalFocusTime: 0,
    }
  }

  const stored = localStorage.getItem(STATS_KEY)
  return stored
    ? JSON.parse(stored)
    : {
        totalSessions: 0,
        completedSessions: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalFocusTime: 0,
      }
}

function updateUserStats(session: FocusSession): void {
  const stats = getUserStats()
  const today = new Date().toISOString().split("T")[0]

  stats.totalSessions += 1
  if (session.completed) {
    stats.completedSessions += 1
    stats.totalFocusTime += session.duration

    // Update streak
    if (stats.lastSessionDate) {
      const lastDate = new Date(stats.lastSessionDate)
      const currentDate = new Date(today)
      const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

      if (daysDiff === 1) {
        stats.currentStreak += 1
      } else if (daysDiff > 1) {
        stats.currentStreak = 1
      }
    } else {
      stats.currentStreak = 1
    }

    stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak)
    stats.lastSessionDate = today
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

export function getTodaysSessions(): FocusSession[] {
  const today = new Date().toISOString().split("T")[0]
  return getFocusSessions().filter((session) => session.date === today)
}

export function getSessionsForMonth(year: number, month: number): FocusSession[] {
  const sessions = getFocusSessions()
  return sessions.filter((session) => {
    const sessionDate = new Date(session.date)
    return sessionDate.getFullYear() === year && sessionDate.getMonth() === month
  })
}

export function getSessionCount(): number {
  const stats = getUserStats()
  return stats.completedSessions
}

export function getCompletedSessionsCount(): number {
  return getFocusSessions().filter((session) => session.completed).length
}
