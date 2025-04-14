import { PrismaGymRepository } from "../../repositories/prisma-repository/prisma-gyms.repository";
import { FetchSearchNearbyGymUseCaseUseCase } from "../fetch-nearby.use-case";

export function makeFetchNearbyGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  const useCase = new FetchSearchNearbyGymUseCaseUseCase(gymRepository);

  return useCase;
}
