import { initApp } from './js/index';
import './css/index.css'

const serviceworkers = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then(register => console.log('Se registro correctamente el service workers:' , register))
            .catch(error => console.log(error))
        return
    }
    console.log('Service Workers no regitrado')
}

window.addEventListener('DOMContentLoaded', () => {
    serviceworkers()
    initApp()
})
