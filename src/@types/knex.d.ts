// Esse aqrquivo tem como foco a definição e tipos para o projeto como um todo.
// por isso sua extensão é ".d.ts" o "d" vem de definição.

import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    transaction: {
      id: string;
      title: string;
      amount: number;
      created_at: string;
      session_id?: string;
    };
  }
}
