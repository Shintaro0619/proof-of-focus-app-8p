import { createThirdwebClient, getContract } from "thirdweb"
import { baseSepolia } from "thirdweb/chains"

// thirdweb client configuration
export const client = createThirdwebClient({
  clientId: "9b66d6253bd0d2268342a2840ab892d9",
})

// Focus Badge Contract on Base Sepolia
export const focusBadgeContract = getContract({
  client,
  chain: baseSepolia,
  address: "0xcb633D4936358aA8C3B16E66Ce78e7092DE373A9",
})

// Badge levels mapping to token IDs
export const BADGE_TOKEN_IDS = {
  ROOKIE: 1,
  STREAK_STARTER: 2,
  LIGHTNING_FOCUS: 3,
  DIAMOND_MIND: 4,
  FOCUS_MASTER: 5,
  ZEN_WARRIOR: 6,
  ULTIMATE_FOCUS: 7,
} as const

// Badge requirements (sessions needed)
export const BADGE_REQUIREMENTS = {
  ROOKIE: 1,
  STREAK_STARTER: 7,
  LIGHTNING_FOCUS: 14,
  DIAMOND_MIND: 21,
  FOCUS_MASTER: 35,
  ZEN_WARRIOR: 50,
  ULTIMATE_FOCUS: 100,
} as const
