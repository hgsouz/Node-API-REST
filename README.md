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
| Banco de dados              | SQLite                                                       |
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
│   ├── app.ts                         # Instância e configuração do Fastify (plugins e rotas)
│   ├── database.ts                    # Configuração da conexão do Knex com o banco
│   └── server.ts                      # Ponto de entrada: sobe o servidor HTTP
├── test/                              # Testes automatizados (Vitest + Supertest)
├── knexfile.ts                        # Configuração de conexão e migrations do Knex
├── .env.example                       # Modelo de variáveis de ambiente
├── .env.test.example                  # Modelo de variáveis de ambiente para testes
└── package.json
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Um cliente HTTP para testar as rotas (Insomnia, Postman, etc.)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/hgsouz/Node-API-REST.git

# Acesse a pasta do projeto
cd Node-API-REST

# Instale as dependências
npm install

# Copie os arquivos de variáveis de ambiente
cp .env.example .env
cp .env.test.example .env.test

# Rode as migrations do banco de dados
npm run knex -- migrate:latest

# Inicie o servidor em modo desenvolvimento
npm run dev
```

## 📜 Scripts disponíveis

| Comando         | Descrição                                                            |
| --------------- | -------------------------------------------------------------------- |
| `npm run dev`   | Sobe o servidor em modo desenvolvimento com hot-reload (`tsx watch`) |
| `npm run knex`  | Executa comandos do Knex CLI (migrations, seeds, etc.)               |
| `npm run build` | Gera o build de produção com `tsup`                                  |
| `npm test`      | Executa a suíte de testes automatizados com Vitest                   |

## 🍪 Autenticação por cookies

Ao criar a primeira transação, a API gera um identificador de sessão (`sessionId`) e o envia como cookie na resposta. Esse cookie é reutilizado nas próximas requisições para:

- Vincular novas transações ao mesmo usuário;
- Filtrar listagens e resumos, garantindo que cada usuário veja **apenas** as próprias transações.

## 🧪 Testes

Os testes automatizados cobrem os fluxos principais da API (criação, listagem, visualização única e resumo de transações), utilizando **Vitest** para execução e **Supertest** para as requisições HTTP.

```bash
npm test
```

---

<p align="center">Desenvolvido por <a href="https://github.com/hgsouz">Hugo Souza</a></p>
