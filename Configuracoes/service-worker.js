// service-worker.js isolado para as Configurações
const CACHE_NAME = 'config-cache-v1';

self.addEventListener('install', (event) => {
    console.log('[Service Worker Config] Instalando...');
    self.skipWaiting(); // Força o SW a ativar imediatamente
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker Config] Ativado!');
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // O navegador EXIGE que o evento 'fetch' exista para liberar o botão de Instalar (PWA).
    // Por enquanto, não vamos fazer cache agressivo para evitar bugs de versão.
    // Apenas deixamos a requisição passar normalmente para a internet.
    event.respondWith(fetch(event.request));
});