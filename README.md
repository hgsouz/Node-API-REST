<h1 align="center">💰 Node API REST — Transactions API</h1>

<p align="center">
  API REST para controle de transações financeiras (ganhos e gastos), com identificação de usuário via cookies para garantir que cada pessoa visualize apenas as próprias transações.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" />
  <img src="https://img.shields.io/badge/Knex.js-D26B38?style=for-the-badge&logo=knexdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
</p>

<p align="center">
  <a href="https://node-api-rest-r6gs.onrender.com"><img src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" /></a>
</p>

<p align="center">
  🌐 API em produção: <a href="https://node-api-rest-r6gs.onrender.com">https://node-api-rest-r6gs.onrender.com</a>
</p>

> ⚠️ O serviço está hospedado no plano gratuito do Render, então a **primeira requisição** depois de um período sem uso pode demorar ~30-60s para responder (o servidor "dorme" e precisa "acordar").

---

## 📖 Sobre o projeto

Esta API permite que um usuário registre transações financeiras — **crédito** (ganho) ou **débito** (gasto) — e depois consulte seu histórico e um resumo consolidado do saldo. A identificação do usuário acontece por meio de **cookies**, sem a necessidade de login/senha, garantindo que cada pessoa só tenha acesso às transações que ela mesma criou.

## 🧠 Requisitos funcionais

- [x] O usuário deve poder criar uma nova transação
- [x] O usuário deve poder obter um resumo (_summary_) da sua conta
- [x] O usuário deve poder listar todas as transações que já ocorreram
- [x] O usuário deve poder visualizar uma transação única

## 📐 Regras de negócio

- [x] A transação pode ser do tipo **crédito**, que soma ao valor total, ou **débito**, que subtrai
- [ ] Deve ser possível identificar o usuário entre as requisições (via cookie de sessão)
- [ ] O usuário só pode visualizar as transações que ele mesmo criou

## 🛠️ Tecnologias e bibliotecas

| Categoria                   | Ferramenta                                                   |
| --------------------------- | ------------------------------------------------------------ |
| Runtime                     | Node.js                                                      |
| Linguagem                   | TypeScript                                                   |
| Framework HTTP              | [Fastify](https://fastify.dev/)                              |
| Validação de dados          | [Zod](https://zod.dev/)                                      |
| Query Builder / Migrations  | [Knex.js](https://knexjs.org/)                               |
| Banco de dados              | SQLite (desenvolvimento) / PostgreSQL (produção)             |
| Sessão do usuário           | [@fastify/cookie](https://github.com/fastify/fastify-cookie) |
| Variáveis de ambiente       | dotenv                                                       |
| Build                       | tsup                                                         |
| Execução em desenvolvimento | tsx                                                          |
| Testes                      | Vitest + Supertest                                           |

## 📂 Estrutura do projeto

```
Node-API-REST/
├── db/
│   └── migrations/                    # Migrations do Knex (criação e alteração de tabelas)
├── src/
│   ├── @types/
│   │   └── knex.d.ts                  # Tipagem customizada das tabelas do Knex
│   ├── env/
│   │   └── index.ts                   # Validação e tipagem das variáveis de ambiente
│   ├── middlewares/
│   │   └── check-session-id-exists.ts # Middleware que valida o cookie de sessão
│   ├── routes/
│   │   └── transaction.ts             # Rotas de transações (criar, listar, buscar, resumo)
│   ├──
```
