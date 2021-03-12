// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
    "index.html",
    "./", // Alias for index.html
    "./js/main.js",
    "./css/custom.css",
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

//Stale-while-revalidate
/*
self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async function () {
            const cache = await caches.open(RUNTIME);
            const cachedResponse = await cache.match(event.request);
            const networkResponsePromise = fetch(event.request);

            event.waitUntil(
                (async function () {
                    const networkResponse = await networkResponsePromise;
                    await cache.put(event.request, networkResponse.clone());
                })()
            );

            // Returned the cached response if we have one, otherwise return the network response.
            return cachedResponse || networkResponsePromise;
        })()
    );
});*/

//Network falling back to cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async function () {
            try {
                return await fetch(event.request);
            } catch (err) {
                return caches.match(event.request);
            }
        })()
    );
});
