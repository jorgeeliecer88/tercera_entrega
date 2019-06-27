
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cursosSchema = new Schema({
    idcurso: {type: Number, require:true},
    nombre: {type: String, require:true},
    modalidad: {type: String, require:true},
    valor: {type: Number, require:true},
    descripcion: {type: String, require:false},
    intensidad: {type: Number, require:true},
    estado: {type: String, require:true}
});

const Cursos = mongoose.model('Cursos', cursosSchema);

module.exports = Cursos