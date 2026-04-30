# API Documentation — Leitor de Texto com Acessibilidade

Base URL:
http://localhost:3000/api

---

# 🧭 Visão Geral

Esta API gerencia usuários, textos e configurações de leitura para uma aplicação de acessibilidade.

- Prefixo obrigatório: `/api`
- Formato de resposta: JSON
- Autenticação: email + senha (sem JWT por enquanto)

---

# 👤 Usuários

## Criar usuário

### POST /users

Cria um novo usuário no sistema.

POST /api/users
Content-Type: application/json

### Body

{
  "email": "usuario@email.com",
  "senha": "123456",
  "nome": "Nome do Usuário"
}

### Resposta

{
  "_id": "userId",
  "email": "usuario@email.com",
  "nome": "Nome do Usuário",
  "configs": { },
  "textos": []
}

---

## Login

### POST /login

Autentica usuário por email e senha.

POST /api/login
Content-Type: application/json

### Body

{
  "email": "usuario@email.com",
  "senha": "123456"
}

### Resposta

{
  "_id": "userId",
  "email": "usuario@email.com",
  "nome": "Nome do Usuário"
}

---

## Buscar usuário

### GET /users/:id

GET /api/users/{userId}

### Resposta

{
  "_id": "userId",
  "email": "usuario@email.com",
  "nome": "Nome",
  "configs": { },
  "textos": []
}

---

## Atualizar configurações

### PUT /users/:id/configs

PUT /api/users/{userId}/configs
Content-Type: application/json

### Body

{
  "espacoLinha": 2,
  "espacoPalavra": 0.2,
  "tamanhoFonte": 18,
  "corFundo": "#000000",
  "corFonte": "#FFFFFF",
  "velocidadeVoz": 1.2,
  "nomeFonte": "Arial"
}

### Resposta

{
  "message": "configs atualizadas",
  "user": { }
}

---

## Deletar usuário

### DELETE /users/:id

DELETE /api/users/{userId}

---

# 📚 Textos

## Criar texto

### POST /users/:id/textos

POST /api/users/{userId}/textos
Content-Type: application/json

### Body

{
  "titulo": "Meu texto",
  "conteudo": "Conteúdo do texto"
}

---

## Listar textos

### GET /users/:id/textos

GET /api/users/{userId}/textos

---

## Atualizar texto

### PUT /users/:userId/textos/:textoId

PUT /api/users/{userId}/textos/{textoId}
Content-Type: application/json

### Body

{
  "titulo": "Título atualizado",
  "conteudo": "Novo conteúdo"
}

---

## Deletar texto

### DELETE /users/:userId/textos/:textoId

DELETE /api/users/{userId}/textos/{textoId}

---

# ⚙️ Regras da API

## Estrutura geral

Todas as respostas são JSON.

## Erros

{
  "erro": "mensagem de erro"
}

---

## Status codes

- 200 → sucesso
- 201 → criado
- 400 → erro de validação
- 401 → não autorizado
- 404 → não encontrado
- 500 → erro interno

---

## Regras de negócio

- Email deve ser único
- Textos pertencem exclusivamente ao usuário
- Ao deletar usuário, textos são removidos
- Sem limite de textos ou tamanho

---

# 🔐 Autenticação

- Email + senha
- Sem JWT
- Login retorna usuário

---

# 📌 Observações

- Prefixo obrigatório: /api
- Backend separado em camadas (routes, controllers, services, models)
- Configurações afetam apenas frontend
- Backend é responsável por persistência e autenticação

---

# 🚀 Futuro (não implementado)

- JWT
- Paginação
- Busca de textos
- Upload de arquivos