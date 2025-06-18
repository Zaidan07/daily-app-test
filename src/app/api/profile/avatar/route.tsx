import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("avatar") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuidv4()}.${file.name.split(".").pop()}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filename);

  const avatarUrl = publicUrlData?.publicUrl;

  if (!avatarUrl) {
    return NextResponse.json({ error: "Could not get public URL" }, { status: 500 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { avatar: avatarUrl },
  });

  return NextResponse.json({ success: true, url: avatarUrl });
}
