import fastify from "fastify";
import { env } from "./env/index.js";
import { transactionRoutes } from "./routes/transaction.js";

const app = fastify();

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
