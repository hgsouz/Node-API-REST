import { env } from "./env/index.js";
import knex, { type Knex } from "knex";
export const setupKnex = knex;

export const config: Knex.Config = {
  client: "sqlite",
  connection:
    env.DATABASE_CLIENT === "sqlite"
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knexDb = setupKnex(config);
