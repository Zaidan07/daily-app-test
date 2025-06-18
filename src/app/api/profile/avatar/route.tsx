import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get("avatar") as File

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 })
  } 

  const allowedTypes = ["image/png", "image/jpeg", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
  }

  const maxSize = file.type === "image/gif" ? 10 * 1024 * 1024 : 5 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large" }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.name.split(".").pop()
  const filename = `${uuidv4()}.${ext}`
  const filepath = path.join(process.cwd(), "public/avatars", filename)

  await writeFile(filepath, buffer)

  const avatarUrl = `/avatars/${filename}`

  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatar: avatarUrl },
  })

  return NextResponse.json({ success: true, url: avatarUrl })
}
