import {
  getArraysLS,
  eventHandlerListar,
  eventHandlerAlta,
  eventHandlerModificar,
  eventHandlerBaja,
} from "./service.js";
import { idActual } from "./tabla.js";
import { guardarAnuncio, mostrarSpinner, cleanInputs } from "./view.js";

Array.prototype.unique = function () {
  return [...new Set(this)];
};

window.addEventListener("load", inicializarManejadores);

const form = document.getElementById("form");

form.addEventListener("change", () => {
  document.getElementById("alta").disabled = !form.checkValidity();
});

function inicializarManejadores() {
  eventHandlerListar();
  //  getAnunciosLS();
  const formulario = document.forms[0];

  formulario.cancelar.addEventListener("click", (e) => {
    cleanInputs();
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.submitter.id == "alta") {
      debugger;
      const nuevoAnuncio = guardarAnuncio();
      if (nuevoAnuncio) {
        mostrarSpinner();
        eventHandlerAlta(nuevoAnuncio);
        eventHandlerListar();
        cleanInputs();
      }
    }

    if (e.submitter.id == "modificacion") {
      const anuncio = guardarAnuncio();
      if (anuncio) {
        mostrarSpinner();
        eventHandlerModificar(anuncio);
        eventHandlerListar();
        cleanInputs();
      }
    }

    if (e.submitter.id == "baja") {
      mostrarSpinner();
      eventHandlerBaja(idActual);
      eventHandlerListar();
      cleanInputs();
    }
  });
}

const array = getArraysLS();
console.log(array);

function arrayToSeries() {
  let dataAsJson = JSC.csv2Json(text);
  let male = [],
    female = [];
  dataAsJson.forEach(function (row) {
    //add either to male, female, or discard.
    console.log(row);
  });
}

let series = arrayToSeries(array);
renderChart(series);

function renderChart(series) {
  JSC.Chart("chartDiv", {
    annotations: [
      {
        position: "bottom left",
      },
    ],
    legend_visible: false,
    defaultSeries_lastPoint_label_text: "<b>%seriesName</b>",
    defaultPoint_tooltip: "%seriesName <b>%yValue</b> years",
    xAxis_crosshair_enabled: true,
    series: series,
  });
}
