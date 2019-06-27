const hbs = require("hbs");
const {
  obtenerCursos,
  obtenerInscritos,
  obtenerCursosSelect,
  obtenerCursosCallapsed,
  obtenerCursosCallapsedEliminar
} = require("../src/funciones");

hbs.registerHelper("getDate", getDate);
hbs.registerHelper("listarEstudiantes", listarEstudiantes);
hbs.registerHelper("listarMaterias", listarMaterias);

hbs.registerHelper("obtenerCursosCallapsedEliminar", function() {
  return obtenerCursosCallapsedEliminar();
});

hbs.registerHelper("obtenerCursosCallapsed", function() {
  return obtenerCursosCallapsed();
});

hbs.registerHelper("getCursos", function() {
  return obtenerCursos();
});

hbs.registerHelper("obtenerCursoSelect", function() {
  return obtenerCursosSelect();
});

hbs.registerHelper("getInscritos", function() {
  return obtenerInscritos();
});

function getDate(mensaje) {
  return mensaje + Date.now();
}

function listarEstudiantes() {
  let text = "Lista Estudiantes:";
  var estudiantesIn = require("../datos/estudiantes.json");
  estudiantesIn.forEach(estudiante => {
    text += estudiante.nombre;
  });

  return text;
}

function listarMaterias() {
  var materiasIn = require("../datos/materias.json");
  let text = "Lista Estudiantes:";
  materiasIn.forEach(materia => {
    text += materia.nombre;
  });
  return text;
}
