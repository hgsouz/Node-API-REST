import type { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { randomUUID } from "node:crypto";
import { knexDb } from "../database.js";

// Definição do plugin presente no fastify, o que nos premite criar a rota aqui e utilizar em nosso app
export async function transactionRoutes(app: FastifyInstance) {
  // ------------------------------------------------------------------------------------------------
  // Verbos HTTP: GET, POST, PUT, PATCH, DELETE

  /* 
  Para a criação de rotas com fastify passamos apenas o verbo em função, passando o primeiro 
  parâmetro como o destino e o segundo um callback com nosso retorno. 
  */
  // ------------------------------------------------------------------------------------------------

  app.get("/", async () => {
    const transaction = await knexDb("transaction").select();

    return { transaction };
  });

  app.get("/:id", async (request) => {
    /* 
    Para relembrarmos, aqui estou fazendo o seguinte:
    - Tipando nosso ID com ZOD
    - Parseando (transformando em um objeto estruturado) nossos parametros, exepecifico o ID
    - Fazendo a consulta no banco onde tenha apenas esse ID (o .first garante que ele seja o único e primeiro) 
    */
    const getTransactionParamsSchema = z.object({
      id: string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knexDb("transaction").where("id", id).first();

    return {
      transaction,
    };
  });

  app.get("/summary", async () => {
    /* 
    Aqui apenas criamos a rota que retornará uma soma de todas as transações,
    mas ago interessante são as definições de .first que ao Knex entender que o 
    retorno será um só ele remove a obrigatoriedade de ser um array, e também
    definimos um nome especifico a coluna
     */
    const summary = await knexDb("transaction")
      .sum("amount", { as: "amount" })
      .first();

    return {
      summary,
    };
  });

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    await knexDb("transaction").insert({
      id: randomUUID(),
      title,
      amount: type == "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
