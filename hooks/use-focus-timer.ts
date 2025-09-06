"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSimpleAttestation } from "./use-simple-attestation"
import { useSimpleWallet } from "./use-simple-wallet"
import { saveFocusSession, getUserStats, getTodaysSessions, type FocusSession } from "@/lib/session-storage"
import { useToast } from "@/hooks/use-toast"

export interface TimerState {
  timeLeft: number
  isRunning: boolean
  isPaused: boolean
  sessionId: string | null
  startTime: number | null
}

export function useFocusTimer(initialDuration: number = 50 * 60) {
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: initialDuration,
    isRunning: false,
    isPaused: false,
    sessionId: null,
    startTime: null,
  })

  const [userStats, setUserStats] = useState(getUserStats())
  const [todaysSessions, setTodaysSessions] = useState<FocusSession[]>([])
  const { isConnected } = useSimpleWallet()
  const { createFocusAttestation, isCreatingAttestation } = useSimpleAttestation()
  const { toast } = useToast()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTodaysSessions(getTodaysSessions())
    setUserStats(getUserStats())
  }, [])

  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused && timerState.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimerState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }))
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState.isRunning, timerState.isPaused, timerState.timeLeft])

  useEffect(() => {
    if (timerState.isRunning && timerState.timeLeft === 0) {
      completeSession()
    }
  }, [timerState.timeLeft, timerState.isRunning])

  const startTimer = useCallback(() => {
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const startTime = Date.now()

    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      sessionId,
      startTime,
      timeLeft: prev.timeLeft || initialDuration,
    }))

    toast({
      title: "Focus Session Started",
      description: "Stay focused! Your session is being tracked.",
    })
  }, [initialDuration, toast])

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: true,
    }))
  }, [])

  const resumeTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
    }))
  }, [])

  const resetTimer = useCallback(() => {
    if (timerState.sessionId && timerState.startTime) {
      // Save incomplete session
      const session: FocusSession = {
        id: timerState.sessionId,
        startTime: timerState.startTime,
        endTime: Date.now(),
        duration: Math.floor((initialDuration - timerState.timeLeft) / 60),
        completed: false,
        date: new Date().toISOString().split("T")[0],
      }
      saveFocusSession(session)
    }

    setTimerState({
      timeLeft: initialDuration,
      isRunning: false,
      isPaused: false,
      sessionId: null,
      startTime: null,
    })

    // Refresh stats
    setUserStats(getUserStats())
    setTodaysSessions(getTodaysSessions())
  }, [timerState, initialDuration])

  const completeSession = useCallback(async () => {
    if (!timerState.sessionId || !timerState.startTime) return

    const endTime = Date.now()
    const currentStats = getUserStats()
    const session: FocusSession = {
      id: timerState.sessionId,
      startTime: timerState.startTime,
      endTime,
      duration: Math.floor(initialDuration / 60), // Full duration in minutes
      completed: true,
      date: new Date().toISOString().split("T")[0],
    }

    try {
      if (isConnected) {
        toast({
          title: "Creating Blockchain Proof",
          description: "Generating EAS attestation for your focus session...",
        })

        const attestation = await createFocusAttestation({
          duration: session.duration,
          startTime: session.startTime,
          endTime: session.endTime,
          completed: true,
          sessionCount: currentStats.totalSessions + 1,
        })

        session.attestationId = attestation.attestationUID
        session.txHash = attestation.txHash

        toast({
          title: "Session Complete! 🎉",
          description: `Focus session verified on-chain. Attestation: ${attestation.attestationUID?.slice(0, 8)}...`,
        })
      } else {
        toast({
          title: "Session Complete!",
          description: "Connect your wallet to earn blockchain proof and NFT badges.",
        })
      }
    } catch (error) {
      console.error("Failed to create attestation:", error)
      toast({
        title: "Session Complete!",
        description: "Session saved locally. Blockchain proof failed - try again later.",
        variant: "destructive",
      })
    }

    // Save session
    saveFocusSession(session)

    // Reset timer state
    setTimerState({
      timeLeft: initialDuration,
      isRunning: false,
      isPaused: false,
      sessionId: null,
      startTime: null,
    })

    // Refresh stats
    setUserStats(getUserStats())
    setTodaysSessions(getTodaysSessions())
  }, [timerState, initialDuration, isConnected, createFocusAttestation, toast])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }, [])

  const progress = ((initialDuration - timerState.timeLeft) / initialDuration) * 100

  return {
    ...timerState,
    progress,
    userStats,
    todaysSessions: todaysSessions.filter((s) => s.completed),
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formatTime,
    isConnected,
    isCreatingAttestation, // Added loading state for attestation creation
  }
}
