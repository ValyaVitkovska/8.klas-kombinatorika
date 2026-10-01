const CACHE='combinatorics-unified-v24';
const LOCAL=[
  './','./index.html','./resources.html','./manifest.webmanifest','./assets/brand-mark.png','./assets/geo-assistant.png','./assets/kombinatorika-intro.mp4',
  './lesson/index.html',
  './trainer/index.html','./trainer/assets/brand-mark.png','./trainer/assets/geo-assistant.png',
  './game/index.html','./test-generator/index.html'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(LOCAL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
    if(response&&(response.ok||response.type==='opaque')){
      const copy=response.clone();
      return caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{}).then(()=>response);
    }
    return response;
  })));
});
