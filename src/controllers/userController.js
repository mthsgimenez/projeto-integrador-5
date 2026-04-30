const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    res.json(user);
  } catch (err) {
    res.status(401).json({ erro: err.message });
  }
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
};

const updateConfigs = async (req, res) => {
  const user = await userService.updateConfigs(req.params.id, req.body);
  res.json(user);
};

const addTexto = async (req, res) => {
  const textos = await userService.addTexto(req.params.id, req.body);
  res.json(textos);
};

const getTextos = async (req, res) => {
  const textos = await userService.getTextos(req.params.id);
  res.json(textos);
};

const updateTexto = async (req, res) => {
  try {
    const texto = await userService.updateTexto(
      req.params.userId,
      req.params.textoId,
      req.body
    );
    res.json(texto);
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
};

const deleteTexto = async (req, res) => {
  try {
    await userService.deleteTexto(
      req.params.userId,
      req.params.textoId
    );
    res.json({ message: "Texto removido" });
  } catch (err) {
    res.status(404).json({ erro: err.message });
  }
};

module.exports = {
  createUser,
  login,
  getUser,
  updateConfigs,
  addTexto,
  getTextos,
  updateTexto,
  deleteTexto
};