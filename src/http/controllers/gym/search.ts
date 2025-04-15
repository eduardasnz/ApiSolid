import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymUseCase } from "../../../use-cases/factories/make.search-gym.use-case";

export async function SearchGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const SearchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().default(1),
  });

  const { q, page } = SearchGymQuerySchema.parse(request.query);

  const searchGymUseCase = makeSearchGymUseCase();

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page
  });

  return reply.status(200).send({ gyms });
}
