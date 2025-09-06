import { createPublicClient, http } from "viem"
import { baseSepolia } from "viem/chains"

// Base Sepolia EAS contract address
export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021"

// Focus Session Schema UID (you would register this schema on EAS)
export const FOCUS_SESSION_SCHEMA_UID = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"

// Schema definition for focus sessions
export const FOCUS_SESSION_SCHEMA =
  "uint256 duration,uint256 startTime,uint256 endTime,bool completed,uint256 sessionCount"

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
})

// Simplified schema encoder without external dependencies
export function encodeAttestationData(data: {
  duration: number
  startTime: number
  endTime: number
  completed: boolean
  sessionCount: number
}) {
  // Simple encoding for demo purposes
  return JSON.stringify(data)
}
