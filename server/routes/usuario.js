const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function (req, res) {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);
  
  Usuario.find({}, 'nombre email role estado google img') //cuando esta vacío es para que nos traiga todos los registros de esa colección, cuando pones en '' después de {} es lo que te va a salir de la info
      .skip(desde) //se salta los primeros 5      
      .limit(limite) //límite de 5 registros
      .exec((err, usuarios)=>{
      
         if (err){
             return res.status(400).json({
               ok: false,
               err
             });
           }

           Usuario.count({},(err, conteo)=>{
             
              res.json({
              ok: true,
              usuarios,
              cuantos: conteo
              });
       
           });
           
          });
    
  });
  
  app.post('/usuario', function (req, res) {
  
      let body = req.body;

      let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
      });


//grabar en la base de datos
      usuario.save( (err, usuarioDB)=>{

        if( err ){
          return res.status(400).json({
            ok: false,
            err
          });
        }

        //quitar la contraseña de la respuesta en postman
        //usuarioDB.password = null;

        res.json({
          ok: true,
          usuario: usuarioDB
        });


      });
  
  });
  
    app.put('/usuario/:id', function (req, res) {
       
      let id = req.params.id;
      let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


      Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        
        if( err ){
          return res.status(400).json({
            ok: false,
            err
          });
        }
        
        res.json({
                  ok: true,
                  usuario: usuarioDB
              });
      
      })
  
    });
  
    app.delete('/usuario/:id', function (req, res) {
      
      let id = req.params.id;

      Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

        if(err){
          return res.status(400).json({
            ok: false,
            err
          });
        };

        if(!usuarioBorrado){ //! si no existe usuario borrado, pasa esto
          return res.status(400).json({
            ok: false,
            err: {
              message: 'Usuario no encontrado'
            }
          });
        }

        res.json({
          ok: true,
          usuario: usuarioBorrado
        });



      });

      // res.json('delete Usuario'); esta era la respuesta que se obtenía antes
    });


module.exports = app;