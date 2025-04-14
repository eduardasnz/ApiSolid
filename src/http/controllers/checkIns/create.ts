import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "../../../use-cases/factories/make.check-in.use-case";

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longetude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { longetude, latitude } = createCheckInBodySchema.parse(request.body);
  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const checkInsUseCase = makeCheckInUseCase();

  await checkInsUseCase.execute({
    gymId,
    userLatidute: latitude,
    userLongetude: longetude,
    userId: request.user.sub,
  });

  return reply.status(201).send();
}
