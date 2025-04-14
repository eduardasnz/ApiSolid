import type { CheckInsRepository } from "../repositories/check-ins.repository";

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseReponse {
  checkInsCount: number
}

export class GetUserMetricsUseCaseUseCase {
  constructor(private checkinRepository: CheckInsRepository) {}

  async execute({
    userId
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseReponse> {
    const checkInsCount = await this.checkinRepository.countByUser(userId);
    
    return { checkInsCount }
  }
}
