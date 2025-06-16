import { writeFile } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma" 

export async function POST(req: Request) {
  const data = await req.formData()
  const file: File | null = data.get("sound") as File

  if (!file) {
    return NextResponse.json({ message: "No file uploaded." }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = file.name
  const filePath = path.join(process.cwd(), "public", "sounds", fileName)

  try {
    await writeFile(filePath, buffer)

    await prisma.notificationSetting.create({
      data: {
        filename: fileName,
      },
    })

    return NextResponse.json({ message: "File uploaded." })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Gagal menyimpan file." }, { status: 500 })
  }
}
