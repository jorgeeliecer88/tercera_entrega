process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

let urlDB
if (process.env.NODE_ENV === 'local'){
	urlDB = 'mongodb://localhost:27017/inscripciones';
}else {
	urlDB = 'mongodb+srv://jperezadmin:jperezadmin@nodejstdea-zzotv.mongodb.net/inscripciones?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB