import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../../use-cases/errors/invalid-credentials";
import { makeAuthenticatedUseCase } from "../../../use-cases/factories/make.authenticated.use-case";

export async function AuthenticatedController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticatedBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const { email, password } = authenticatedBodySchema.parse(request.body);

  try {
    const authenticatedUseCase = makeAuthenticatedUseCase();

    const { user } = await authenticatedUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}