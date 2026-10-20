// 설치 시 앱 + 얼굴 인식 모델을 모두 저장 → 이후 인터넷 없이 동작
// 온라인이면 최신 파일을 받아 캐시를 갱신하고, 오프라인이면 캐시로 동작
const CACHE = 'face-pick-v7';
const FILES = [
  './', './index.html', './manifest.json', './icon-180.png', './icon-512.png',
  './mediapipe/vision_bundle.mjs',
  './mediapipe/blaze_face_full_range.tflite',
  './mediapipe/wasm/vision_wasm_internal.js',
  './mediapipe/wasm/vision_wasm_internal.wasm',
  './mediapipe/wasm/vision_wasm_nosimd_internal.js',
  './mediapipe/wasm/vision_wasm_nosimd_internal.wasm',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
