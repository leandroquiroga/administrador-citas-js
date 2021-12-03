// import {} from './../dist'

const cacheName = 'adc_v1'
const filesStatic = [
    '/',
    './../dist/src.e31bb0bc.js',
    './../dist/src.e31bb0bc.css',
    './../dist/css.967bad95.js',
    './../dist/bootstrap.5f792716.js',
    './../dist/bootstrap.0a2ae70b.js',
    './../dist/bootstrap.5f792716.css',
    './../dist/popper.52bba5b0.js',
    './../dist/js/function/serviceWorker.js',
    './../dist/index.html',
    './../dist/index.js',
    './../dist/cita.731f94d9.svg',
    './../dist/undraw_yoga_248n.c5f025fe.svg',
]

const initServiceWorkers = () => {
    // install
    self.addEventListener('install', (e) => {
        console.log('Instalado el servirce workers', e);

        e.waitUntil(
            caches.open(cacheName)
                .then(cache => {
                    cache.addAll(filesStatic)
                }) 
                .catch(error => console.log(error))
        )
    })

    // active
    self.addEventListener('activate', (e) => {
        console.log('Activado el servirce workers', e);
        e.waitUntil(
            caches.keys()
            .then(keys => {
                    // retorna el valor de la llave actual 
                    return Promise.all(
                        keys.filter( key => key !== cacheName).map(key => caches.delete(key))
                    )
                })
        )
    })

    //fetch
    self.addEventListener('fetch', (e) => {
        e.waitUntil(
            caches.match(e.request)
                .then(response =>{
                    return response
                })
                .catch(
                    caches.match('/')
                )
        )
        
    })
}



initServiceWorkers()