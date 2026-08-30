import fastify from "fastify";
import { knexDb } from "./database.js";

const app = fastify();

// Verbos HTTP: GET, POST, PUT, PATCH, DELETE

/* Para a criação de rotas com fastify passamos apenas o verbo em função, passando o primeiro 
    parâmetro como o destino e o segundo um callback com nosso retorno. */
app.get("/hello", async () => {
  const tables = await knexDb("sqlite_schema").select("*");

  return tables;
});

/* Aqui apenas estamos definindo a porta local que o projeto rodará e passando
    um console log quando estiver executando. */
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server running");
  });
