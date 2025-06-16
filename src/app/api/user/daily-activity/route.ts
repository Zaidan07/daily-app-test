import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { format } from "date-fns"
import { authOptions } from "@/lib/authOptions"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) return NextResponse.json([], { status: 401 })

  const rawData = await prisma.daily.findMany({
    where: { userId },
    select: { createdAt: true },
  })

  const map = new Map<string, number>()

  for (const item of rawData) {
    const date = format(item.createdAt, "yyyy-MM-dd")
    map.set(date, (map.get(date) || 0) + 1)
  }

  const result = Array.from(map, ([date, count]) => ({ date, count }))

  return NextResponse.json(result)
}