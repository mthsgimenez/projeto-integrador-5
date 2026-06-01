# Projeto Integrador 5

## Environment Variables

### Client (`import.meta.env.VITE_*`)

|     Variable    |          Description         |
|-----------------|------------------------------|
| `VITE_API_BASE` | Base URL for the backend API |

### Server (`process.env.*`)

|   Variable   |            Description           |
|--------------|----------------------------------|
|    `PORT`    | Server port                      |
|  `MONGO_URI` | MongoDB connection string        |
| `JWT_SECRET` | Secret key for JWT token signing |

### Notes

- Client env vars must be prefixed with `VITE_` to be exposed by Vite.
- Copy `client/.env.example` and `server/.env.example` (if available) to `.env` and fill in the values.

## Docker

### Pré-requisitos

- Docker e Docker Compose instalados

### Iniciar

```bash
docker compose up --build -d
```

Acessar em http://localhost:8080

### Parar

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```

### Variáveis de ambiente

Configuráveis via `.env` na raiz do projeto:

| Variável | Default | Descrição |
|---|---|---|
| `NGINX_PORT` | `8080` | Porta de acesso no host |
| `MONGO_DB` | `leitura` | Nome do banco MongoDB |
| `JWT_SECRET` | `dev_secret` | Chave secreta JWT |
| `VITE_API_BASE` | `/api` | Caminho da API (proxificado pelo nginx) |

Exemplo sobrescrevendo na linha de comando:

```bash
NGINX_PORT=9090 JWT_SECRET=minha_chave docker compose up --build -d
```

### Arquitetura

```
Navegador → :8080 → Nginx (client static files)
                      ├── /     → serve index.html
                      └── /api/ → proxy reverso → server:3000 → mongodb:27017
```