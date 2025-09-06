"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProgressView() {
  const currentMonth = "September 2025"
  const sessionsThisMonth = 7
  const bestStreak = 12

  // Calendar data - simplified for demo
  const calendarDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    hasSession: Math.random() > 0.7,
    isToday: i + 1 === 6,
  }))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Progress</h1>
        <p className="text-muted-foreground">Track your focus journey</p>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-primary mb-1">{sessionsThisMonth}</div>
          <div className="text-sm text-muted-foreground">This Month</div>
          <div className="text-xs text-muted-foreground mt-1">7 days completed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-chart-3 mb-1">{bestStreak}</div>
          <div className="text-sm text-muted-foreground">Best Streak</div>
          <div className="text-xs text-muted-foreground mt-1">Personal record</div>
        </Card>
      </div>

      {/* Calendar */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="font-semibold text-foreground">{currentMonth}</h3>
          <Button variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {calendarDays.map(({ day, hasSession, isToday }) => (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                isToday
                  ? "bg-primary text-primary-foreground font-bold"
                  : hasSession
                    ? "bg-chart-3 text-background"
                    : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-3 rounded"></div>
            <span className="text-muted-foreground">Session completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Today</span>
          </div>
        </div>
      </Card>

      {/* Monthly Reflection */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Monthly Reflection</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Track your focus journey with monthly reflections. Review your progress and set goals for the next month.
        </p>
        <Button variant="outline" className="w-full bg-transparent">
          Start Monthly Reflection
        </Button>
      </Card>
    </div>
  )
}
