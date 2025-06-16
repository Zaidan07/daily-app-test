import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json();

    const { email, password, name } = body;
  
    if (!email || !password || !name) {
      return NextResponse.json({ message: "Semua field wajib diisi." }, { status: 400 })
    }
  
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { name }] }
    })
  
    if (existingUser) {
      return NextResponse.json({ message: "Email atau name sudah digunakan." }, { status: 400 })
    }
  
    const hashedPassword = await hash(password, 10)
  
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER"
      }
    })
  
    return NextResponse.json({ message: "User berhasil dibuat!" })
  }
  