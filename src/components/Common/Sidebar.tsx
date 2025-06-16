"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FaBell,
  FaHome,
  FaTasks,
  FaTrophy,
  FaHistory,
  FaClipboardList,
} from "react-icons/fa";
import Image from "next/image";
import Logo from "@/assets/logo.png";

interface SidebarProps {
  role: "ADMIN" | "USER";
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();

  const adminMenu = [
    { href: "/admin", label: "Dashboard", icon: <FaHome /> },
    { href: "/admin/leaderboard", label: "Leaderboard", icon: <FaTrophy /> },
    { href: "/admin/daily", label: "Daily", icon: <FaClipboardList /> },
    { href: "/admin/notification", label: "Custom Notification", icon: <FaBell /> },
  ];

  const userMenu = [
    { href: "/user", label: "Dashboard", icon: <FaHome /> },
    { href: "/user/daily", label: "Isi Daily", icon: <FaTasks /> },
    { href: "/user/leaderboard", label: "Leaderboard", icon: <FaTrophy /> },
    { href: "/user/history", label: "Riwayat", icon: <FaHistory /> },
  ];

  const menu = role === "ADMIN" ? adminMenu : userMenu;

  return (
    <aside className="w-64 h-screen bg-white p-4 border-r ">
      <div className="flex items-center justify-center mb-5"><Image src={Logo} alt="" width={70} height={70}/></div>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-mdtransition rounded-2xl",
              pathname === item.href && "bg-gray-800"
                ? "bg-gray-100 text-black"
                : "text-gray-600 hover:bg-gray-50 hover:text-black"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
