export let DB;
import { ui } from './../index';
import { selector } from './../function/module';

export const createDB = () => {
    const dataBase = window.indexedDB.open('citas', 1);

    // en caso de error
    dataBase.onerror = function () {
        console.log("Error ! Database no funca");
    }
    dataBase.onsuccess = function () {
        console.log("Cheto, creaste la base de datos");
        DB = dataBase.result;
        ui.mostrarCitas()
    }
    // schema
    dataBase.onupgradeneeded = function (e) {
        const db = e.target.result;
        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true,
        });
        // Definimos todas las columnas 
        objectStore.createIndex('id', 'id', {unique: true})
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('lastname', 'lastname', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('phone', 'phone', { unique: false });
        objectStore.createIndex('address', 'address', { unique: false });
        objectStore.createIndex('city', 'city', { unique: false });
        objectStore.createIndex('data', 'data', { unique: false });
        objectStore.createIndex('time', 'time', { unique: false });
        objectStore.createIndex('description', 'description', { unique: false });
    }
}