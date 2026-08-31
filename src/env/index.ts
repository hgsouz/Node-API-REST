// -----------------------------------------------------------------------------------------------
/* Aqui iremos utilizar a biblioteza ZOD para validar alguns dados para que nosso env nao quebre 
de forma alguma, ou entáo alguma informa;áo do front seja recebida com o parametro ou tipo errado.*/
// -----------------------------------------------------------------------------------------------

import "dotenv/config";
import { z } from "zod";

// Primeiramente criamos um schema para tipar as variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
});

/* Aqui estamos indicando ao ZOD que ele deve pegar as informações do "process.env"
e enviar para nosso schema, e assim de forma automatica ele fará uma validação */
const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
  console.log("Invalid enviroment variables.", _env.error.format());

  throw new Error("Invalid enviroment variables.");
}

export const env = _env.data;
