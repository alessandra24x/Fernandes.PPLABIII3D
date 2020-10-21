export const divTabla = document.getElementById('divTabla');

export default function crearTabla(lista) {
    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));
    return tabla;
}


function crearCabecera(item) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    for (const key in item) {
        const th = document.createElement("th");
        const texto = document.createTextNode(key);
        th.appendChild(texto);
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement("tr");
        for (const key in element) {
            const td = document.createElement("td");
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
        }
        agregarManejadorTR(tr, lista);
        tbody.appendChild(tr);
    });
    return tbody;
}

function agregarManejadorTR(tr, lista) {
    if (tr) {
        tr.addEventListener('click', function (e) {
            console.log(e.target.parentNode);
            fillInputs(lista, e.target.parentNode.getAttribute('data-id'));
            //alert(e.target.parentNode.getAttribute('data-id'));
        })

    }
}


function fillInputs(lista, id) {
    lista.forEach(mascota => {
        if (mascota.id == id) {
            const btnBaja = document.getElementById('baja');
            const btnModificar = document.getElementById('modificacion');
            const btnAlta = document.getElementById('alta');
            document.getElementById('inputId').value = mascota.id;
            document.getElementById('inputTitulo').value = mascota.titulo;
            document.getElementById('inputDescripcion').value = mascota.descripcion;
            document.getElementById('inputAnimal').value = mascota.animal;
            document.getElementById('inputPrecio').value = mascota.precio;
            document.getElementById('inputRaza').value = mascota.raza;
            document.getElementById('inputFecha').value = mascota.fecha;
            document.getElementById('inputVacuna').value = mascota.vacuna;

            btnBaja.disabled = false;
            btnModificar.disabled = false;
            btnAlta.disabled = true;
        }
    });
}