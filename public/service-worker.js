const CACHE_NAME = 'cloudnotes-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/bundle.js',
  '/manifest.json',
  '/favicon.ico'
];

// Skip waiting and claim clients immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
            .map((name) => caches.delete(name))
        );
      }),
      self.clients.claim()
    ])
  );
});

const isApiRequest = (url) => {
  return url.includes('/api/');
};

const isStaticAsset = (url) => {
  return STATIC_ASSETS.some(asset => url.endsWith(asset));
};

// Cache first, then network for static assets
const cacheFirst = async (request) => {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Network error', { status: 408 });
  }
};

// Network first, then cache for API requests
const networkFirst = async (request) => {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.ok && request.method === 'GET') {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
};

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and socket.io requests
  if (event.request.method !== 'GET' || event.request.url.includes('socket.io')) {
    return;
  }

  const url = new URL(event.request.url);

  // Handle API requests
  if (isApiRequest(url.pathname)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Handle static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Default to network first strategy
  event.respondWith(networkFirst(event.request));
});

// Handle background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(Promise.resolve());
  }
});
