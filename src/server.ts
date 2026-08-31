import fastify from "fastify";
import crypto from "node:crypto";
import { knexDb } from "./database.js";
import { env } from "./env/index.js";

const app = fastify();

// Verbos HTTP: GET, POST, PUT, PATCH, DELETE

/* Para a criação de rotas com fastify passamos apenas o verbo em função, passando o primeiro 
    parâmetro como o destino e o segundo um callback com nosso retorno. */
app.get("/hello", async () => {
  const transaction = await knexDb("transaction")
    .insert({
      id: crypto.randomUUID(),
      title: "Transação de teste",
      amount: 1000,
    })
    .returning("*");

  return transaction;
});

/* Aqui apenas estamos definindo a porta local que o projeto rodará e passando
    um console log quando estiver executando. */
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("HTTP Server running");
  });
