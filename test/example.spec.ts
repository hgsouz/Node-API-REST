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

import { expect, test } from "vitest";

test("The user can create a new transaction", () => {
  // Here we're going to make a HTTP request to create a new transaction

  // Fazemos a validação que desejamos, que no caso é verificar se retorna um 201 (hard code de exemplo)
  const responseatusCode = 201;
  expect(responseatusCode).toEqual(201);
});
