Repository: leitura-facil — Node.js + Express backend with a static frontend (public) and MongoDB persistence.

Quick commands
- Install deps: npm install
- Start server: npm run start (expects MONGO_URI in .env or environment)
- Tests: package.json contains only a placeholder `test` script (no test framework configured). No built-in lint/build scripts.
- API quick-run / examples: see api.http and api.md for example requests.

High-level architecture (big picture)
- Entry point: src/server.js (loads src/app.js and connects DB)
- App composition: src/app.js configures Express middleware, serves static frontend from ../public and mounts API routes under /api
- Layers (kept separate):
  - Routes: src/routes/* (userRoutes.js)
  - Controllers: src/controllers/* (userController.js) — thin HTTP adapters
  - Services: src/services/* (userService.js) — business logic and DB operations
  - Models: src/models/* (User.js) — Mongoose schemas; textos are subdocuments in User
  - Config: src/config/db.js — connects to MongoDB using process.env.MONGO_URI
- Frontend: plain HTML/CSS/JS in public/ served by Express in production/development
- API docs & examples: api.md (spec), api.http (httpie/REST client snippets)

Key conventions and patterns
- API prefix: all endpoints under /api (router mounted at app.use('/api', ...))
- Route naming: plural resources ("/users") and nested resource paths for textos (/users/:id/textos)
- Error responses: controllers return JSON { erro: "message" } and map service-thrown errors to HTTP statuses (e.g., 400, 401, 404)
- Authentication: email + senha (no JWT). Passwords stored as hashSenha (bcrypt). Login returns user document.
- Data model: User contains `configs` (embedded config object) and `textos` (array of Texto subdocuments). Changing model shape affects many service functions.
- Default configs: created in userService.createUser — services embed default UX settings (font, spacing, voice speed)
- Timestamps: User schema uses timestamps: true; Texto subdocs include ultimoAcesso
- DB connection: process.env.MONGO_URI must be set; connectDB is awaited before app.listen
- Code style: CommonJS modules (require/module.exports). Keep layering: controllers should not access models directly (use services).
- Frontend serving: static files in public/ — edit templates there for UI changes; backend assumes frontend will call /api endpoints.

Useful files to inspect when editing behavior
- src/routes/userRoutes.js — available endpoints
- src/controllers/userController.js — HTTP ↔ service mapping and status codes
- src/services/userService.js — where business rules and defaults live
- src/models/User.js — schema for users/textos/configs
- api.md / api.http — authoritative API examples and expected payloads
- context.md — general overview of the project objective

Notes for Copilot sessions
- Prefer making changes in services when behavior/business rules must change. Controllers mainly map HTTP errors/status codes.
- When modifying data model (e.g., moving textos out of User into separate collection), update all service functions that read/write user.textos and controllers that expose them.
- When making changes to endpoints and routes update api.md and api.http accordingly.

MCP servers
- No MCP servers

Summary
- Created Copilot guidance with commands, architecture overview, and project-specific conventions. Ask to expand coverage (tests, CI, or coding conventions) if needed.
