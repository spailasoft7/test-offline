const CACHE_NAME = "studyhero-cache-v1";
const urlsToCache = [
  "/test-offline/",
  "/test-offline/index.html",
  "/test-offline/styles.css",
  "/test-offline/script.js",
  "/test-offline/icon-192.png",
  "/test-offline/icon-512.png",
  "/test-offline/screenshot1.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
