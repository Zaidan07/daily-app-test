"use client";
import { useState, useEffect } from "react";
import { createDaily } from "@/lib/actions/createDaily";
import { getMyDailies } from "@/lib/actions/getMyDailies";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DailyPage() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submittedToday, setSubmittedToday] = useState(false);

  useEffect(() => {
    async function fetchDailies() {
      const res = await getMyDailies();

      const todayStr = new Date().toISOString().split("T")[0];
      const hasToday = res.some((d) =>
        d.createdAt.toISOString().startsWith(todayStr)
      );
      setSubmittedToday(hasToday);
    }

    fetchDailies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await createDaily(note);
      setSuccess(true);
      setNote("");
      setSubmittedToday(true);
      window.dispatchEvent(new Event("daily-updated"));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal mengirim daily.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Hari Ini :</CardTitle>
          </CardHeader>
          <CardContent>
            {submittedToday ? (
              <p className="text-green-600">
                Kamu sudah mengisi daily hari ini.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="• Kerjakan fitur..... • Hadir meeting..... • ... "
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={6}
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && (
                  <p className="text-green-500 text-sm">Berhasil disimpan!</p>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? "Menyimpan..." : "Kirim Daily"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}