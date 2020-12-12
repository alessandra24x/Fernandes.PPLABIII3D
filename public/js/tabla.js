import { mostrarTabla } from "./view.js";

export const divTabla = document.getElementById("divTabla");
export const divFiltros = document.getElementById("divFiltros");
export let idActual;

export default function crearTabla(lista) {
  const tabla = document.createElement("table");
  console.log(lista);
  tabla.appendChild(crearCabecera(lista[0]));
  tabla.appendChild(crearCuerpo(lista));
  return tabla;
}

function crearCabecera(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in item) {
    if (key != "noid") {
      const th = document.createElement("th");
      const texto = document.createTextNode(key);
      th.appendChild(texto);
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function crearCuerpo(lista) {
  const tbody = document.createElement("tbody");
  lista.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key != "noid") {
        const td = document.createElement("td");
        const texto = document.createTextNode(element[key]);
        const a = document.createElement("a");
        a.setAttribute("href", "www.google.com");
        a.appendChild(texto);
        td.appendChild(a);
        //td.appendChild(texto);
        tr.appendChild(td);
      }
    }
    if (element.hasOwnProperty("id")) {
      tr.setAttribute("data-id", element["id"]);
    } else if (element.hasOwnProperty("noid")) {
      tr.setAttribute("data-id", element["noid"]);
    }
    agregarManejadorTR(tr, lista);
    tbody.appendChild(tr);
  });
  return tbody;
}

function agregarManejadorTR(tr, lista) {
  if (tr) {
    tr.addEventListener("click", function (e) {
      console.log(e.target.parentNode);
      fillInputs(lista, e.target.parentNode.getAttribute("data-id"));
      //alert(e.target.parentNode.getAttribute('data-id'));

      idActual = e.target.parentNode.getAttribute("data-id");
      console.log(idActual);
    });
  }
}

function fillInputs(lista, id) {
  lista.forEach((mascota) => {
    if (mascota.id == id) {
      const btnBaja = document.getElementById("baja");
      const btnModificar = document.getElementById("modificacion");
      const btnAlta = document.getElementById("alta");
      document.getElementById("inputId").value = mascota.id;
      document.getElementById("inputTitulo").value = mascota.titulo;
      document.getElementById("inputDescripcion").value = mascota.descripcion;
      document.getElementById("inputAnimal").value = mascota.animal;
      document.getElementById("inputPrecio").value = mascota.precio;
      document.getElementById("inputRaza").value = mascota.raza;
      document.getElementById("inputFecha").value = mascota.fecha;
      document.getElementById("inputVacuna").value = mascota.vacuna;

      btnBaja.disabled = false;
      btnModificar.disabled = false;
      btnAlta.disabled = true;
    }
  });
}

function crearFiltroColumna(lista) {
  const fila = document.createElement("div");
  fila.classList.add("row");

  for (let key in lista[0]) {
    const frmCheck = document.createElement("div");
    frmCheck.classList.add("frmCheck");
    frmCheck.classList.add("col-sm-6");
    frmCheck.classList.add("col-md-2");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("value", key);
    input.classList.add("form-check-input");
    input.name = "check" + key;
    input.id = "check" + key;
    input.checked = true;
    input.addEventListener("click", () => mostrarTabla(lista));

    const label = document.createElement("label");
    label.setAttribute("for", "check" + key);
    label.classList.add("form-check-label");
    const texto = document.createTextNode(key);

    label.appendChild(texto);
    frmCheck.appendChild(input);
    frmCheck.appendChild(label);
    fila.appendChild(frmCheck);
  }

  return fila;
}

function crearFiltroFila(lista) {
  const fila = document.createElement("div");
  fila.classList.add("row");

  const div1 = document.createElement("div");
  div1.classList.add("col-sm-6");

  const select = document.createElement("select");
  select.classList.add("form-control");
  select.classList.add("custom-select");
  select.id = "selectfila";
  select.addEventListener("change", () => mostrarTabla(lista));

  let animales = lista.map((element) => element.animal).unique();

  animales = ["Todos", ...animales];

  animales.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", element);
    const texto = document.createTextNode(element);

    option.appendChild(texto);
    select.appendChild(option);
  });

  const texto2 = document.createTextNode("Filtrar Animal");
  const label2 = document.createElement("label");
  label2.appendChild(texto2);
  div1.appendChild(label2);
  div1.appendChild(select);
  fila.appendChild(div1);

  const inputPromedio = crearInputPromedio();
  const inputPrecioMax = crearInputPrecMax();
  const inputPrecioMin = crearInputPrecMin();
  const inputPorcAnimalesVacunados = crearInputPorcAnimalesVacunados();

  fila.appendChild(inputPorcAnimalesVacunados);
  fila.appendChild(inputPromedio);
  fila.appendChild(inputPrecioMax);
  fila.appendChild(inputPrecioMin);

  return fila;
}

function crearInputPromedio() {
  const div2 = document.createElement("div");
  div2.classList.add("form-group");
  div2.classList.add("col-sm-4");

  const label = document.createElement("label");
  label.setAttribute("for", "txtResultadoFiltro");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("disabled", "true");
  input.id = "txtResultadoFiltro";
  input.classList.add("form-control");

  const texto = document.createTextNode("Precio promedio");

  label.appendChild(texto);
  div2.appendChild(label);
  div2.appendChild(input);

  return div2;
}

function crearInputPrecMax() {
  const div = document.createElement("div");
  div.classList.add("form-group");
  div.classList.add("col-sm-4");

  const label = document.createElement("label");
  label.setAttribute("for", "txtPrecioMax");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("disabled", "true");
  input.id = "txtPrecioMax";
  input.classList.add("form-control");

  const texto = document.createTextNode("Precio Maximo");

  label.appendChild(texto);
  div.appendChild(label);
  div.appendChild(input);

  return div;
}

function crearInputPrecMin() {
  const div = document.createElement("div");
  div.classList.add("form-group");
  div.classList.add("col-sm-4");

  const label = document.createElement("label");
  label.setAttribute("for", "txtPrecioMin");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("disabled", "true");
  input.id = "txtPrecioMin";
  input.classList.add("form-control");

  const texto = document.createTextNode("Precio Minimo");

  label.appendChild(texto);
  div.appendChild(label);
  div.appendChild(input);

  return div;
}

function crearInputPorcAnimalesVacunados() {
  const div = document.createElement("div");
  div.classList.add("form-group");
  div.classList.add("col-sm-6");

  const label = document.createElement("label");
  label.setAttribute("for", "txtPorcentaje");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("disabled", "true");
  input.id = "txtPorcentaje";
  input.classList.add("form-control");

  const texto = document.createTextNode("Porcentaje Animales Vacunados");

  label.appendChild(texto);
  div.appendChild(label);
  div.appendChild(input);

  return div;
}

export function crearFiltro(lista) {
  const frag = document.createDocumentFragment();

  frag.appendChild(crearFiltroFila(lista));

  frag.appendChild(crearFiltroColumna(lista));

  return frag;
}
