"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomNotificationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Pilih file suara terlebih dahulu.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("sound", file);

    try {
      const res = await fetch("/api/daily/admin/upload-sound", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal upload.");

      setMessage("Berhasil upload file suara custom.");
      setFile(null);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Terjadi kesalahan tidak diketahui.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Upload Suara Notifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="audio/*" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Mengunggah..." : "Upload"}
          </Button>
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
