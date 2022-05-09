const express = require("express")
const app = express()

app.use(express.static("public"))

app.set('view engine', 'ejs')
// cuando haga una peticion a la / entonces se llame mi router
// el router va a identificar si llaman a / o si llaman a /about

let puerto = 3030

app.listen(process.env.PORT || puerto, () => {
console.log ("servidor funcionando en puerto " + puerto)
})
//par poder trabahar con los datos que se envuan desde un formulario POST es necesario configurar el entorno de nuestra aplicacion para
//que sea capaz de capturar esa informacion
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const rutasMain = require ("./routes")
//no es necesario ponerle el index xq se llama index si se llamaria diferente se tiene q poner /main por ejemplo
app.use("/", rutasMain)

//una vez instalado el metodo method.override con npm install method-override --save hay que configurarlo de esta manera
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

//para que funcione el 404
app.use(function(req, res, next) {
 res.status(404).render("error404")})