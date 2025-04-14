import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeValidateCheckInUseCase } from "../../../use-cases/factories/make.validate-check-in.use-case";

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkIn: z.string().uuid(),
  });

  const { checkIn } = validateCheckInParamsSchema.parse(request.params);

  const validateUseCase = makeValidateCheckInUseCase();

  await validateUseCase.execute({
    checkInId: checkIn,
  });

  return reply.status(204).send();
}
