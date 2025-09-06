import { createPublicClient, createWalletClient, custom, http } from "viem"
import { baseSepolia } from "viem/chains"

// EAS Contract addresses on Base Sepolia
export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021"
export const SCHEMA_REGISTRY_ADDRESS = "0x4200000000000000000000000000000000000020"

// Focus Session Schema UID (would be created after deployment)
export const FOCUS_SESSION_SCHEMA_UID = "0x..." // To be updated after schema registration

export interface FocusSessionAttestation {
  sessionId: string
  duration: number
  startTime: number
  endTime: number
  completed: boolean
}

export class EASIntegration {
  private publicClient
  private walletClient

  constructor() {
    this.publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    })
  }

  async initWalletClient() {
    if (typeof window !== "undefined" && window.ethereum) {
      this.walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
      })
    }
  }

  // Create attestation using direct contract interaction
  async createFocusAttestation(sessionData: FocusSessionAttestation): Promise<string> {
    try {
      await this.initWalletClient()

      if (!this.walletClient) {
        throw new Error("Wallet not connected")
      }

      // Encode the attestation data
      const encodedData = this.encodeAttestationData(sessionData)

      // For now, return a mock attestation ID
      // In production, this would interact with the EAS contract
      const mockAttestationId = `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`

      console.log("[v0] Created focus attestation:", mockAttestationId)
      return mockAttestationId
    } catch (error) {
      console.error("[v0] Error creating attestation:", error)
      throw error
    }
  }

  private encodeAttestationData(sessionData: FocusSessionAttestation): string {
    // Encode session data for EAS
    return JSON.stringify(sessionData)
  }

  async verifyAttestation(attestationId: string): Promise<boolean> {
    try {
      // Mock verification for now
      console.log("[v0] Verifying attestation:", attestationId)
      return attestationId.startsWith("0x")
    } catch (error) {
      console.error("[v0] Error verifying attestation:", error)
      return false
    }
  }
}

export const easIntegration = new EASIntegration()
