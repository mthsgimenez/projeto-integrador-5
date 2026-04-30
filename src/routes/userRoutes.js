const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

// usuários
router.post("/users", controller.createUser);
router.post("/login", controller.login);
router.get("/users/:id", controller.getUser);
router.put("/users/:id/configs", controller.updateConfigs);

// textos
router.post("/users/:id/textos", controller.addTexto);
router.get("/users/:id/textos", controller.getTextos);
router.put("/users/:userId/textos/:textoId", controller.updateTexto);
router.delete("/users/:userId/textos/:textoId", controller.deleteTexto);

module.exports = router;