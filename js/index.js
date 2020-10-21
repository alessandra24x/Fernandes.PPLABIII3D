import Anuncio_mascota from './clases/anuncio_mascota.js';
import crearTabla, { divTabla } from './tabla.js';

let listaMascotas;
let id;
let formulario;
const btnBaja = document.getElementById('baja');
const btnModificar = document.getElementById('modificacion');
const btnCancelar = document.getElementById('cancelar');

window.addEventListener('load', inicializarManejadores);

const form = document.getElementById('form');
form.addEventListener("change", () => {
    document.getElementById('alta').disabled = !form.checkValidity();
});

function inicializarManejadores() {
    listaMascotas = getMascotas();
    id = obtenerId();
    formulario = document.forms[0];
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevaMascota = guardarMascota();
        if (nuevaMascota) {
            listaMascotas.push(nuevaMascota);
            id++;
            guardarDatos();
            actualizarLista();
            cleanInputs();
            alert('Guardado con éxito');
        }
    })
}

btnBaja.addEventListener('click', e => {
    eventHandlerBaja(e, listaMascotas);
});


btnModificar.addEventListener('click', e => {
    eventHandlerModificar(e, listaMascotas);
})


btnCancelar.addEventListener('click', e => {
    eventHandlerCancelar(e);
});

function eventHandlerBaja(e, lista) {
    e.preventDefault();
    for (let i = 0; i < lista.length; i++) {
        const idActual = document.getElementById('inputId').value;
        if (lista[i].id == idActual) {
            lista.splice(i, 1);
            guardarDatos();
            actualizarLista();
            break;
        }
    }
    alert('Borrado con éxito');
}

function eventHandlerModificar(e, lista) {
    e.preventDefault();
    lista.forEach(mascota => {
        const idActual = document.getElementById('inputId').value;
        if (mascota.id == idActual) {
            mascota.titulo = document.getElementById('inputTitulo').value;
            mascota.descripcion = document.getElementById('inputDescripcion').value;
            mascota.animal = document.getElementById('inputAnimal').value;
            mascota.precio = document.getElementById('inputPrecio').value;
            mascota.raza = document.getElementById('inputRaza').value;
            mascota.fecha = document.getElementById('inputFecha').value;
            mascota.vacuna = document.getElementById('inputVacuna').value;
        }
    });
    guardarDatos();
    actualizarLista();
    cleanInputs();
    alert('Modificación realizada con éxito');
}

function eventHandlerCancelar(e) {
    e.preventDefault();
    cleanInputs();
}


function cleanInputs() {
    document.getElementById('inputTitulo').value = '';
    document.getElementById('inputDescripcion').value = '';
    document.getElementById('inputAnimal').value = '';
    document.getElementById('inputPrecio').value = '';
    document.getElementById('inputRaza').value = '';
    document.getElementById('inputFecha').value = '';
    document.getElementById('inputVacuna').value = '';
    document.getElementById('alta').disabled = false;
    document.getElementById('baja').disabled = true;
    document.getElementById('modificacion').disabled = true;
}

function getMascotas() {
    return JSON.parse(localStorage.getItem('mascota')) || [];
}

function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

function guardarMascota() {
    const titulo = document.getElementById('inputTitulo').value;
    const descripcion = document.getElementById('inputDescripcion').value;
    const animal = document.getElementById('inputAnimal').value;
    const precio = document.getElementById('inputPrecio').value;
    const raza = document.getElementById('inputRaza').value;
    const fecha = document.getElementById('inputFecha').value;
    const vacuna = document.getElementById('inputVacuna').value;

    const nuevoAnuncioM = new Anuncio_mascota(id, titulo, descripcion, precio, animal, raza, fecha, vacuna);
    return nuevoAnuncioM;
    //listaPersonas.push(nuevaPersona);
}


function guardarDatos() {
    localStorage.setItem('macota', JSON.stringify(listaMascotas));
    localStorage.setItem('nextId', id);
}

function actualizarLista() {
    while (divTabla.hasChildNodes()) {
        divTabla.innerHTML = "";
    }
    divTabla.appendChild(crearTabla(listaMascotas));
}
