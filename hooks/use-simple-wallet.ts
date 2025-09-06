"use client"

import { useState, useEffect, useCallback } from "react"
import { SimpleWeb3, type WalletState } from "@/lib/web3-simple"

export function useSimpleWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const web3 = SimpleWeb3.getInstance()

  const connect = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const state = await web3.connectWallet()
      setWalletState(state)
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsLoading(false)
    }
  }, [web3])

  const disconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    })
  }, [])

  const refreshBalance = useCallback(async () => {
    if (walletState.address) {
      try {
        const balance = await web3.getBalance(walletState.address)
        setWalletState((prev) => ({ ...prev, balance }))
      } catch (err) {
        console.error("Failed to refresh balance:", err)
      }
    }
  }, [walletState.address, web3])

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })

          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({
              method: "eth_chainId",
            })
            const balance = await web3.getBalance(accounts[0])

            setWalletState({
              isConnected: true,
              address: accounts[0],
              chainId,
              balance,
            })
          }
        } catch (err) {
          console.error("Failed to check connection:", err)
        }
      }
    }

    checkConnection()
  }, [web3])

  return {
    ...walletState,
    isLoading,
    error,
    connect,
    disconnect,
    refreshBalance,
  }
}
