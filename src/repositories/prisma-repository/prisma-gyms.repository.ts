import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gym-repository";
import { prisma } from "../../lib/prisma";

export class PrismaGymRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async findManyNearBy(params: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms
    WHERE (
      6371 * acos(
        cos(radians(${params.latitude}::numeric)) * 
        cos(radians(latitude::numeric)) * 
        cos(radians(longetude::numeric) - radians(${params.longetude}::numeric)) + 
        sin(radians(${params.latitude}::numeric)) * 
        sin(radians(latitude::numeric))
      )
    ) <= 2
  `;
  return gyms;
}

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
}
