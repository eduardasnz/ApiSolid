import { type CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../repositories/check-ins.repository";

interface FetchUserHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserHistoryUseCaseReponse {
  checkIns: CheckIn[]
}

export class FetchUserHistoryUseCaseUseCase {
  constructor(private checkinRepository: CheckInsRepository) {}

  async execute({
    userId,
    page
  }: FetchUserHistoryUseCaseRequest): Promise<FetchUserHistoryUseCaseReponse> {
    const checkIns = await this.checkinRepository.findManyByUserId(userId, page);
    
    return { checkIns }
  }
}
