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

import { test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

// Garantir que a aplicação esteja pronta antes dos testes
beforeAll(async () => {
  await app.ready();
});

// "Apagar" toda a aplicação após terminar o teste
afterAll(async () => {
  await app.close;
});

test("The user can create a new transaction", async () => {
  await request(app.server)
    .post("/transactions")
    .send({
      title: "Free-lancer",
      amount: 5000,
      type: "credit",
    })
    .expect(201);
});
