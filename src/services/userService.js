const bcrypt = require("bcrypt");
const User = require("../models/User");

//
// 👤 Criar usuário
//
const createUser = async ({ email, senha, nome }) => {
  const hashSenha = await bcrypt.hash(senha, 10);

  const user = new User({
    email,
    hashSenha,
    nome,
    configs: {
      espacoLinha: 1.5,
      espacoPalavra: 0.2,
      tamanhoFonte: 16,
      corFundo: "#FFFFFF",
      corFonte: "#000000",
      velocidadeVoz: 1,
      nomeFonte: "Arial"
    },
    textos: []
  });

  return user.save();
};

//
// 🔑 Login
//
const login = async ({ email, senha }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuário não encontrado");

  const match = await bcrypt.compare(senha, user.hashSenha);
  if (!match) throw new Error("Senha inválida");

  return user;
};

//
// 🔍 Buscar usuário
//
const getUserById = (id) => {
  return User.findById(id);
};

//
// ⚙️ Atualizar configs
//
const updateConfigs = (id, configs) => {
  return User.findByIdAndUpdate(
    id,
    { configs },
    { new: true }
  );
};

//
// 📚 Criar texto
//
const addTexto = async (userId, { titulo, conteudo }) => {
  const user = await User.findById(userId);

  user.textos.push({ titulo, conteudo });
  await user.save();

  return user.textos;
};

//
// 📄 Listar textos
//
const getTextos = async (userId) => {
  const user = await User.findById(userId);
  return user.textos;
};

//
// ✏️ Atualizar texto
//
const updateTexto = async (userId, textoId, data) => {
  const user = await User.findById(userId);
  const texto = user.textos.id(textoId);

  if (!texto) throw new Error("Texto não encontrado");

  texto.titulo = data.titulo ?? texto.titulo;
  texto.conteudo = data.conteudo ?? texto.conteudo;
  texto.ultimoAcesso = new Date();

  await user.save();
  return texto;
};

//
// ❌ Remover texto
//
const deleteTexto = async (userId, textoId) => {
  const user = await User.findById(userId);

  const texto = user.textos.id(textoId);
  if (!texto) throw new Error("Texto não encontrado");

  texto.remove();
  await user.save();
};

module.exports = {
  createUser,
  login,
  getUserById,
  updateConfigs,
  addTexto,
  getTextos,
  updateTexto,
  deleteTexto
};