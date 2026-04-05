const CACHE_NAME = 'barrio-v1';
const ASSETS = [
  '/que-barrio-es-este-ve/',
  '/que-barrio-es-este-ve/index.html',
  '/que-barrio-es-este-ve/barrios.geojson',
  '/que-barrio-es-este-ve/manifest.json',
  '/que-barrio-es-este-ve/icons/icon-192.png',
  '/que-barrio-es-este-ve/icons/icon-512.png',
  'https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
