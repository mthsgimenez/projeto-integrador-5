const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

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
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ erro: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.userId || req.userId !== req.params.id) return res.status(403).json({ erro: 'Acesso negado' });
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const updateConfigs = async (req, res) => {
  try {
    if (!req.userId || req.userId !== req.params.id) return res.status(403).json({ erro: 'Acesso negado' });
    const user = await userService.updateConfigs(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const addTexto = async (req, res) => {
  try {
    if (!req.userId || req.userId !== req.params.id) return res.status(403).json({ erro: 'Acesso negado' });
    const textos = await userService.addTexto(req.params.id, req.body);
    res.json(textos);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const getTextos = async (req, res) => {
  try {
    if (!req.userId || req.userId !== req.params.id) return res.status(403).json({ erro: 'Acesso negado' });
    const textos = await userService.getTextos(req.params.id);
    res.json(textos);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

const updateTexto = async (req, res) => {
  try {
    if (!req.userId || req.userId !== req.params.userId) return res.status(403).json({ erro: 'Acesso negado' });
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
    if (!req.userId || req.userId !== req.params.userId) return res.status(403).json({ erro: 'Acesso negado' });
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