import { initApp } from './js/index';
import './css/index.css'
import { createDB, DB } from './js/database/dataDB';
import { dayCurrent } from './js/function/module';

const serviceworkers = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then(register => console.log('Se registro correctamente el service workers:' , register))
            .catch(error => console.log(error))
        return
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createDB(DB)
    serviceworkers();
    dayCurrent()
    initApp()
})
