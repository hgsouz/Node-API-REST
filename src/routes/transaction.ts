import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { knexDb } from "../database.js";

// Definição do plugin presente no fastify, o que nos premite criar a rota aqui e utilizar em nosso app
export async function transactionRoutes(app: FastifyInstance) {
  // Verbos HTTP: GET, POST, PUT, PATCH, DELETE

  /* Para a criação de rotas com fastify passamos apenas o verbo em função, passando o primeiro 
    parâmetro como o destino e o segundo um callback com nosso retorno. */
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
