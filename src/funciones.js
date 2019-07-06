const fs = require("fs");
const Cursos = require("../modelos/cursos");

let inscripciones = [];
let cursos = [];
var messageError = "";
let cursosTempDB = [];

let obtenerCursosSelect = () => {
  leerCursos();
  let texto = "";
  cursos.forEach(curso => {
    if (curso.estado == "Disponible") {
      texto += `<option value="${curso.idcurso}">` + curso.nombre + `</option>`;
    }
  });

  return texto;
};

let obtenerCursosCallapsedEliminar = () => {
  leerCursos();
  leerInscripcion();
  let texto = "";
  i = 1;
  cursos.forEach(curso => {
    if (curso.estado == "Disponible") {
      texto +=
        `<div class="card">
              <div class="card-header" id = "heading${i}">\
              <h5 class='mb-0'>\
              <button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapse${i}'\
                 aria-expanded='true' aria-controls='collapseOne'>` +
        curso.nombre +
        `</button>
               </h5 >
               </div>
              <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
              <div class="card-body">`;

      let tabla =
        "<table class='table'>\
             <thead class='thead-dark'>\
            <tr>\
              <th scope='col'>Documento</th>\
              <th scope='col'>Nombre</th>\
              <th scope='col'>Coreo</th>\
              <th scope='col'>Telefono</th>\
              <th scope='col'>Eliminar</th>\
            </tr>\
          </thead>\
          <tbody>";

      let itemEliminar = "";

      inscripciones.forEach(inscripcion => {
        if (inscripcion.curso == curso.idcurso) {
          itemEliminar +=
            "<tr><th scope='row'>" +
            inscripcion.cedula +
            "</th>" +
            "<th>" +
            inscripcion.nombre +
            "</th>" +
            "<th>" +
            inscripcion.email +
            "</th>" +
            "<th>" +
            inscripcion.telefono +
            "</th>" +
            "<th> <button type='submit' class='btn btn-warning btn - sx'>Eliminar</button></th></tr>";
        }
      });

      let existeIns = inscripciones.find(
        inscripcionInn => inscripcionInn.curso == curso.idcurso
      );

      if (existeIns) {
        texto += tabla + itemEliminar + "  </tbody></table >";
      }

      texto += ` </div>
            </div>`;
    }
    i++;
  });
  return texto;
};

let obtenerCursosCallapsed = () => {
  leerCursos();

  let texto = "";
  i = 1;
  cursos.forEach(curso => {
    if (curso.estado == "Disponible") {
      texto +=
        `<div class="card">
              <div class="card-header" id = "heading${i}">\
              <h5 class='mb-0'>\
              <button class='btn btn-link' type='button' data-toggle='collapse' data-target='#collapse${i}'\
                 aria-expanded='true' aria-controls='collapseOne'>` +
        curso.nombre +
        `</button>
               </h5 >
             </div>
            
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
              <div class="card-body">
               Id  : ${curso.idcurso} <br>
               Nombre : ${curso.nombre} <br>
               valor : ${curso.valor} <br>
               Descripcion : ${curso.descripcion} <br>
               Modalidad : ${curso.modalidad} <br>
               Intensidad : ${curso.intensidad} <br>
              </div>
            </div>`;
      i++;
    }
  });
  return texto;
};

let obtenerCursos = () => {
  leerCursos();

  let texto =
    "<table class='table'>\
  <thead class='thead-dark'>\
    <tr>\
      <th scope='col'>Id</th>\
      <th scope='col'>Nombre</th>\
      <th scope='col'>Descripcion</th>\
      <th scope='col'>Valor</th>\
      <th scope='col'>Modalidad</th>\
      <th scope='col'>Intensidad</th>\
      <th scope='col'>Estado</th>\
    </tr>\
  </thead>\
  <tbody></tbody>";

  console.log( " Nuevo Find : " );

  Cursos.find({},(err,respuesta)=>{
		if (err){
      estadoProceso = false;
      return console.log(err)
    }
    cursosTempDB = respuesta;
      console.log( " Find : " + cursosTempDB);
    
  });

  cursosTempDB.forEach(curso => {
    texto +=
      "<tr><th scope='row'>" +
      curso.idcurso +
      "</th>" +
      "<th>" +
      curso.nombre +
      "</th>" +
      "<th>" +
      curso.descripcion +
      "</th>" +
      "<th>" +
      curso.valor +
      "</th>" +
      "<th>" +
      curso.modalidad +
      "</th>" +
      "<th>" +
      curso.intensidad +
      "</th>" +
      "<th>" +
      curso.estado +
      "</th>" +
      "</tr>";
  });

  
  texto += "  </tbody></table >";
  return texto;
};

