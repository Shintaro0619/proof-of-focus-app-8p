"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Share2, Settings, ExternalLink, Calendar, Clock, Target, Wallet, Shield } from "lucide-react"
import { useSimpleWallet } from "@/hooks/use-simple-wallet"
import { AttestationViewer } from "./attestation-viewer"
import { getUserStats } from "@/lib/session-storage"
import { useState } from "react"

export function ProfileView() {
  const { address, isConnected, isConnecting, connectWallet, disconnect, formatAddress } = useSimpleWallet()
  const [showAttestationViewer, setShowAttestationViewer] = useState(false)

  const userStats = getUserStats()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Track your journey and settings</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 text-center">
        <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Focus Warrior</h2>
        <p className="text-sm text-muted-foreground mb-4">Member since December 2024</p>
        {isConnected && address && (
          <p className="text-xs text-muted-foreground mb-4 font-mono">{formatAddress(address)}</p>
        )}
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Share2 className="w-4 h-4" />
          Share Progress
        </Button>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{userStats.totalSessions}</div>
          <div className="text-xs text-muted-foreground">Total Sessions</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-chart-3 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{Math.floor(userStats.totalFocusTime / 60)}h</div>
          <div className="text-xs text-muted-foreground">Focus Time</div>
        </Card>
        <Card className="p-4 text-center">
          <Target className="w-6 h-6 text-chart-5 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{userStats.currentStreak}d</div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </Card>
      </div>

      {/* Wallet Connection */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isConnected ? "bg-chart-3" : "bg-destructive"
            }`}
          >
            <Wallet className="w-4 h-4 text-background" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {isConnected ? "Wallet Connected" : "Wallet Not Connected"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isConnected
                ? "Ready to earn blockchain proof of your focus sessions"
                : "Connect to start earning blockchain proof"}
            </p>
          </div>
        </div>
        {isConnected ? (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono bg-muted p-2 rounded">
              {formatAddress(address!)}
            </div>
            <Button variant="outline" onClick={() => disconnect()} className="w-full bg-transparent">
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <Button onClick={connectWallet} disabled={isConnecting} className="w-full">
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </Card>

      {isConnected && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Blockchain Attestations
            </h3>
            <Button variant="outline" size="sm" onClick={() => setShowAttestationViewer(!showAttestationViewer)}>
              {showAttestationViewer ? "Hide" : "Verify"}
            </Button>
          </div>
          {showAttestationViewer && <AttestationViewer />}
        </Card>
      )}

      {/* Settings & More */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4">Settings & More</h3>
        <div className="space-y-3">
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Monthly Reflection</span>
            </div>
            <div className="text-sm text-muted-foreground">Review your progress and set new goals</div>
          </Button>

          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-primary" />
              <span>Focus Goals</span>
            </div>
            <div className="text-sm text-muted-foreground">Set your daily and weekly targets</div>
          </Button>

          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-primary" />
              <span>Timer Settings</span>
            </div>
            <div className="text-sm text-muted-foreground">Customize your focus sessions</div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between"
            disabled={!isConnected}
            onClick={() => window.open("https://base-sepolia.easscan.org/", "_blank")}
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-primary" />
              <span>Blockchain Explorer</span>
            </div>
            <div className="text-sm text-muted-foreground">View your on-chain attestations</div>
          </Button>

          <Button variant="ghost" className="w-full justify-between">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-primary" />
              <span>Share App</span>
            </div>
            <div className="text-sm text-muted-foreground">Invite friends to join the focus journey</div>
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Proof of Focus v1.0</p>
        <p className="mt-1">
          Built on Base Sepolia testnet. Your focus sessions are recorded by blockchain attestations, creating
          verifiable proof of your dedication.
        </p>
        <p className="mt-2">Made with ❤️ because focus everywhere.</p>
      </div>
    </div>
  )
}
