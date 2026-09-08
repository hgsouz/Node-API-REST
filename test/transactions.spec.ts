//==================================================================================================
/*
Testes automatizados são uma parte crucial do nosso projeto, pois são eles que
garantem uma melhor manutenção do código, além de garantir que todas as 
funcionalidades estejam de acordo com o solicitado, os principais testes são:
  - Unitário: Realiza o teste de uma funcionalidade única/especifica (como o teste de uma 
  função especifica que faz algo muito isolado do seu projeto); 
  - Integração: Comunicação entre duas ou mais unidades;
  - e2e (ponta a ponta): Simulam um usuário usando a aplicação
*/
//==================================================================================================

import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";
import { app } from "../src/app.js";

describe("transactions routes", () => {
  // Garantir que a aplicação esteja pronta antes dos testes
  beforeAll(async () => {
    await app.ready();
  });

  // "Apagar" toda a aplicação após terminar o teste
  afterAll(async () => {
    await app.close;
  });

  /* 
  Para testes é mandatório que seja feito tudo do 0, ou seja, uma nova aplicação 
  para cada teste, pensando nisso criamos um ambiente de testes e consequentemente
  um banco novo de teste, porém, nossas tabelas só são geradas após o comando migrate
  e para isso usamos a função execSync do node para rodar um comando de terminal antes
  de cada teste, assim garantindo que seja gerado um novo setup de banco a cada teste 
  */
  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("sould be able to create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  it("should be able to list all the transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("Cookie not defined");
    }

    // Aqui estamos fazendo um teste de listagem, e para isso criamos uma transação acima
    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    // Aqui estamos testando se está retornando o body que desejamos
    expect(listTransactionResponse.body.transaction).toEqual([
      expect.objectContaining({
        title: "New transaction",
        amount: 5000,
      }),
    ]);
  });

  it("should be able to get a specific transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("Cookie not defined");
    }

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionResponse.body.transaction[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "New transaction",
        amount: 5000,
      }),
    );
  });

  it("should be able to get the summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("Cookie not defined");
    }

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({
        title: "New transaction",
        amount: 2000,
        type: "debit",
      });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    });
  });
});
