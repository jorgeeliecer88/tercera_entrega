
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const inscripcionesSchema = new Schema({
    cedula: { type: Number, require:true},
    email: { type: String, require:true},
    nombre: { type: String, require:true},
    telefono: { type: Number, require:true},
    curso: { type: Number, require:true}
});

const Inscripciones = mongoose.model('Inscripciones', inscripcionesSchema);

module.exports = Inscripciones