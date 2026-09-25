// Офлайн-кэш. При обновлении приложения увеличь VERSION.
const VERSION = 'zal-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'img/Barbell_Bench_Press_-_Medium_Grip_0.jpg', 'img/Barbell_Bench_Press_-_Medium_Grip_1.jpg', 'img/Barbell_Curl_0.jpg', 'img/Barbell_Curl_1.jpg', 'img/Barbell_Incline_Bench_Press_-_Medium_Grip_0.jpg', 'img/Barbell_Incline_Bench_Press_-_Medium_Grip_1.jpg', 'img/Barbell_Squat_0.jpg', 'img/Barbell_Squat_1.jpg', 'img/Bent_Over_Barbell_Row_0.jpg', 'img/Bent_Over_Barbell_Row_1.jpg', 'img/Bicycling_Stationary_0.jpg', 'img/Bicycling_Stationary_1.jpg', 'img/Cable_Rope_Overhead_Triceps_Extension_0.jpg', 'img/Cable_Rope_Overhead_Triceps_Extension_1.jpg', 'img/Cable_Seated_Lateral_Raise_0.jpg', 'img/Cable_Seated_Lateral_Raise_1.jpg', 'img/Close-Grip_Front_Lat_Pulldown_0.jpg', 'img/Close-Grip_Front_Lat_Pulldown_1.jpg', 'img/Dips_-_Chest_Version_0.jpg', 'img/Dips_-_Chest_Version_1.jpg', 'img/Dumbbell_Bench_Press_0.jpg', 'img/Dumbbell_Bench_Press_1.jpg', 'img/Elliptical_Trainer_0.jpg', 'img/Elliptical_Trainer_1.jpg', 'img/Face_Pull_0.jpg', 'img/Face_Pull_1.jpg', 'img/Hack_Squat_0.jpg', 'img/Hack_Squat_1.jpg', 'img/Hammer_Curls_0.jpg', 'img/Hammer_Curls_1.jpg', 'img/Incline_Dumbbell_Curl_0.jpg', 'img/Incline_Dumbbell_Curl_1.jpg', 'img/Incline_Dumbbell_Press_0.jpg', 'img/Incline_Dumbbell_Press_1.jpg', 'img/Leg_Press_0.jpg', 'img/Leg_Press_1.jpg', 'img/Lying_Leg_Curls_0.jpg', 'img/Lying_Leg_Curls_1.jpg', 'img/One-Arm_Dumbbell_Row_0.jpg', 'img/One-Arm_Dumbbell_Row_1.jpg', 'img/Palms-Down_Wrist_Curl_Over_A_Bench_0.jpg', 'img/Palms-Down_Wrist_Curl_Over_A_Bench_1.jpg', 'img/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench_0.jpg', 'img/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench_1.jpg', 'img/Pullups_0.jpg', 'img/Pullups_1.jpg', 'img/Reverse_Flyes_0.jpg', 'img/Reverse_Flyes_1.jpg', 'img/Romanian_Deadlift_0.jpg', 'img/Romanian_Deadlift_1.jpg', 'img/Seated_Cable_Rows_0.jpg', 'img/Seated_Cable_Rows_1.jpg', 'img/Seated_Calf_Raise_0.jpg', 'img/Seated_Calf_Raise_1.jpg', 'img/Seated_Dumbbell_Press_0.jpg', 'img/Seated_Dumbbell_Press_1.jpg', 'img/Side_Lateral_Raise_0.jpg', 'img/Side_Lateral_Raise_1.jpg', 'img/Standing_Calf_Raises_0.jpg', 'img/Standing_Calf_Raises_1.jpg', 'img/Standing_Military_Press_0.jpg', 'img/Standing_Military_Press_1.jpg', 'img/Triceps_Pushdown_-_Rope_Attachment_0.jpg', 'img/Triceps_Pushdown_-_Rope_Attachment_1.jpg', 'img/Walking_Treadmill_0.jpg', 'img/Walking_Treadmill_1.jpg', 'img/Wide-Grip_Lat_Pulldown_0.jpg', 'img/Wide-Grip_Lat_Pulldown_1.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== 'zal-fonts').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.hostname.includes('fonts.googleapis.com') || u.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(caches.open('zal-fonts').then(c => c.match(e.request).then(r => r || fetch(e.request).then(res => { c.put(e.request, res.clone()); return res; }).catch(() => r))));
    return;
  }
  if (u.origin !== location.origin) return;
  if (e.request.mode === 'navigate') {
    // страница: сначала сеть (чтобы получать обновления), без сети — из кэша
    e.respondWith(fetch(e.request).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res; }).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
