import { http, createConfig } from "wagmi"
import { base, baseSepolia } from "wagmi/chains"
import { coinbaseWallet, metaMask } from "wagmi/connectors"

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: "Proof of Focus",
      appLogoUrl: "https://proof-of-focus.vercel.app/logo.png",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
})

export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021" // Base Sepolia EAS
export const SCHEMA_REGISTRY_ADDRESS = "0x4200000000000000000000000000000000000020" // Base Sepolia Schema Registry

export const FOCUS_SESSION_SCHEMA_UID = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" // Demo schema UID

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
