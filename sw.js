/* Service worker do Hello, Mãe!: guarda o app no celular para funcionar sem internet.

   - Telas e conteúdo (index.html, content.js...): busca a versão nova na internet primeiro,
     para uma atualização no GitHub aparecer logo que ela abrir. Sem internet, ou se demorar
     mais de 3 segundos, usa a cópia guardada.
   - Áudios, imagens e fontes: usa o que está guardado; se faltar, baixa e guarda.
   Mudou a lista de arquivos fixos abaixo? Aumente VERSION.
   AUDIO_VERSION é atualizado sozinho pelo tools/build-audio.mjs. */

const VERSION = 'v4';
const NETWORK_TIMEOUT = 3000;
const AUDIO_VERSION = '1a5dp0s';
const CORE = `hello-mae-core-${VERSION}`;
const MEDIA = 'hello-mae-media';

const SHELL = [
  './', 'index.html', 'content.js', 'news.js', 'config.js', 'audio/index.js', 'manifest.webmanifest',
  'img/feliz.webp', 'img/triste.webp', 'img/pensativo.webp', 'img/telefone.webp',
  'img/feliz.png', 'img/triste.png', 'img/pensativo.png', 'img/telefone.png',
  'icons/icon-192.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const core = await caches.open(CORE);
    await core.addAll(SHELL);
    // Guarda todos os áudios para ela usar no avião, sem internet
    self.window = self;
    try { importScripts('audio/index.js'); } catch (e) {}
    const media = await caches.open(MEDIA);
    const files = (self.HM_AUDIO || []).map(n => `audio/${n}.mp3`);
    for (let i = 0; i < files.length; i += 20) {
      await Promise.all(files.slice(i, i + 20).map(async f => {
        if (!(await media.match(f))) { try { await media.add(f); } catch (e) {} }
      }));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('hello-mae-core-') && k !== CORE) await caches.delete(k);
    await self.clients.claim();
  })());
});

const isMedia = url =>
  /\/(audio|img|icons)\/.+\.(mp3|webp|png)$/.test(url.pathname) ||
  url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com';

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Comentários e admin (planilha do Google) sempre pela internet
  if (url.hostname.endsWith('google.com') || url.hostname.endsWith('googleusercontent.com')) return;

  if (isMedia(url)) {
    event.respondWith((async () => {
      const hit = await caches.match(req, {ignoreSearch: true});   // procura em todos os caches
      if (hit) return hit;
      const media = await caches.open(MEDIA);
      const res = await fetch(req);
      if (res.ok || res.type === 'opaque') media.put(req, res.clone());
      return res;
    })());
    return;
  }

  if (url.origin !== location.origin) return;

  // Telas e conteúdo: internet primeiro (até 3 s); sem internet, a cópia guardada
  event.respondWith((async () => {
    const core = await caches.open(CORE);
    const key = req.mode === 'navigate' ? './' : req;
    const fresh = fetch(req, {cache: 'no-cache'}).then(res => {
      if (res.ok) core.put(key, res.clone());
      return res;
    }).catch(() => null);
    event.waitUntil(fresh);
    const timeout = new Promise(r => setTimeout(() => r(null), NETWORK_TIMEOUT));
    const res = await Promise.race([fresh, timeout]);
    if (res && res.ok) return res;
    const hit = await core.match(key, {ignoreSearch: true});
    return hit || (await fresh) || new Response('Sem internet e sem cópia guardada.', {status: 503});
  })());
});
