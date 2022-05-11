
const fs = require("fs");

const celulares = [
    {
        id: 1,
        nombre: 'Motorola Moto E6 Plus',
        precio: 14999
    },
    {
        id: 2,
        nombre: 'Motorola Moto G7',
        precio: 19999
    },
    {
        id: 3,
        nombre: 'Alcatel 5033A',
        precio: 6999
    },
    {
        id: 4,
        nombre: 'Samsung Galaxy A50',
        precio: 33499
    }
];


// aca hacemos una lista de los usuarios que se encuentran en el json con la lista de usuarios y se puede usar 
let usersJSON = fs.readFileSync("usuarios.json", { encoding: "utf-8" })
let users = JSON.parse(usersJSON)
console.log(users)

const MainController = {
    index: (req, res) => {

        res.render("index.ejs", { title: "lista de celulares", celulares: celulares })
    },
    celulares: (req, res) => {

        res.render("celulares.ejs", { title: "lista de celulares", celulares: celulares })
    },

    search: (req, res) => {
        let listadoPrecio = []
        let max = req.query.search
        celulares.forEach(celular => {
            if (celular.precio < max) {
                listadoPrecio.push(celular)
            }

        });

        res.render("search.ejs", { listadoPrecio: listadoPrecio, title: "titulo" })
    },

    registro: (req, res) => {

        res.render("registro", { title: "registro" })
    },

    guardarRegistro: (req, res) => {
        let usuario = {
            usuario: req.body.usuario,
            email: req.body.email,
            contraseña: req.body.password

        }
        // primero : leer que cosas ya habia por que si yo ya tenia usuarios registrados no quiero pisarlos
        //let archivoUsuario = fs.readFileSync("usuarios.json", { encoding: "utf-8" })
        // se hace asi pero lo comente por q ya esta leida mas arriba
        // definimos la variable usuarios antes del if para poder usarla
        let usuarios
        // el archivo usuarios.json puede estar vacio( este es el caso ) por eso hacemos un if para q arranque vacio el array
        if (usersJSON == "") {
            usuarios = []
        } else {
            // por el contrario, si el archivo ya tenia contenido lo descomprimimos pasandolo con json.parse a objeto literal para poder
            //manipularlo con JS
            usuarios = JSON.parse(usersJSON)
        }

        usuarios.push(usuario)

        // ahora ya tenemos el array con los usuarios pero es justamente un array entonces lo pasamos a json de nuevo
        usuariosJson = JSON.stringify(usuarios)
        // una vez terminado este proceso si lo podemos escribir y siempre reemplaza pero esta creando todo el tiempo
        // un array nuevo con lo que hicimos arriba entonces no hay problema con usar la funcion write
        fs.writeFileSync("usuarios.json", usuariosJson)

        res.redirect("/")
    },

    editarid: (req, res) => {

        let userEdit = celulares.find(celular => {
            return celular.id == req.params.id

        })
        res.render("editar", { userEdit: userEdit, title: "editar" })
    },

    editarput: (req, res) => {
        res.send("producto editado")
    },

    editarget: (req, res) => {
        res.send("probando get de editar")
    },

    usuarios: (req, res) => {
        let usersobjeto = users.find((usuario) => {
            console.log(usuario)
        })
        res.render("usuarios", { usersobjeto: usersobjeto, title: "usuarios" })
    }


}


module.exports = MainController;
