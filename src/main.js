require("../config/config")

var { app, path } = require("./servidor");
const helper = require("../helpers/helper");
const bodyParser = require("body-parser");
const { crearCurso, crearInscripcion } = require("../src/funciones");
const mongoose = require('mongoose');
const Cursos = require("../modelos/cursos");
const Inscripciones = require("../modelos/inscripciones");

mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resultado) => {
	if (err){
		return console.log(error)
	}
	console.log(">> conectado mongo db")
});

var hbs = require("hbs");

const directorio_partials = path.join(__dirname, "../partials");

hbs.registerPartials(directorio_partials);

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.render("index", { titulo_seccion: "Inicio" });
});

app.get("/crear_curso", function(request, response) {
  response.render("crear_curso", { titulo_seccion: "Crear Cursos" });
});

app.post("/crear_curso", function(req, res) {

  Cursos.find({idcurso:req.body.idcurso},(err,respuesta)=>{
		if (err){
      res.render("error", { mensaje_error: err});
    }

    if(respuesta.length<=0) {

      let cursosDB = new Cursos({
        idcurso: req.body.idcurso,
        nombre: req.body.nombre,
        modalidad: req.body.modalidad,
        valor: req.body.valor,
        desc: req.body.desc,
        intensidad: req.body.intensidad,
        estado: "Disponible"
      });

      cursosDB.save((err,respuesta)=>{
        if(err){
          res.render("error", { mensaje_error: err});
        }
        res.render("ver_curso", { titulo_seccion: "Ver Cursos" });
    });
    }else{
      res.render("error", { mensaje_error: "Ya existe curso con ese id" });
    }
  });
});

app.get("/ver_curso_administrador", function(request, response) {
  response.render("ver_curso_administrador", {
    titulo_seccion: "Ver Cursos Como Administrador"
  });
});

app.get("/inscribir", function(request, response) {
  response.render("inscribir", { titulo_seccion: "Inscribir" });
});
app.post("/inscribir", function(req, res) {
  console.log(req.body);

  if (crearInscripcion(req.body)) {
    response.render("ver_inscritos", { titulo_seccion: "Ver Inscritos" });
  } else {
    res.render("error", {
      mensaje_error: "El usuario ya esta inscrito en el curso"
    });
  }
});
app.get("/ver_inscritos", function(request, response) {
  response.render("ver_inscritos", { titulo_seccion: "Ver Inscritos" });
});
