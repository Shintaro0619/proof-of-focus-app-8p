"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Square, RotateCcw } from "lucide-react"
import { useFocusTimer } from "@/hooks/use-focus-timer"

export function FocusTimer() {
  const {
    timeLeft,
    isRunning,
    isPaused,
    progress,
    userStats,
    todaysSessions,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    formatTime,
    isConnected,
  } = useFocusTimer()

  const handlePlayPause = () => {
    if (!isRunning && !isPaused) {
      startTimer()
    } else if (isRunning) {
      pauseTimer()
    } else if (isPaused) {
      resumeTimer()
    }
  }

  const getTimerStatus = () => {
    if (isRunning) return "Focus Time"
    if (isPaused) return "Paused"
    return "Ready to Focus"
  }

  const getPlayButtonIcon = () => {
    if (isRunning) return <Pause className="w-6 h-6" />
    return <Play className="w-6 h-6" />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Proof of Focus</h1>
        <p className="text-muted-foreground">
          {isConnected ? "Stay focused, earn blockchain proof" : "Connect wallet to earn blockchain proof"}
        </p>
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={`transition-all duration-1000 ease-in-out ${
                isRunning ? "text-primary" : isPaused ? "text-chart-5" : "text-muted"
              }`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-foreground">{formatTime(timeLeft)}</div>
            <div className="text-sm text-muted-foreground mt-1">{getTimerStatus()}</div>
            {isPaused && <div className="text-xs text-chart-5 mt-1">Tap play to resume</div>}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        <Button size="lg" onClick={handlePlayPause} className="w-16 h-16 rounded-full" disabled={timeLeft === 0}>
          {getPlayButtonIcon()}
        </Button>

        {(isRunning || isPaused) && (
          <Button variant="outline" size="lg" onClick={resetTimer} className="w-16 h-16 rounded-full bg-transparent">
            <Square className="w-6 h-6" />
          </Button>
        )}

        {!isRunning && !isPaused && timeLeft !== 50 * 60 && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
            className="w-16 h-16 rounded-full bg-transparent"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Session Status */}
      {(isRunning || isPaused) && (
        <Card className="p-4 text-center">
          <div className="text-sm text-muted-foreground mb-2">Current Session</div>
          <div className="text-lg font-semibold text-foreground">
            {Math.floor((50 * 60 - timeLeft) / 60)} minutes focused
          </div>
          {isConnected && (
            <div className="text-xs text-primary mt-1">Blockchain attestation will be created upon completion</div>
          )}
        </Card>
      )}

      {/* Today's Progress */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">{"Today's Progress"}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-destructive rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-destructive-foreground rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{todaysSessions.length}</div>
            <div className="text-xs text-muted-foreground">
              Sessions
              <br />
              Today
            </div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-chart-3 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{userStats.currentStreak}d</div>
            <div className="text-xs text-muted-foreground">
              Current
              <br />
              Streak
            </div>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{userStats.completedSessions}</div>
            <div className="text-xs text-muted-foreground">
              Total
              <br />
              Sessions
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Target Progress */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Weekly Target</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{todaysSessions.length} of 7 days completed this week</span>
            <span className="text-foreground font-medium">{Math.round((todaysSessions.length / 7) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((todaysSessions.length / 7) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Next Badge Evolution */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Next Badge Evolution</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-chart-5 rounded-full flex items-center justify-center">
            <div className="text-sm font-bold text-background">🏆</div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-foreground">
              {userStats.completedSessions < 7 ? "Streak Starter" : "Lightning Focus"}
            </div>
            <div className="text-sm text-muted-foreground">
              {userStats.completedSessions} / {userStats.completedSessions < 7 ? 7 : 14} sessions
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((userStats.completedSessions / (userStats.completedSessions < 7 ? 7 : 14)) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
