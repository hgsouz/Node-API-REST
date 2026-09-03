// Esse aqrquivo tem como foco a definição e tipos para o projeto como um todo.
// por isso sua extensão é ".d.ts" o "d" vem de definição.

import { Knex } from "knex";

/* Aqui estamos seguindo a orientação da documentação do Knex para sua tipagem 
quando utilizado com TS, pois assim temos ctz apenas os campos certos estão
sendo chamados no metodo */
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
