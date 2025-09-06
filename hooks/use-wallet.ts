"use client"

import { useCallback, useState } from "react"

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    // Mock connection delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsConnected(true)
    setAddress("0x1234567890123456789012345678901234567890")
    setIsConnecting(false)
  }, [])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setAddress(undefined)
  }, [])

  const formatAddress = useCallback((addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }, [])

  return {
    address,
    isConnected,
    isConnecting,
    connectWallet,
    disconnect,
    formatAddress,
    connectors: [],
  }
}
