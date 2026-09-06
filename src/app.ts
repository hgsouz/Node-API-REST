import fastify from "fastify";
import cookie from "@fastify/cookie";
import { transactionRoutes } from "./routes/transaction.js";

export const app = fastify();
// Aqui estamos definindo que nossa aplicação trabalhe com cookies e a ordem é importante que estja antes das nossas rotas.
app.register(cookie);

// Aqui estamos definindo que nossas rotas estáo acopladas a esse arquivo utilizando da tecnologia de pplugins do fastify
app.register(transactionRoutes, {
  prefix: "transactions",
});
