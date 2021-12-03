import { Citas } from './../src/js/class/citas';


describe('Check Dating Classes', () => {
    // instance an Citas
    const cita = new Citas();
    const id = Date.now();

    // Add new appointment
    test('Add a new appointment', () => {

        const citaObj = {
            name: 'Leandro Emanuel ',
            lastname: 'Quiroga',
            email: 'leandro@correo.com',
            phone: '1540253610',
            address: 'Lisandro de la torre 2514',
            city: 'Quilmes Oeste',
            date: '3/12/2021',
            time: '13:30',
            description: 'Depilacion',
        }

        citaObj.id = id
        cita.agragarCitas(citaObj)

        expect(cita).toMatchSnapshot()
    })

    
    // Edit new appointment

    test('Edit a appointment', () => {
        const citaObjUpdate = {
            id,
            name: 'Leandro Emanuel ',
            lastname: 'Quiroga',
            email: 'leandro@correo.com',
            phone: '1540253610',
            address: 'Lisandro de la torre 2514',
            city: 'Quilmes Oeste',
            date: '3/12/2021',
            time: '15:30',
            description: 'Depilacion',
        }

        cita.reenombrarCitas(citaObjUpdate);

        expect(cita).toMatchSnapshot()
    })


    // delete appointment
    test('Delete a appointment', () => {
        cita.eliminarCita(id);
        expect(cita).toMatchSnapshot()
    })
})