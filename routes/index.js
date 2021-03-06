const express = require("express");
const MainController = require("../controllers/MainController");

const router = express.Router()

router.get("/", MainController.index)
router.get("/search", MainController.search)
router.get("/registro", MainController.registro)
router.post("/registro",MainController.guardarRegistro)
router.get("/editar/:id", MainController.editarid)



router.put("/editar/:id", MainController.editarput)


router.get("/usuarios", MainController.usuarios)



module.exports = router;
