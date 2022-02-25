const express = require('express')
const path = require('path')
const {query,del,insert,read} = require('../database')
const UserController = require('../controller/users')

//ASIGNAR MIDDLEWARE AL router
//router.use('/users')
function views(document){
  return path.join(__dirname,"..\\","\\views\\",document)
}

const router = express.Router()
/* CONTROLADOR */
const userController = new UserController()


router.get('/',function(peticion,respuesta){
  return respuesta.sendFile(views("index.html"))
})
router.get('/registro',function(peticion,respuesta){
  return respuesta.sendFile(views("registro.html"))
})
router.get('/users',function(peticion,respuesta){
  return respuesta.sendFile(views("users.html"))
})
router.get('/editUser/:id',function(peticion,respuesta){
  return respuesta.sendFile(views("editUser.html"))
})
router.get('/api/users', async(req,res)=>{
  var user = await userController.readAll()
  return res.json(user)
})
router.get('/api/users/:id', async(req,res)=>{
  const id = req.params.id
  var user = await userController.read(id)
  return res.json(user)
})
router.delete('/api/users/:id', async(req,res)=>{
  const id = req.params.id
  var user = await userController.delete(id)
  return res.json(user)
})
router.post('/api/editUser/:id', async(req,res)=>{
  const id = req.params.id
  var user = await userController.edit(id,req.body)
  return res.redirect("/")
})


/*  En server todos los Staticos
router.get('/js/users.js',(req,res)=>{
  return res.sendFile(path.join(__dirname,"..\\","\\static","\\js","\\users.js"))
}) */

router.post('/registro', async (req,res)=>{
  const persona = req.body
  const user = await userController.create(persona)
  if(user.success){
    return res.redirect(("/"))
  }else{
    return res.redirect(('/registro'))
  }
})
router.post('/eliminar', async (req,res)=>{
  const persona = req.body
  const result = await insert('users',persona)
  console.log(result)

  return res.redirect(("/"))
})



module.exports= router