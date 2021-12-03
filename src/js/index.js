import { Citas } from "./class/citas.js";
import { Ui} from "./class/UI.js";
import {citaObj, formComplete, isEmail, isNumbers, isText, resetObjCita, selector, valueDateNow,isAddress } from "./function/module.js";
import { createDB, DB } from './database/dataDB.js';

// Variables globales
let form = selector('#formUser');
let button = selector('#btn-submit');
let nameForm = selector('#inputName');
let nameLastForm = selector('#inputLastName');
let emailForm = selector('#inputEmail4');
let telForm = selector('#inputTel4');
let dirForm = selector('#inputAddress');
let cityForm = selector('#inputCity');
let dateForm = selector('#inputDate');
let timeForm = selector('#inputTime');
let descripForm = selector('#inputTextArea');
let formuForm = selector('#formUser');
let cumple;

//  Expresiones regulares
export const expRegText = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"
export const expRegDate = "/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/"
export const expRegEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
export const expRegNum = '^[0-9]+$'
export const expRegDir = /[A-ZÑa-zñáéíóúÁÉÍÓ]|[0-9]{1, 4}$/

// Instancias de las clases
export const administrarCitas = new Citas();
export const ui = new Ui();

// editamos los datos de la cita
export default function editarCita (administrarCitas){
    const {name, lastname, email, phone, address, city, date, time ,description, id} = administrarCitas
    // cargamos los inputs para editarlos
    nameForm.value = name;
    nameLastForm.value = lastname;
    emailForm.value = email;
    telForm.value = phone;
    dirForm.value = address;
    cityForm.value = city;
    dateForm.value = date;
    timeForm.value = time;
    descripForm.value = description;
    // cargamos el objeto con los datos editados
    citaObj.id = id
    citaObj.name = name;
    citaObj.lastname = lastname;
    citaObj.email = email;
    citaObj.phone = phone;
    citaObj.address = address;
    citaObj.city = city;
    citaObj.date = date;
    citaObj.time = time;
    citaObj.description = description

    // habilitamos el boton del formulario y editamos su contenido
    formuForm.querySelector('button[type="submit"]').disabled = false
    formuForm.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    return cumple =  true;
}
const nuevaCita = (e) => {
    e.preventDefault();
    if (cumple) {
        administrarCitas.reenombrarCitas({ ...citaObj })
        // Editamos la base de datos 
        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        objectStore.put(citaObj);
        transaction.oncomplete = () => {
            button.textContent = 'Crear cita';
            cumple = false
        }
        transaction.onerror = () => {
            console.log('Error')
        }
    } else {
        citaObj.id = Date.now();
        // Insertamos Registro en Indexed DB    
        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        // agragamos las citas a indexd DB
        objectStore.add(citaObj)
        transaction.oncomplete = () => console.log("transccion completada")
        administrarCitas.agragarCitas({ ...citaObj })
    }
    resetObjCita()
    form.reset()
    ui.mostrarCitas()
    button.disabled = true
}

// valida todos los campos
const validateData = (e) => {
    const data = new Date(e.target.value);
    // chequea si el input name es del mismo name y si cumple con el formato requerido
    if((!isText(e.target.value)) && (e.target.name === 'name')) {
        ui.validError(form.childNodes[1].childNodes[3], 'Nombre Invalido', form.childNodes[1])
    } else if (isText(e.target.value) && (e.target.name === 'name')){
        ui.validChck(form.childNodes[1].childNodes[3], form.childNodes[1])
    }
    // chequea si el input lastName es del mismo name y si cumple con el formato requerido
    if((!isText(e.target.value)) && (e.target.name === 'lastname')) {
        ui.validError(form.childNodes[3].childNodes[3], 'Apellido Invalido', form.childNodes[3])
    } else if (isText(e.target.value) && (e.target.name === 'lastname')) {
        ui.validChck(form.childNodes[3].childNodes[3], form.childNodes[3])
    }
    // chequea si el input email es del mismo name y si cumple con el formato requerido
    if((!isEmail(e.target.value))&& (e.target.name === 'email')) {
        ui.validError(form.childNodes[5].childNodes[3], 'Email Invalido', form.childNodes[5])
    } else if (isEmail(e.target.value) && (e.target.name === 'email')) {
        ui.validChck(form.childNodes[5].childNodes[3], form.childNodes[5])
    }
    // chequea si el input telefono es del mismo name y si cumple con el formato requerido
    if((!isNumbers(e.target.value)) && (e.target.name === 'phone')) {
        ui.validError(form.childNodes[7].childNodes[3], 'Ingrese un número telefonico', form.childNodes[7])
    }else if (isNumbers(e.target.value) && (e.target.name === 'phone')) {
        ui.validChck(form.childNodes[7].childNodes[3], form.childNodes[7])
    }
    // cheaque si el input de direccion tega letras o numeros
    if((!isAddress(e.target.value)) && (e.target.name === 'address')) {
        ui.validError(form.childNodes[9].childNodes[3], 'Direccion Invalida', form.childNodes[9])
    } else if ((isAddress(e.target.value)) && (e.target.name === 'address')) {
        ui.validChck(form.childNodes[9].childNodes[3], form.childNodes[9])
    }
    //chequea si el input city es solo texto
    if ((!isText(e.target.value)) && (e.target.name === 'city')) {
        ui.validError(form.childNodes[11].childNodes[3], 'Ciudad Invalida', form.childNodes[11])
    } else if(isText(e.target.value) && (e.target.name === 'city')) {
        ui.validChck(form.childNodes[11].childNodes[3], form.childNodes[11])
    }
    // chequea si el input fecha es del mismo name y si cumple con el formato requerido
    if (((data.getUTCDate() < e.target.min) && (e.target.name === 'date'))) {
        ui.validError(form.childNodes[13].childNodes[3], 'Fecha no valida', form.childNodes[13])
    } else if ((data.getUTCDate() >= e.target.min) && (e.target.name === 'date')) {
        ui.validChck(form.childNodes[13].childNodes[3], form.childNodes[13])
    }
    // chequea si el input tiempo es del mismo name y si cumple con el formato requerido
    if (((e.target.value < e.target.min) && (e.target.value > e.target.max) && (e.target.name === 'time'))) {
        ui.validError(form.childNodes[15].childNodes[3], 'Hora no disponible', form.childNodes[15])
    } else if (((e.target.value >= e.target.min) || (e.target.value < e.target.max)) && (e.target.name === 'time')) {
        ui.validChck(form.childNodes[15].childNodes[3], form.childNodes[15]);
    }
    citaObj[e.target.name] = e.target.value;
    // si el formulario esta completo activa el boton para enviar el formulario
    (formComplete()) ? button.disabled = false : button.disabled = true;

    return
}

const listener = (name, lastname, email, tel, address, city, date, time, description, form) => {
    name.addEventListener('change', validateData);
    lastname.addEventListener('change', validateData);
    email.addEventListener('change', validateData);
    tel.addEventListener('change', validateData);
    address.addEventListener('change', validateData);
    city.addEventListener('change', validateData);
    date.addEventListener('change', validateData);
    time.addEventListener('change', validateData);
    description.addEventListener('change', validateData);

    form.addEventListener('submit', nuevaCita)
}

export const initApp = () => {
    document.addEventListener('DOMContentLoaded', () => {
        createDB(DB)
        valueDateNow(dateForm);
        button.disabled = true
    })
    listener(nameForm,nameLastForm,emailForm,telForm,dirForm,cityForm,dateForm,timeForm,descripForm, form)
}