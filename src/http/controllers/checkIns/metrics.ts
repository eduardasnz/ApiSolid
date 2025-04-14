import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetrics } from "../../../use-cases/factories/make.get-metrics.use-case";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
 
  const MetricsCheckInUseCase = makeGetUserMetrics();

  const { checkInsCount } = await MetricsCheckInUseCase.execute({
    userId: request.user.sub
  });

  return reply.status(200).send({ checkInsCount });
}
