const CACHE_NAME = 'unmessify-data-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

// Cache JSON files dynamically
const jsonFiles = [
  'VITC-A-L', 'VITC-B-L', 'VITC-CB-L', 'VITC-CG-L',
  'VITC-D1-L', 'VITC-D2-L', 'VITC-M-N', 'VITC-M-S',
  'VITC-M-V', 'VITC-W-N', 'VITC-W-S', 'VITC-W-V'
];

jsonFiles.forEach(file => {
  urlsToCache.push(`/json/${file}.json`);
});

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a successful response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page or fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background Sync (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Refresh data when back online
      updateCache()
    );
  }
});

// Update Cache Function
async function updateCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    
    // Update JSON files
    for (const file of jsonFiles) {
      try {
        const response = await fetch(`/json/${file}.json`);
        if (response.ok) {
          await cache.put(`/json/${file}.json`, response);
        }
      } catch (error) {
        console.log(`Failed to update ${file}.json:`, error);
      }
    }
  } catch (error) {
    console.log('Cache update failed:', error);
  }
}

// Push Notification (optional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New data available!',
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Data',
        icon: '/assets/icon-96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/icon-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Unmessify Data Update', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
