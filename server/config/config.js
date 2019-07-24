//process objeto global que corre a lo largo de toda la aplicación de node y se actualiza dependiendo del enviroment

//=============
// Puerto
//=============

process.env.PORT = process.env.PORT || 3000;

//=============
// Entorno
//=============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//================
// Base de datos
//================

let urlDB

if(process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://strider:ayuxNfsmUDvMJXmu@cluster0-stfll.mongodb.net/cafe';
}

process.env.URLDB = urlDB;
