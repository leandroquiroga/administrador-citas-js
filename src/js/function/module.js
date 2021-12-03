import { expRegEmail, expRegNum, expRegText, ui, expRegDir } from './../index.js';
import { DB } from './../database/dataDB.js';
import moment from 'moment';

// Funciones globales

export const selector = (element) => document.querySelector(element);
export const create = (element) => document.createElement(element);
export const citaObj = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    date: '',
    time: '',
    description: '',
}

export const dayCurrent = () => {
    let inputDateMin = selector('#inputDate');
    const dayCurrent = moment().date();
    inputDateMin.min = dayCurrent ;
}
// Evalua si son letras lo que se esta ingreando 
export const isText = (value) => {
    if (value.match(expRegText) != null) {
        return true
    }
    return false
}
// Evalua si es un e-mail lo que se esta ingreando 
export const isEmail = (mail) => {
    if (mail.match(expRegEmail) != null) {
        return true
    }
    return false
}
// Evalua si es un numero lo que se esta ingreando 
export const isNumbers = (num) => {
    if (num.match(expRegNum) != null) {
        return true
    }
    return false;
}

// Evalua si la direccion tiene numeros o letras
export const isAddress = (dir) => {
    if (dir.match(expRegDir) != null) {
        return true
    }
    return false
}
// Habilita el boton de enviar si cumple con las las validaciones y los campos no estan vacios
export const formComplete = () => {
    let cumple = false
    if (valid()) return cumple = true;
    return cumple;
}
// devuelve true si los campos no estan vacios y cunplmen con su name
function valid() {
    let cumple = false;
    let name = selector('#inputName');
    let nameLast = selector('#inputLastName');
    let email = selector('#inputEmail4');
    let tel = selector('#inputTel4');
    let dir = selector('#inputAddress');
    let city = selector('#inputCity');
    let date = selector('#inputDate');
    let time = selector('#inputTime');
    let descrip = selector('#inputTextArea');
    if (((name.value !== '') && (name.name === 'name') && (isText(name.value))) &&
        ((nameLast.value !== '') && (nameLast.name === 'lastname')) &&
        ((email.value !== '') && (email.name === 'email')) &&
        ((tel.value !== '') && (tel.name === 'phone')) &&
        ((dir.value !== '')) &&
        ((city.value !== '')) &&
        ((date.value !== '')) &&
        ((time.value !== '')) &&
        ((descrip.value !== ''))) {
            return cumple = true;
        }
    return cumple;
}
// Reinicia el objeto cita
export const resetObjCita = () => {
    citaObj.name = '';
    citaObj.lastname = '';
    citaObj.email = '';
    citaObj.phone = '';
    citaObj.address = '';
    citaObj.city = '';
    citaObj.date = '';
    citaObj.time = '';
    citaObj.description = '';
}
// Limpia el HTML para no colocar elementos duplicados 
export const limpiarHTML = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
// se encarga de eliminar la cita, mostrar un mensaje y actualizar
export const deleteCard = (id) => {
    let transaction = DB.transaction(['citas'], 'readwrite');
    let objectStore = transaction.objectStore('citas');
    objectStore.delete(id);
    transaction.oncomplete = () => {
        ui.mostrarCitas()
    }
}