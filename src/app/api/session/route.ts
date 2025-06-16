import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  return NextResponse.json(session)
}
