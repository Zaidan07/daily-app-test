"use client";

import { useEffect, useRef} from "react";

interface MyNotificationOptions extends NotificationOptions {
  vibrate?: number[];
}

export function NotificationSetup() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchSoundUrl() {
      try {
        const res = await fetch("/api/daily/admin/active-sound");
        const data = await res.json();
        const file = data.filename || "android.mp3";
        const fullPath = `/sounds/${file}`;
        audioRef.current = new Audio(fullPath);
      } catch (err) {
        console.error("Gagal ambil sound:", err);
        audioRef.current = new Audio("/sounds/android.mp3");
      }
    }

    fetchSoundUrl();

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("SW registered");
      });
    }

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data === "play-sound") {
        audioRef.current?.play().catch((err) => {
          console.error("Gagal play sound:", err);
        });
      }
    });

    const interval = setInterval(async () => {
      if (Notification.permission !== "granted") return;

      const res = await fetch("/api/daily/check");
      const data = await res.json();

      if (!data.doneToday && navigator.serviceWorker.controller) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration
            ?.getNotifications({ tag: "daily-reminder" })
            .then((notifications) => {
              notifications.forEach((n) => n.close());
            })
            .finally(() => {
              registration?.showNotification("⏰ Daily Reminder", {
                body: "Jangan lupa isi daily hari ini!",
                icon: "/192x192.png",
                vibrate: [200, 100, 200],
                tag: "daily-reminder",
              } as MyNotificationOptions);

              navigator.serviceWorker.controller?.postMessage("play-sound");
            });
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
