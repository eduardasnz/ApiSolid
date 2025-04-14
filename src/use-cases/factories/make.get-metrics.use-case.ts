import { PrismaCheckInRepository } from "../../repositories/prisma-repository/prisma-check-in.repository";
import { GetUserMetricsUseCaseUseCase } from "../get-metrics.use-case";

export function makeGetUserMetrics() {
  const gymRepository = new PrismaCheckInRepository();
  const useCase = new GetUserMetricsUseCaseUseCase(gymRepository);

  return useCase;
}
