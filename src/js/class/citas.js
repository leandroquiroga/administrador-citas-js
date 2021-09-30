export class Citas {
    constructor() {
        this._citas = []
    }

    // crea una nueva cita
    agragarCitas(citas) {
        this._citas = [...this._citas, citas]
    }

    // elimina una cita
    eliminarCita(id) {
        this._citas = this._citas.filter( cita => cita.id !== id)
    }


    // crea un nuevo arreglo en base al id actual, si es igual retorna el la cita editada sino retorna la cita actual
    reenombrarCitas(citaEditada) {
        this._citas = this._citas.map(cita => cita.id === citaEditada.id ? citaEditada : cita )
    }
}