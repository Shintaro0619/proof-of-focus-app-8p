// Contract addresses for Base Sepolia deployment
export const CONTRACT_ADDRESSES = {
  FOCUS_BADGES: "0x...", // To be updated after deployment
  EAS_CONTRACT: "0x4200000000000000000000000000000000000021",
  SCHEMA_REGISTRY: "0x4200000000000000000000000000000000000020",
} as const

export const FOCUS_SESSION_SCHEMA_UID = "0x..." // To be updated after schema registration

// Base Sepolia network configuration
export const BASE_SEPOLIA_CONFIG = {
  chainId: 84532,
  name: "Base Sepolia",
  rpcUrl: "https://sepolia.base.org",
  blockExplorer: "https://sepolia-explorer.base.org",
} as const
