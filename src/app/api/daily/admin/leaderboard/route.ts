// File: app/api/admin/leaderboard/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        dailies: true, 
      },
    })

    const leaderboard = users
      .map(user => ({
        id: user.id,
        name: user.name ?? "Unknown",
        image: user.avatar ?? undefined,
        totalDaily: user.dailies.length,
      }))
      .sort((a, b) => b.totalDaily - a.totalDaily) 
      .slice(0, 20) 

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Leaderboard error", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
