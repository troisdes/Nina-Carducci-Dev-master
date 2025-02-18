const CACHE_NAME = "nina-carducci-v2";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/assets/css/style.min.css",
  "/assets/bootstrap/bootstrap.min.css",
  "/assets/js/scripts.min.js",
  "/assets/js/maugallery.min.js",
  // Images
  "/assets/images/nina.webp",
  "/assets/images/slider/ryoji-iwata.webp",
  "/assets/images/slider/nicholas-green.webp",
  "/assets/images/slider/edward-cisneros.webp",
  "/assets/images/gallery/entreprise.webp",
  "/assets/images/gallery/mariage.webp",
  "/assets/images/gallery/portraits.webp",
  "/assets/images/gallery/concert.webp",
  "/assets/images/instagram.png",
  // Icons
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-512x512.png",
  // Manifest
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
