const CACHE='combinatorics-unified-v30';
const LOCAL=[
  './','./index.html','./resources.html','./manifest.webmanifest','./assets/brand-mark.png','./assets/geo-assistant.png','./assets/kombinatorika-intro.mp4',
  './lesson/index.html',
  './trainer/index.html','./trainer/assets/brand-mark.png','./trainer/assets/geo-assistant.png',
  './game/index.html','./test-generator/index.html',
  './assets/emoji3d.js','./assets/site-footer.js'
];
// Всеки файл се кешира поотделно: липсващ файл не спира обновяването.
self.addEventListener('install',event=>event.waitUntil(
  caches.open(CACHE)
    .then(cache=>Promise.all(LOCAL.map(url=>cache.add(new Request(url,{cache:'reload'})).catch(()=>null))))
    .then(()=>self.skipWaiting())
));
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())
));
const putInCache=(request,response)=>{
  if(response.ok&&new URL(request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}
  return response;
};
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  const isPage=request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/')||url.pathname.endsWith('.js');
  if(isPage&&url.origin===location.origin){
    // Страници и скриптове: първо от мрежата (винаги най-новата версия), а без интернет – от кеша.
    event.respondWith(fetch(request).then(response=>putInCache(request,response)).catch(()=>caches.match(request).then(hit=>hit||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>putInCache(request,response))));
});
