import { CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../repositories/check-ins.repository";
import type { GymsRepository } from "../repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "../utils/distance-between-coordinate";
import { MaxDistanceError } from "./errors/max-distance";
import { MaxCheckInsError } from "./errors/max-check-ins";

interface CheckInsRequest {
  userId: string;
  gymId: string;
  userLatidute: number;
  userLongetude: number;
}

interface CheckInsReponse {
  checkIn: CheckIn;
}

export class CheckInsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatidute,
    userLongetude,
  }: CheckInsRequest): Promise<CheckInsReponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    //calcular distancia entre o usuario e a academia
    const distante = getDistanceBetweenCoordinates(
      { latitude: userLatidute, longetude: userLongetude },
      { latitude: gym.latitude.toNumber(), longetude: gym.longetude.toNumber() }
    );

    const MAX_DISTANCE_IN_KM = 0.1;

    if (distante > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new MaxCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}

// TDD: red (faz bugar), green (faz funcionar)
