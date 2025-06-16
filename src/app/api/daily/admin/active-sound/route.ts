import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const latest = await prisma.notificationSetting.findFirst({
      orderBy: { createdAt: "desc" },
    })

    if (!latest) {
      return NextResponse.json({ filename: "android.mp3" }) // default
    }

    return NextResponse.json({ filename: latest.filename })
  } catch (error) {
    console.error("Gagal ambil sound aktif:", error)
    return NextResponse.json({ filename: "android.mp3" }) // fallback
  }
}
