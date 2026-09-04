import type { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { randomUUID } from "node:crypto";
import { knexDb } from "../database.js";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js";

// Definição do plugin presente no fastify, o que nos premite criar a rota aqui e utilizar em nosso app
export async function transactionRoutes(app: FastifyInstance) {
  // ------------------------------------------------------------------------------------------------
  // Verbos HTTP: GET, POST, PUT, PATCH, DELETE

  /* 
  Os Cookies sáo como nós podemos armazenar uma forma de identificar quem é o nosso
  user sem a necessidade de um login, apenas com informações como um ID único para 
  aquele usuário. 
  */
  // ------------------------------------------------------------------------------------------------

  /* 
  Para a criação de rotas com fastify fazemos o seguinte:
  - Passamos o verbo em formato de função, 
  - Passamos o primeiro parâmetro como o destino da rota 
  - E passamos o segundo parâmetro como um callback com nosso retorno (o que deve ocorrer). 

  update: adicionamos agora um objeto com uma nova configuração que é o nosso middleware,
  ele está fazendo a verificação de sessionId antes de prosseguir com toda a função, e no 
  fastify para fazermos isso usamos o PreHandler.
  */
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { session_id } = request.cookies;

      const transaction = await knexDb("transaction")
        .where("session_id", session_id)
        .select();

      return { transaction };
    },
  );

  /* 
    Para relembrarmos, aqui estou fazendo o seguinte:
    - Tipando nosso ID com ZOD
    - Parseando (transformando em um objeto estruturado) nossos parametros, exepecifico o ID
    - Fazendo a consulta no banco onde tenha apenas esse ID (o .first garante que ele seja o único e primeiro) 
    */
  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const { session_id } = request.cookies;

      const transaction = await knexDb("transaction")
        .where({
          session_id,
          id,
        })
        .first();

      return {
        transaction,
      };
    },
  );

  /* 
  Aqui apenas criamos a rota que retornará uma soma de todas as transações,
  mas ago interessante são as definições de .first que ao Knex entender que o 
  retorno será um só ele remove a obrigatoriedade de ser um array, e também
  definimos um nome especifico a coluna
  */
  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { session_id } = request.cookies;

      const summary = await knexDb("transaction")
        .where("session_id", session_id)
        .sum("amount", { as: "amount" })
        .first();

      return {
        summary,
      };
    },
  );

  app.post(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const createTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(["credit", "debit"]),
      });

      const { title, amount, type } = createTransactionBodySchema.parse(
        request.body,
      );

      /* 
    Aqui temos a definição do nosso cookie utilizando o proprio modulo do fastify 
    sobre cookies, e ele segue a seguinte ordem:
    - Primeiro uma variável que pode ser alterada com os meta dados de cookie do browser
    - Depois uma validação se o user já possuí ou não um sessionId (caso não ele cria via randomUUID)
    - E por fim mandamos essa informação junto ao nosso post
    */
      let session_id = request.cookies.session_id;

      if (!session_id) {
        session_id = randomUUID();

        reply.cookie("session_id", session_id, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }

      await knexDb("transaction").insert({
        id: randomUUID(),
        title,
        amount: type == "credit" ? amount : amount * -1,
        session_id: session_id,
      });

      return reply.status(201).send();
    },
  );
}
