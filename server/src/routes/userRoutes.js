const express = require("express");
const controller = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// usuários
router.post("/users", controller.createUser);
router.post("/login", controller.login);
router.get("/users/:id", auth, controller.getUser);
router.put("/users/:id/configs", auth, controller.updateConfigs);

// textos
router.post("/users/:id/textos", auth, controller.addTexto);
router.get("/users/:id/textos", auth, controller.getTextos);
router.put("/users/:userId/textos/:textoId", auth, controller.updateTexto);
router.delete("/users/:userId/textos/:textoId", auth, controller.deleteTexto);

module.exports = router;