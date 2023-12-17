var cacheName = 'NearHospital+-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(async cache => {
        const resources = [
          './index.html',
          './map.html',
          './listaHospitais.html',
          
          './assets/css/fontawesome-all.min.css',
          './assets/css/main.css',
          './assets/css/images/arrow.svg',
          './assets/css/images/overlay.png',
          './hamburger.css',
  
          './mapa/leaflet-routing-machine.js',
          './mapa/leaflet.js',
          './assets/js/breakpoints.min.js',
          './assets/js/browser.min.js',
          './assets/js/jquery.min.js',
          './assets/js/jquery.scrollex.min.js',
          './assets/js/jquery.scrolly.min.js',
          './assets/js/main.js',
          './assets/js/util.js',
  
          './assets/sass/main.scss',
          './assets/sass/libs/_breakpoints.scss',
          './assets/sass/libs/_functions.scss',
          './assets/sass/libs/_html-grid.scss',
          './assets/sass/libs/_mixins.scss',
          './assets/sass/libs/_vars.scss',
          './assets/sass/libs/_vendor.scss',
  
          './assets/webfonts/fa-brands-400.eot',
          './assets/webfonts/fa-brands-400.svg',
          './assets/webfonts/fa-brands-400.ttf',
          './assets/webfonts/fa-brands-400.woff',
          './assets/webfonts/fa-brands-400.woff2',
          
          './assets/webfonts/fa-regular-400.eot',
          './assets/webfonts/fa-regular-400.svg',
          './assets/webfonts/fa-regular-400.ttf',
          './assets/webfonts/fa-regular-400.woff',
          './assets/webfonts/fa-regular-400.woff2',
  
          './icons/128.png',
          './icons/152.png',
          './icons/167.png',
          './icons/180.png',
          './icons/196.png',
          './icons/256.png',
          './icons/512.png',
          './icons/1024.png',
  
          './images/bg.jpg',
          './images/pic01.jpg',
          './images/pic02.jpg',
          './images/pic03.jpg',
          './images/pic04.jpg',
          './images/pic05.jpg',

          './images/barras.jpeg',
          './images/botao-de-seta-para-a-esquerda-do-teclado.jpeg',
          './images/mapa.jpeg',

          './hospitaisRecife.json',
  
        ];

        const addedResources = await Promise.all(
          resources.map(async resource => {
            try {
              const response = await fetch(resource);
              if (!response.ok) {
                throw new Error(`Request failed for ${resource}`);
              }
              await cache.put(resource, response.clone());
              return resource;
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );

        if (addedResources.includes(null)) {
          throw new Error('Algum recurso falhou ao ser adicionado ao cache');
        }
      })
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  // Atualizacao internet
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});

