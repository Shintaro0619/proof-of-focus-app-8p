export const BASE_SEPOLIA_RPC = "https://sepolia.base.org"
export const BASE_SEPOLIA_CHAIN_ID = "0x14a34" // 84532 in hex

export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: string | null
  balance: string | null
}

export class SimpleWeb3 {
  private static instance: SimpleWeb3

  static getInstance(): SimpleWeb3 {
    if (!SimpleWeb3.instance) {
      SimpleWeb3.instance = new SimpleWeb3()
    }
    return SimpleWeb3.instance
  }

  async connectWallet(): Promise<WalletState> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask not installed")
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      // Switch to Base Sepolia if needed
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BASE_SEPOLIA_CHAIN_ID }],
        })
      } catch (switchError: any) {
        // Chain not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: BASE_SEPOLIA_CHAIN_ID,
                chainName: "Base Sepolia",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: [BASE_SEPOLIA_RPC],
                blockExplorerUrls: ["https://sepolia.basescan.org"],
              },
            ],
          })
        }
      }

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      const balance = await this.getBalance(accounts[0])

      return {
        isConnected: true,
        address: accounts[0],
        chainId,
        balance,
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    }
  }

  async getBalance(address: string): Promise<string> {
    try {
      const response = await fetch(BASE_SEPOLIA_RPC, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [address, "latest"],
          id: 1,
        }),
      })

      const data = await response.json()
      const balanceWei = Number.parseInt(data.result, 16)
      const balanceEth = balanceWei / Math.pow(10, 18)
      return balanceEth.toFixed(4)
    } catch (error) {
      console.error("Failed to get balance:", error)
      return "0.0000"
    }
  }

  async sendTransaction(to: string, value: string, data?: string): Promise<string> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask not installed")
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })

      if (accounts.length === 0) {
        throw new Error("No connected accounts")
      }

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to,
            value: `0x${Number.parseInt(value).toString(16)}`,
            data: data || "0x",
          },
        ],
      })

      return txHash
    } catch (error) {
      console.error("Failed to send transaction:", error)
      throw error
    }
  }

  async createFocusAttestation(sessionData: {
    duration: number
    startTime: number
    endTime: number
  }): Promise<string> {
    // Simple message signing for attestation
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask not installed")
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      })

      if (accounts.length === 0) {
        throw new Error("No connected accounts")
      }

      const message = JSON.stringify({
        type: "focus_session",
        duration: sessionData.duration,
        startTime: sessionData.startTime,
        endTime: sessionData.endTime,
        timestamp: Date.now(),
      })

      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accounts[0]],
      })

      return signature
    } catch (error) {
      console.error("Failed to create attestation:", error)
      throw error
    }
  }
}

// Global type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
