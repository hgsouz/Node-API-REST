/* 
Os middlewares são interceptadores que podem verificar alguma informação antes 
do retorno final. No nosso caso desejamos verificar se o user possuí uma sessioId
antes de seu retorno, para evitar a repetição de código nós utilizamos a técnica de 
middlewares, assim fazendo a verificação primeiro e caso não retorne erro ele pode 
passar tranquilo
*/

import type { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const session_id = request.cookies.session_id;

  if (!session_id) {
    return reply.status(401).send({
      error: "Unauthorized.",
    });
  }
}
