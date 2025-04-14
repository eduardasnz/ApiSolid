import { PrismaCheckInRepository } from "../../repositories/prisma-repository/prisma-check-in.repository";
import { FetchUserHistoryUseCaseUseCase } from "../fetch-user-history.use-case";

export function makeFetchUserHistoryUseCase() {
  const userRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserHistoryUseCaseUseCase(userRepository);

  return useCase;
}
