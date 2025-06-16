"use client";

import { useEffect, useState } from "react";
import { getMyDailies } from "@/lib/actions/getMyDailies";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Daily = {
  id: string;
  createdAt: Date;
  userId: string;
  date: Date;
  note: string;
  completed: boolean;
};

export default function DailyHistory() {
  const [dailies, setDailies] = useState<Daily[]>([]);

  useEffect(() => {
    async function fetchDailies() {
      const res = await getMyDailies();
      // Optional: urutkan dari yang terbaru
      const sorted = res.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setDailies(sorted);
    }

    fetchDailies();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="w-full max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Daily</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Tanggal</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailies.map((daily) => (
                  <TableRow key={daily.id}>
                    <TableCell>
                      {format(new Date(daily.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4 space-y-1">
                        {daily.note.split("\n").map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
                {dailies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-gray-500">
                      Belum ada data daily.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
