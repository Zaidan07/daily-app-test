"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profileFrameStyles } from "@/utils/profileFrameStyles";


export default function Navbar() {
  const { data: session } = useSession();
  const [time, setTime] = useState("");
  const borderStyle = profileFrameStyles[session?.user?.profileFrame || "default"];


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="w-full flex justify-between items-center px-[120px] py-3 bg-white">
      <div className="text-gray-600 pl-[610px] font-mono">{time}</div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
            <Avatar className={`h-8 w-8 ${borderStyle}`}>
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt="profile" />
              ) : (
                <AvatarFallback>
                  {session?.user?.name?.[0]?.toUpperCase() ?? "?"}
                </AvatarFallback>
              )}
            </Avatar>
          <span key={session?.user?.name} className="text-sm text-black hidden sm:inline">
            {session?.user?.name}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuItem asChild>
            <a href="/profile">Lihat Profil</a>
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            Role: {session?.user?.role}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
