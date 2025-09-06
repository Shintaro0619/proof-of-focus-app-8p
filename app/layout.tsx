import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Proof of Focus - Stay Focused, Earn Blockchain Proof",
  description:
    "A Web3 gamified focus app that helps you break free from dopamine addiction and earn blockchain attestations for your dedication.",
  generator: "v0.app",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/image`,
    "fc:frame:button:1": "Start Focus Session",
    "fc:frame:button:2": "View Progress",
    "fc:frame:button:3": "Connect Wallet",
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
