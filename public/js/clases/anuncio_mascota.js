import Anuncio from './anuncio.js';

export default class Anuncio_mascota extends Anuncio {
    constructor(id, titulo, descripcion, precio, animal, raza, fecha, vacuna) {
        super(id, titulo, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha = fecha;
        this.vacuna = vacuna;
    }

}