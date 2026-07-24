const CACHE='combinatorics-unified-v6';
const LOCAL=[
  './','./index.html','./manifest.webmanifest','./assets/brand-mark.png','./assets/geo-assistant.png',
  './lesson/index.html',
  './trainer/index.html','./trainer/assets/brand-mark.png','./trainer/assets/geo-assistant.png',
  './game/index.html','./test-generator/index.html'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(LOCAL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    if(response.ok&&new URL(event.request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
    return response;
  })));
});
