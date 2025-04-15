import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymUseCase } from "../../../use-cases/factories/make.fetch-nearby-gym.use-case";

export async function NearbyGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const NearbyGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longetude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { longetude, latitude } = NearbyGymQuerySchema.parse(request.query);

  const nearbyUseCase = makeFetchNearbyGymUseCase();

  const { gyms } = await nearbyUseCase.execute({
    userLatitude: latitude,
    userLongetude: longetude,
  });

  return reply.status(200).send({
    gyms,
  });
}
