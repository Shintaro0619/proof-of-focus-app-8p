import { NextResponse } from "next/server"

export async function GET() {
  const manifest = {
    frame: {
      name: "Proof of Focus",
      version: "1",
      iconUrl: `${process.env.NEXT_PUBLIC_URL}/app-icon.jpg`,
      homeUrl: `${process.env.NEXT_PUBLIC_URL}`,
      imageUrl: `${process.env.NEXT_PUBLIC_URL}/api/frame/image`,
      splashImageUrl: `${process.env.NEXT_PUBLIC_URL}/splash.png`,
      splashBackgroundColor: "#000000",
      webhookUrl: `${process.env.NEXT_PUBLIC_URL}/api/webhook`,
      subtitle: "Stay focused, earn blockchain proof",
      description:
        "Minted NFT badge for one set of 50 minutes of Pomodoro timer. The badge changes and evolves as you complete more sessions.",
      primaryCategory: "productivity",
    },
    accountAssociation: {
      header: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9",
      payload: "eyJkb21haW4iOiJ2MC1wcm9vZi1vZi1mb2N1cy1hcHAudmVyY2VsLmFwcCIsImZpZCI6MTIzNDU2LCJpYXQiOjE3MzM1NzQ0MDB9",
      signature: "MHg2ODkyVjZmZY4ZDRjZDI",
    },
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
