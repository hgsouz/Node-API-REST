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

import { it, beforeAll, afterAll, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { id } from "zod/locales";

describe("transactions routes", () => {
  // Garantir que a aplicação esteja pronta antes dos testes
  beforeAll(async () => {
    await app.ready();
  });

  // "Apagar" toda a aplicação após terminar o teste
  afterAll(async () => {
    await app.close;
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
});
