import knex from "knex";
export const setupKnex = knex;

export const knexDb = setupKnex({
  client: "sqlite",
  connection: {
    filename: "./tmp/app.db",
  },
});
