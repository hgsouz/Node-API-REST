import fastify from "fastify";
import cookie from "@fastify/cookie";
import { env } from "./env/index.js";
import { transactionRoutes } from "./routes/transaction.js";

const app = fastify();
// Aqui estamos definindo que nossa aplicação trabalhe com cookies e a ordem é importante que estja antes das nossas rotas.
app.register(cookie);

// Aqui estamos definindo que nossas rotas estáo acopladas a esse arquivo utilizando da tecnologia de pplugins do fastify
app.register(transactionRoutes, {
  prefix: "transactions",
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
