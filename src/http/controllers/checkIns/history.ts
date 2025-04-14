import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserHistoryUseCase } from "../../../use-cases/factories/make.fetch-user-history.use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const CheckInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = CheckInHistoryQuerySchema.parse(request.query);

  const historyCheckInUseCase = makeFetchUserHistoryUseCase();

  const { checkIns } = await historyCheckInUseCase.execute({
    page,
    userId: request.user.sub
  });

  return reply.status(200).send({ checkIns });
}
