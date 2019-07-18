require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //midlewares, cada petición siempre pasa por estas líneas
 // parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario')); //importamos y usamos las rutas del usuario

  mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true}, (err, res)=>{
   
  if (err) throw err;

  console.log('Base de datos ONLINE');
  });



  app.listen(process.env.PORT, () =>{
    console.log('Escuchando puerto:', process.env.PORT);
});