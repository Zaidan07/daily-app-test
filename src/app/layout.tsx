import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";
import ClientSessionProvider from "@/components/Common/ClientSessionProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daily App",
  description: "Daily App is a daily app for you to do your daily task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${poppins.className}`}>
        <RegisterServiceWorker />
        <ClientSessionProvider>
        {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
