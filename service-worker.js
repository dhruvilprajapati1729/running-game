// service-worker.js

const CACHE_NAME = "goat-runner-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",

    "./js/main.js",
    "./js/player.js",
    "./js/obstacles.js",
    "./js/ui.js",
    "./js/storage.js",

    "./assets/background.png",
    "./assets/ground.png",
    "./assets/rock.png",
    "./assets/goat/goat.png",

    "https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"
];

// Install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
