import crearTabla, { divTabla, divFiltros, idActual, crearFiltro } from "./tabla.js";
import Anuncio_mascota from "./clases/anuncio_mascota.js";

function guardarAnuncio() {
  console.log(idActual);
  const titulo = document.getElementById("inputTitulo").value;
  const descripcion = document.getElementById("inputDescripcion").value;
  const animal = document.getElementById("inputAnimal").value;
  const precio = document.getElementById("inputPrecio").value;
  const raza = document.getElementById("inputRaza").value;
  const fecha = document.getElementById("inputFecha").value;
  const vacuna = document.getElementById("inputVacuna").value;

  const nuevoAnuncioM = new Anuncio_mascota(idActual, titulo, descripcion, precio, animal, raza, fecha, vacuna);
  return nuevoAnuncioM;
}

const crearSpinner = (elemento) => {
  const spinner = document.createElement("div");
  spinner.setAttribute("class", "spinner");

  const img = document.createElement("img");
  img.setAttribute("src", "./assets/spinner.gif");
  img.setAttribute("alt", "Imagen spinner");

  spinner.appendChild(img);

  elemento.appendChild(spinner);
};

const mostrarSpinner = () => {
  removerElemento(divTabla);
  crearSpinner(divTabla);
};

const mostrarTabla = (anuncios) => {
  console.log("Anuncios en mostrar: ", anuncios);
  removerElemento(divTabla);
  divTabla.appendChild(crearTabla(filtrarLista(filtroCalcular(filtrarFilas(anuncios)))));
};

const mostrarFiltros = (anuncios) => {
  removerElemento(divFiltros);
  divFiltros.appendChild(crearFiltro(anuncios));
};

function cleanInputs() {
  document.getElementById("inputTitulo").value = "";
  document.getElementById("inputDescripcion").value = "";
  document.getElementById("inputAnimal").value = "";
  document.getElementById("inputPrecio").value = "";
  document.getElementById("inputRaza").value = "";
  document.getElementById("inputFecha").value = "";
  document.getElementById("inputVacuna").value = "";
  document.getElementById("alta").disabled = false;
  document.getElementById("baja").disabled = true;
  document.getElementById("modificacion").disabled = true;
}

function removerElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
}

function filtroCalcular(anuncios) {
  let resultado = document.getElementById("txtResultadoFiltro");
  if (anuncios.length > 0) {
    resultado.value = anuncios.reduce((a, b) => Number(a) + Number(b.precio), 0) / anuncios.length;
    minMax(anuncios);
    porcVacunados(anuncios);
  } else {
    resultado.value = 0;
  }

  return anuncios;
}

function minMax(anuncios) {
  let resultadoMax = document.getElementById("txtPrecioMax");
  let resultadoMin = document.getElementById("txtPrecioMin");
  if (anuncios.length > 0) {
    resultadoMax.value = Math.max.apply(
      Math,
      anuncios.map(function (o) {
        return o.precio;
      })
    );
    resultadoMin.value = Math.min.apply(
      Math,
      anuncios.map(function (o) {
        return o.precio;
      })
    );
  } else {
    resultado.value = 0;
  }

  return anuncios;
}

function estaVacunado(anuncios) {
  let array = [];
  anuncios.filter((animal) => {
    if (animal.vacuna === "Si") {
      array.push(animal);
    }
  });
  return array;
}

function porcVacunados(anuncios) {
  let porcentaje = document.getElementById("txtPorcentaje");
  let vacunados = estaVacunado(anuncios);
  porcentaje.value = (100 * vacunados.length) / anuncios.length;
  //   vacunados.forEach(function (animal) {
  //     porcentaje.value = (100 * animal.length) / anuncios.length;
  //   });
}

function filtrarFilas(anuncios) {
  console.log("Anuncios estan llegando? ", anuncios);
  let filaSel = document.getElementById("selectfila").value;
  return anuncios.filter((fila) => {
    if (filaSel == "Todos") {
      return true;
    }
    return fila.animal == filaSel;
  });
}

function filtrarLista(anuncios) {
  //let array = [];
  const filtro = anuncios.map((fila) => {
    let aux = {};
    for (const key in fila) {
      //key es cada uno de los elementos de la lista que va siendo iterada uno por uno en fila. Key = "id", key = "titulo", etc
      if (document.getElementById("check" + key).checked) {
        aux[key] = fila[key]; //se va construyendo el objeto auxiliar con solo los elementos que estén checked
      } else if (key == "id") {
        //si no está checked algún elemento y su key es "id" se guarda ese id como "noid"
        aux["noid"] = fila[key];
      }
    }
    //array.push(aux);
    return aux;
  });
  //guardarDatos(array);
  return filtro;
}

function guardarDatos() {
  localStorage.setItem("anuncio", JSON.stringify(array));
  //localStorage.setItem("nextId", id);
}

export { guardarAnuncio, mostrarSpinner, cleanInputs, mostrarTabla, mostrarFiltros };
