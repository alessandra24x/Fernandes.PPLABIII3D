import Anuncio_mascota from "./clases/anuncio_mascota.js";
import { mostrarTabla, mostrarFiltros } from "./view.js";

const URL = "http://localhost:3000/anuncios/";
export const array = [1, 2, 3, 1, 2, 1, 1, 1, 4, 5, 5, 4, 4];
localStorage.setItem("array", JSON.stringify(array));

export const lista = [];

export function getArraysLS() {
  const anuncioMasvisitado = JSON.parse(localStorage.getItem("array")) || [];
  let count = {};
  anuncioMasvisitado.forEach(function (i) {
    count[i] = (count[i] || 0) + 1;
  });
  return count;
}

function eventHandlerListar() {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let datos = JSON.parse(xhr.responseText);
        let anuncios = datos.map(
          (el) =>
            new Anuncio_mascota(el.id, el.titulo, el.descripcion, el.precio, el.animal, el.raza, el.fecha, el.vacuna)
        );
        lista.push(anuncios);
        mostrarFiltros(anuncios);
        mostrarTabla(anuncios);
        console.log(anuncios);
      } else {
        let msg = xhr.statusText || "Se produjo un error";
        reject(`Error: ${xhr.status} - ${msg}`);
      }
    }
  });

  xhr.open("GET", URL);
  xhr.send();
}

function eventHandlerAlta(anuncio) {
  const xhr = new XMLHttpRequest();
  delete anuncio.id;

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status <= 200 && xhr.status >= 300) {
        let msg = xhr.statusText || "Se produjo un error";
        alert(`Error: ${xhr.status} - ${msg}`);
      }

      JSON.parse(xhr.responseText);
    }
  });

  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(anuncio));
}

function eventHandlerModificar(anuncio) {
  let id = anuncio.id;
  delete anuncio.id;

  const config = {
    method: "PUT",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(anuncio),
  };

  fetch(URL + id, config)
    .then((response) => {
      response.ok ? response.text() : Promise.reject(response);
    })
    .catch((err) => {
      console.error(err.status);
    });
}

async function eventHandlerBaja(id) {
  try {
    const config = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
    };

    await fetch(URL + id, config);
    if (!response.ok) {
      let msg = xhr.statusText || "Se produjo un error";
      alert(`Error: ${xhr.status} - ${msg}`);
    }

    await response.json();
  } catch (err) {
    throw err.statusText;
  }
}

export { eventHandlerListar, eventHandlerAlta, eventHandlerModificar, eventHandlerBaja };
