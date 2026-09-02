import type { FastifyInstance } from "fastify";
import { knexDb } from "../database.js";
import { z } from "zod";
import { title } from "node:process";
import knex from "knex";
import { id } from "zod/locales";
import { randomUUID } from "node:crypto";

// Definição do plugin presente no fastify, o que nos premite criar a rota aqui e utilizar em nosso app
export async function transactionRoutes(app: FastifyInstance) {
  // Verbos HTTP: GET, POST, PUT, PATCH, DELETE

  /* Para a criação de rotas com fastify passamos apenas o verbo em função, passando o primeiro 
    parâmetro como o destino e o segundo um callback com nosso retorno. */
  app.post("/", async (request, reply) => {
    const createTransactBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactBodySchema.parse(
      request.body,
    );

    const transaction = await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: type == "credit" ? amount : amount * -1,
    });

    return reply.status(201).send();
  });
}
