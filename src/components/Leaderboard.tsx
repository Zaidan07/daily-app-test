"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

interface LeaderboardUser {
  id: string;
  name: string;
  totalDaily: number;
  image?: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  //   const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/daily/admin/leaderboard");
      const data = await res.json();
      setLeaderboard(data);
      //   setLoading(false)
    };
    fetchData();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);
  const podiumOrder = [1, 0, 2];
  // const heightMap = [80, 100, 60];

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🏆 Leaderboard</h1>

      <div className="flex justify-center items-end gap-6 mb-10">
        {podiumOrder.map((userIndex, idx) => {
          const user = topThree[userIndex];
          if (!user) return null;

          return (
            <div key={user.id} className="flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-2 border-4 border-purple-500">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                )}
              </Avatar>
              {/* Podium block */}
              <div
                className={clsx(
                  "w-20 text-center rounded-t-lg font-bold py-2 flex flex-col justify-center",
                  idx === 1
                    ? "bg-yellow-400 h-24"
                    : idx === 0
                    ? "bg-gray-300 h-20"
                    : "bg-amber-600 h-16"
                )}
              >
                {idx === 1 ? "🥇" : idx === 0 ? "🥈" : "🥉"}
              </div>
              <div className="text-sm mt-1">{user.name}</div>
              <div className="text-green-400 text-xs">
                +{user.totalDaily} daily
              </div>
            </div>
          );
        })}
      </div>

      {/* OTHERS LIST */}
      <Card className="max-w-md mx-auto bg-white p-0 overflow-hidden rounded-xl">
        {others.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-4 py-3 border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-400 w-6 text-right">{index + 4}</div>
              <Avatar className="h-8 w-8">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">{user.name}</div>
            </div>
            <div className="text-green-400 text-sm font-mono">
              +{user.totalDaily}
            </div>
          </div>
        ))}
      </Card>

      <p className="text-center text-gray-400 mt-6 text-sm">
        Complete Daily Tasks to Rise Up the Ranks 🚀
      </p>
    </div>
  );
}