let obtenerInscritos = () => {
  leerInscripcion();

  let texto =
    "<table class='table'>\
  <thead class='thead-dark'>\
    <tr>\
      <th scope='col'>Cedula</th>\
      <th scope='col'>Email</th>\
      <th scope='col'>Nombre</th>\
      <th scope='col'>Telefono</th>\
      <th scope='col'>Curso</th>\
    </tr>\
  </thead>\
  <tbody></tbody>";

  inscripciones.forEach(inscripcion => {
    texto +=
      "<tr><th scope='row'>" +
      inscripcion.cedula +
      "</th>" +
      "<th>" +
      inscripcion.email +
      "</th>" +
      "<th>" +
      inscripcion.nombre +
      "</th>" +
      "<th>" +
      inscripcion.telefono +
      "</th>" +
      "<th>" +
      buscaNombreCurso(inscripcion.curso) +
      "</th>" +
      "</tr>";
  });
  texto += "  </tbody></table >";
  return texto;
};

let crearCurso = curso => {
  let estadoProceso = true;
  let duplicado = false;

  const q = Cursos.find({idcurso:curso.idcurso},(err,respuesta)=>{
		if (err){
      estadoProceso = false;
      return console.log(err)
    }
    if(respuesta){
      duplicado = true;
      console.log( " Find : " + duplicado);
    }
  });
  
  console.log(q);

  let cursosDB = new Cursos({
      idcurso: curso.idcurso,
      nombre: curso.nombre,
      modalidad: curso.modalidad,
      valor: curso.valor,
      desc: curso.desc,
      intensidad: curso.intensidad,
      estado: "Disponible"
    }
  );

  console.log( " Entrante : " + duplicado);
  if (!duplicado) {
      cursosDB.save((err,respuesta)=>{
        if(err){
          messageError = " Error al guardar el curso intente de nuevo";
          estadoProceso = false;
        }
        console.log(respuesta);
        estadoProceso = true;
    });    
  } else {
    messageError = " El curso ya fue creado.";
    estadoProceso = false;
    console.log(messageError);
  }
  return estadoProceso;
};

let buscaNombreCurso = idcurso => {
  let nombreCurso = "";
  leerCursos();
  cursos.forEach(curso => {
    if (curso.idcurso == idcurso) {
      nombreCurso = curso.nombre;
    }
  });
  return nombreCurso;
};

let crearInscripcion = inscripcion => {
  let estadoProceso = true;
  leerInscripcion();

  let inscripcionIn = {
    cedula: inscripcion.cedula,
    email: inscripcion.email,
    nombre: inscripcion.nombre,
    telefono: inscripcion.telefono,
    curso: inscripcion.curso
  };

  let duplicado = inscripciones.find(est => est.cedula == inscripcionIn.cedula);

  if (!duplicado) {
    inscripciones.push(inscripcionIn);
    guardarInscripcion(inscripciones);
  } else {
    console.log(">> El estudiante ya existe");
    estadoProceso = false;
  }

  return estadoProceso;
};

let leerInscripcion = () => {
  try {
    inscripciones = require("../datos/inscripciones.json");
  } catch (error) {
    inscripciones = [];
  }
};

let leerCursos = () => {
  try {
    cursos = require("../datos/cursos.json");
  } catch (error) {
    messageError = "Error al leer los cursos";
    cursos = [];
    console.log(messageError);
  }
};

let guardarInscripcion = () => {
  let dato = JSON.stringify(inscripciones);
  fs.writeFile("./datos/inscripciones.json", dato, err => {
    if (err) throw err;
    console.log(">> La inscripcion se realizo con exito.");
  });
};

let guardarCursos = () => {
  let dato = JSON.stringify(cursos);
  fs.writeFile("./datos/cursos.json", dato, err => {
    if (err) {
      console.log(">> Error al guardar un curso");
      throw err;
    }
    console.log(">> Curso creado con exito");
  });
};

let promedioSuperior = () => {
  leer();
  console.log("<< Notas inscripciones  mayores a 3>>");
  inscripciones.forEach(item => {
    let promedio = item.programacion + item.ingles + item.matematicas;
    if (promedio > 3) {
      console.log("Estudiante : " + item.nombre);
      console.log("Promedio :" + promedio);
      console.log("\n");
    }
  });
};

let promedio = estInput => {
  console.log(">> estudiante  : " + estInput);
  leer();
  let estPromedio = inscripciones.find(est => est.nombre == estInput);
  if (estPromedio) {
    console.log(
      ">> El promedio de " +
        estPromedio.nombre +
        " es : " +
        (estPromedio.matematicas +
          estPromedio.ingles +
          estPromedio.programacion)
    );
  } else {
    console.log(
      ">> El estudiente no esta en el sistema, crealo en el sistema antes."
    );
  }
};

module.exports = {
  crearCurso,
  obtenerCursos,
  obtenerCursosSelect,
  obtenerCursosCallapsed,
  obtenerCursosCallapsedEliminar,
  crearInscripcion,
  obtenerInscritos,

  promedioSuperior,
  promedio,
  messageError
};
