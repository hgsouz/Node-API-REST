import { env } from "./env/index.js";
import { app } from "./app.js";

/* Aqui apenas estamos definindo a porta local que o projeto rodará e passando
    um console log quando estiver executando. */
app
  .listen({
    port: env.PORT,
    host: "0.0.0.0"
  })
  .then(() => {
    console.log("HTTP Server running");
  });
