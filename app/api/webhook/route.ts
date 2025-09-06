import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log("[v0] Farcaster webhook received:", body)

    // Handle different webhook event types
    const { type, data } = body

    switch (type) {
      case "frame_added":
        console.log("[v0] Frame added to user's collection:", data)
        break
      case "frame_removed":
        console.log("[v0] Frame removed from user's collection:", data)
        break
      default:
        console.log("[v0] Unknown webhook event type:", type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const challenge = searchParams.get("challenge")

  if (challenge) {
    // Return the challenge for domain verification
    return NextResponse.json({ challenge })
  }

  return NextResponse.json({
    status: "Farcaster webhook endpoint active",
    timestamp: new Date().toISOString(),
  })
}
