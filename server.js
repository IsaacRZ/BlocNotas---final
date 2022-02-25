/* REQUIRE */
const config = require('./config.js')
const express = require('express')
const path = require('path')

/* IMPORTAR RUTAS */
const userRoutes = require('./routes/users')

function views(document){
    console.log(__dirname+`\\views\\`+document)
    return path.join(__dirname,"\\views\\",document)
  }
  

/* CONST */
const app = express()
const port = 4000

/* ARCHIVOS ESTATICOS*/
app.use(express.static(path.join(__dirname,"\\static")))

/* MIDDLEWARE */
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(userRoutes)

/* GET */

app.get('/eliminar',function(peticion,respuesta){
    return respuesta.sendFile(views("eliminar.html"))
})

/* POST */
app.post('/registrar',async(req,res)=>{
    const persona = req.body
    const result = await insert('users',persona)
    return res.json(result)
})


app.get('/mostrar_usuarios',async (request,response)=>{
    //Otra forma de gestionar promesas
    try{
        //const results = await query('SELECT * FROM users')
        const results = await query('SELECT * FROM users')
        return response.json(results)
    }catch(error){
        return response.json(error)
    }})

app.listen(port,()=>{
    console.log(" http://localhost:4000/ working")
})