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

## 🔌 Endpoints

Todas as rotas ficam sob o prefixo `/transactions`.

| Método | Rota                    | Descrição                                         | Requer cookie?                    |
| ------ | ----------------------- | ------------------------------------------------- | --------------------------------- |
| `POST` | `/transactions`         | Cria uma nova transação (crédito ou débito)       | Não (cria o cookie na 1ª chamada) |
| `GET`  | `/transactions`         | Lista todas as transações do usuário              | Sim                               |
| `GET`  | `/transactions/:id`     | Retorna uma transação específica pelo ID          | Sim                               |
| `GET`  | `/transactions/summary` | Retorna o resumo (soma) das transações do usuário | Sim                               |

## 🧑‍💻 Exemplos de requisições (testando o deploy)

Você pode testar a API já em produção usando a URL abaixo, sem precisar rodar nada localmente:

```
https://node-api-rest-r6gs.onrender.com
```

Como a autenticação é feita por **cookie de sessão**, ao testar via `curl` é importante usar um "cookie jar" (`-c` para salvar o cookie recebido e `-b` para reenviá-lo), para que as requisições seguintes sejam reconhecidas como do mesmo usuário. Se estiver usando **Insomnia** ou **Postman**, basta manter os cookies habilitados (eles fazem isso automaticamente).

### 1. Criar uma transação (crédito)

```bash
curl -c cookies.txt -X POST https://node-api-rest-r6gs.onrender.com/transactions \
  -H "Content-Type: application/json" \
  -d '{"title": "Salário", "amount": 5000, "type": "credit"}'
```

### 2. Criar uma transação (débito)

```bash
curl -b cookies.txt -c cookies.txt -X POST https://node-api-rest-r6gs.onrender.com/transactions \
  -H "Content-Type: application/json" \
  -d '{"title": "Aluguel", "amount": 1500, "type": "debit"}'
```

### 3. Listar todas as transações

```bash
curl -b cookies.txt https://node-api-rest-r6gs.onrender.com/transactions
```

### 4. Buscar uma transação específica

Pegue o `id` retornado na listagem acima e substitua abaixo:

```bash
curl -b cookies.txt https://node-api-rest-r6gs.onrender.com/transactions/<id-da-transacao>
```

### 5. Obter o resumo (saldo)

```bash
curl -b cookies.txt https://node-api-rest-r6gs.onrender.com/transactions/summary
```

> 💡 O arquivo `cookies.txt` guarda o `session_id` gerado no primeiro `POST`. Sem reenviá-lo (`-b cookies.txt`), as rotas de leitura retornam `401 Unauthorized`, já que ninguém consegue ver transações sem se identificar.

## 🧪 Testes

Os testes automatizados cobrem os fluxos principais da API (criação, listagem, visualização única e resumo de transações), utilizando **Vitest** para execução e **Supertest** para as requisições HTTP.

```bash
npm test
```

---

<p align="center">Desenvolvido por <a href="https://github.com/hgsouz">Hugo Souza</a> junto à <a href="https://www.rocketseat.com.br">Rocketseat</a></p>
