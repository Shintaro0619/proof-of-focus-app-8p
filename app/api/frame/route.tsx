import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { buttonIndex } = body

    let responseHtml = ""

    switch (buttonIndex) {
      case 1:
        // Start Focus Session
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/timer" />
              <meta property="fc:frame:button:1" content="Complete Session" />
              <meta property="fc:frame:button:2" content="Back to Menu" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
            </head>
            <body>Focus session started!</body>
          </html>
        `
        break
      case 2:
        // View Progress
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/progress" />
              <meta property="fc:frame:button:1" content="View Badges" />
              <meta property="fc:frame:button:2" content="Back to Menu" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
            </head>
            <body>Your progress</body>
          </html>
        `
        break
      case 3:
        // Connect Wallet - redirect to main app
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}`)
      default:
        // Default menu
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/image" />
              <meta property="fc:frame:button:1" content="Start Focus Session" />
              <meta property="fc:frame:button:2" content="View Progress" />
              <meta property="fc:frame:button:3" content="Connect Wallet" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
            </head>
            <body>Proof of Focus</body>
          </html>
        `
    }

    return new NextResponse(responseHtml, {
      headers: { "Content-Type": "text/html" },
    })
  } catch (error) {
    console.error("Frame API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  // Return default frame for initial load
  const responseHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame/image" />
        <meta property="fc:frame:button:1" content="Start Focus Session" />
        <meta property="fc:frame:button:2" content="View Progress" />
        <meta property="fc:frame:button:3" content="Open Full App" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/frame" />
      </head>
      <body>
        <h1>Proof of Focus</h1>
        <p>Stay focused, earn blockchain proof</p>
      </body>
    </html>
  `

  return new NextResponse(responseHtml, {
    headers: { "Content-Type": "text/html" },
  })
}
