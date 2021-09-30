import { selector, create, deleteCard, limpiarHTML } from "../function/module.js";
import editarCita from "../index.js";
import { DB } from './../database/dataDB';

export class Ui {
    //Activa una un mensaje de error dependiendo del error de la validacion
    validError(input, text, sector) {
        let divInput = create('div');
        let p = create('p');

        if (!input.classList.contains('error')) {
            input.classList.add('error');
            p.classList.add('error-message','p-0', 'm-0');
            p.textContent = text;
            divInput.appendChild(p);
            sector.insertBefore(divInput, sector.childNodes[8])
        }
    }
    //Muestra al usuario que es correcto la validacion
    validChck(input, sector) {
        if (input.classList.contains('error')) {
            input.classList.remove('error');
            sector.childNodes[5].classList.add('oculto')
        }
    }
    citasVacias(result) {
        let div = selector('.no-task ');
        if (result == 0) {
            div.classList.remove('oculto')    
        } else {
            div.classList.add('oculto')
         }
    }
    // Muestra en formato carta todos los datos de cada objeto
    mostrarCitas() {
        let cardList = selector('#card-cita');
        // Leer el contentido de la bases de datos
        let objectStore = DB.transaction('citas').objectStore('citas');
        const total = objectStore.count();
        
        // Cantidad de elementos en nuestra base de datos
        this.citasVacias(total);
        let cantDB = this.citasVacias;
        total.onsuccess = function () {
            cantDB(total.result)
        }
        limpiarHTML(cardList);

        objectStore.openCursor().onsuccess = (e) => {
            let cursor = e.target.result;
            // validamos que haya un cursor
            if (cursor) {
                const { name, lastname, email, phone, address, city, date, time, description, id } = cursor.value;
                let divCard = create('div');
                let bodyCard = create('div');
                let titleCard = create('h2');
                let emailSmall = create('small');
                let phoneSmall = create('small');
                let addressSmall = create('small');
                let dateSmall = create('small');
                let descriptionSmall = create('small');
                let divBtn = create('div')
                let btnClose = create('button');
                let btnEdit = create('button');

                // div Principal
                divCard.classList.add('card', 'animation-in-fwd');
                divCard.style = "width: 350px;"
                divCard.dataset.id = id;
                cardList.appendChild(divCard);
                // Body
                bodyCard.classList.add('card-body', 'row');
                divCard.appendChild(bodyCard);

                // Scripting de los elementos de la cita
                titleCard.classList.add('card-title');
                titleCard.textContent = `${name} ${lastname}`;

                emailSmall.classList.add('card-text','font-weigth-bolder');
                emailSmall.textContent = `Email: ${email}`;

                phoneSmall.classList.add('card-text','font-weigth-bolder');
                phoneSmall.textContent = `Número Telefónico: ${phone}`;

                addressSmall.classList.add('card-text','font-weigth-bolder');
                addressSmall.textContent = `Dirección: ${address} - ${city}`

                dateSmall.classList.add('card-text','font-weigth-bolder');
                dateSmall.textContent = `Fecha: ${date} - Horario: ${time}`;

                descriptionSmall.classList.add('card-text','font-weigth-bolder');
                descriptionSmall.textContent = `Descripción: ${description}`

                // botones
                divBtn.classList.add('d-flex', 'justify-content-around', 'align-content-center', 'my-2');
                btnClose.classList.add('btn', 'btn-danger');
                btnClose.dataset.bsToggle = 'modal';
                btnClose.dataset.bsTarget = '#modal';
                btnClose.innerHTML = 'Eliminar <svg class="close-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                btnClose.onclick = () => {
                    // selecciona el body del modal para agregar elementos
                    let modalMsg = selector('#modal').childNodes[1].childNodes[1].childNodes[3]
                    let titleModal = selector('#modal').childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1]
                    let div = create('div');
                    let p = create('p');
                    deleteCard(id);

                    limpiarHTML(modalMsg)
                    // mensaje
                    div.classList.add('row','justify-content-center', 'p-1' ,'align-content-center' )
                    titleModal.classList.add('text-center')
                    titleModal.textContent = 'Enhorabuena ! Completaste una cita.'
                    p.classList.add('text-center', 'text-modal')
                    p.textContent = `Has eliminado a ${name} ${lastname}`;
                    div.appendChild(p)
                    modalMsg.insertBefore(div,modalMsg.lastChild)
                }

                btnEdit.classList.add('btn', 'btn-info');
                btnEdit.innerHTML = 'Editar <svg class="edit-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
                let cita = cursor.value;  // cita toma el valor de el cursor actual
                btnEdit.onclick = () => {
                    editarCita(cita);
                }
                divBtn.appendChild(btnClose);
                divBtn.appendChild(btnEdit);

                // Agrega todos los elementos al div padre (divCard);
                bodyCard.insertBefore(titleCard, bodyCard.firstChild);
                bodyCard.insertBefore(emailSmall, bodyCard.childNodes[2]);
                bodyCard.insertBefore(phoneSmall, bodyCard.childNodes[3]);
                bodyCard.insertBefore(addressSmall, bodyCard.childNodes[4]);
                bodyCard.insertBefore(dateSmall, bodyCard.childNodes[5]);
                bodyCard.insertBefore(descriptionSmall, bodyCard.childNodes[6]);
                bodyCard.insertBefore(divBtn, bodyCard.childNodes[7]);

                // Avanza al siguiente elemento del la base de datos
                cursor.continue();
            }
        }
    }

}
