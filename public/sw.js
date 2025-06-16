self.addEventListener("install", () => {
  console.log("Service Worker installed.");
  self.skipWaiting(); 
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(self.clients.claim()); 
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  clients.openWindow("/");
});

self.addEventListener("message", (event) => {
  if (event.data === "play-sound") {
    // Notifikasi dari client
    console.log("Received 'play-sound' event");
  }
});



self.addEventListener("fetch", () => {});


