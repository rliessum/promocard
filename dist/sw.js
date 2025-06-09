const CACHE_NAME = 'promo-cards-v5.0.0-perfect';
const STATIC_CACHE = 'static-v5.0.0';
const DYNAMIC_CACHE = 'dynamic-v5.0.0';

// Critical resources to cache immediately
const urlsToCache = [
  '/',
  '/index.html',
  '/landing-page.html',
  '/output.css',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Network-first resources
const networkFirstPaths = [
  '/api/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com/',
  'https://cdn.jsdelivr.net/'
];

// Install event - Cache critical resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Implement cache strategies
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin && !networkFirstPaths.some(path => url.href.includes(path))) {
    return;
  }

  // Cache-first strategy for static assets
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'image' ||
      request.url.includes('.css') ||
      request.url.includes('.js') ||
      request.url.includes('.svg')) {
    
    event.respondWith(
      caches.match(request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(request)
            .then(function(networkResponse) {
              const responseClone = networkResponse.clone();
              caches.open(DYNAMIC_CACHE)
                .then(function(cache) {
                  cache.put(request, responseClone);
                });
              return networkResponse;
            });
        })
        .catch(() => {
          // Fallback for offline
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        })
    );
    return;
  }

  // Network-first strategy for HTML documents and API calls
  if (request.destination === 'document' || networkFirstPaths.some(path => url.href.includes(path))) {
    event.respondWith(
      fetch(request)
        .then(function(networkResponse) {
          const responseClone = networkResponse.clone();
          caches.open(DYNAMIC_CACHE)
            .then(function(cache) {
              cache.put(request, responseClone);
            });
          return networkResponse;
        })
        .catch(function() {
          return caches.match(request)
            .then(function(response) {
              return response || caches.match('/index.html');
            });
        })
    );
    return;
  }

  // Default cache-first strategy
  event.respondWith(
    caches.match(request)
      .then(function(response) {
        return response || fetch(request);
      })
  );
});
