import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // Generate dynamic frame image
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f0f0f;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Title -->
      <text x="600" y="200" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#ffffff">
        Proof of Focus
      </text>
      
      <!-- Subtitle -->
      <text x="600" y="280" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#888888">
        Stay Focused, Earn Blockchain Proof
      </text>
      
      <!-- Focus Circle -->
      <circle cx="600" cy="400" r="80" fill="none" stroke="#3b82f6" stroke-width="8"/>
      <text x="600" y="415" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#3b82f6">
        50:00
      </text>
      
      <!-- Bottom Text -->
      <text x="600" y="550" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#666666">
        Web3 Focus Training • Base L2 • NFT Badges
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
