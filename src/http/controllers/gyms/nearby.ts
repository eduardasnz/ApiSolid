import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymUseCase } from "../../../use-cases/factories/make.fetch-nearby-gym.use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longetude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longetude } = nearbyGymsQuerySchema.parse(request.body);

  const nearByGymUseCase = makeFetchNearbyGymUseCase();

  const { gyms } = await nearByGymUseCase.execute({
    userLatidute: latitude,
    userLongetude: longetude
  });

  return reply.status(200).send({ gyms });
}
