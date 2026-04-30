# Contexto do Projeto — Leitor de Texto com Acessibilidade

## 🧭 Visão Geral

Este projeto é uma aplicação web de leitura de texto com foco em acessibilidade.  
Seu objetivo principal é facilitar a leitura através de ferramentas e opções de apoio personalizáveis.

O sistema permite que diferentes usuários ajustem a forma como o texto é apresentado, combinando e ativando/desativando recursos conforme suas necessidades individuais.

---

## 🎯 Problema que resolve

A aplicação tem como objetivo reduzir barreiras de leitura, especialmente para pessoas com dificuldades como dislexia ou outras limitações relacionadas à leitura.

---

## 👥 Público-alvo

- Pessoas com dislexia  
- Pessoas com dificuldades de leitura  
- Usuários que necessitam de ajustes visuais e funcionais para leitura confortável  

---

## ✨ Diferenciais do sistema

- Alto nível de personalização
- Combinação flexível de opções de acessibilidade
- Possibilidade de ativar/desativar recursos individualmente
- Foco em experiência de leitura adaptativa

---

## 🔄 Fluxo principal do usuário

1. Carregar ou inserir um texto
2. Ajustar opções de acessibilidade no frontend
3. Ler o conteúdo com as configurações aplicadas

---

## 🧑‍💻 Funcionalidades principais

### Usuário autenticado
- Salvar textos carregados
- Salvar configurações de leitura

### Usuário não autenticado
- Usar todas as funcionalidades de leitura
- Não pode salvar dados

---

## 📚 Gestão de textos

- Atualmente os textos são inseridos via textarea no frontend
- Futuramente haverá suporte para upload de arquivos (PDF, Word etc.)
- Textos são privados por padrão
- Não há limite de quantidade de textos por usuário

### Funcionalidades desejadas:
- Busca de textos
- Ordenação (por data e nome)
- Sistema de favoritos (desejável)

---

## ⚙️ Configurações de acessibilidade

- O usuário pode ativar/desativar opções individualmente
- Não existe obrigatoriedade de configuração completa
- Existe um conjunto de valores padrão (ainda não definidos)

### Escopo das configurações:
- Apenas frontend (responsáveis pela apresentação do texto)
- Não afetam processamento no backend

### Estrutura:
- Cada usuário possui apenas um perfil de configurações

---

## 🔊 Leitura por voz

- O sistema utiliza API de voz no frontend
- O backend expõe uma API intermediária para facilitar troca futura da tecnologia de voz sem impacto no frontend
- São salvas preferências de:
  - Velocidade da fala
  - Voz selecionada

---

## 🔐 Autenticação

- Login baseado em email e senha
- Usuários não podem ter emails duplicados
- Redefinição de senha é suportada
- Não há verificação de email

### Comportamento:
- Usuário só precisa se autenticar para salvar dados
- Sem login → acesso completo sem persistência

---

## 🗄️ Modelo de dados

- Atualmente, textos estão armazenados como subdocumentos dentro do usuário
- Essa modelagem pode ser alterada futuramente, mas não é prioridade

### Regras:
- Sem versionamento de textos
- Sem histórico de edições

---

## ⚡ Regras de negócio

- Sem limite de tamanho de texto
- Sem limite de requisições
- Usuário pode excluir sua conta
- Ao excluir conta, todos os textos são removidos junto

---

## 🌐 Frontend

- Tecnologias: HTML, CSS e JavaScript puro
- Estrutura simples baseada em páginas
- Backend serve o frontend em produção e desenvolvimento

---

## 🚀 Escopo futuro

- Não há planos para:
  - IA
  - colaboração em tempo real
  - compartilhamento de textos

---

## 🧪 Nível do projeto

- Projeto acadêmico / estudo
- Baixa escala de usuários

---

## 🧱 Arquitetura do backend

O backend deve seguir uma arquitetura em camadas:

- Routes → definição de endpoints
- Controllers → camada HTTP
- Services → regras de negócio
- Models → esquema de dados

Essa separação deve ser mantida sempre.

---

## ⚙️ Tecnologias

- Node.js (JavaScript no backend)
- Express
- MongoDB (obrigatório)

Motivo:
- Familiaridade da equipe com JavaScript
- Obrigação acadêmica

---

## ⚠️ Restrições

- Deve usar MongoDB obrigatoriamente
- Não há necessidade de suporte offline
- Não precisa suportar múltiplos idiomas
- Idealmente deve ser acessível (WCAG recomendado)

---

## 📌 Observações importantes

- Configurações afetam apenas o frontend
- Backend serve principalmente como persistência e autenticação
- Arquitetura deve permanecer simples e modular