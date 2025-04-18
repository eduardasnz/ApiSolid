import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make.create-gym.use-case";

export async function CreateGymController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longetude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longetude } =
    createGymBodySchema.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({
    title,
    description,
    latitude,
    longetude,
    phone,
  });

  return reply.status(201).send();
}
