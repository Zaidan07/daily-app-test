import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, profileFrame } = await req.json()

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, profileFrame },
  })

  return NextResponse.json({ success: true })
}
