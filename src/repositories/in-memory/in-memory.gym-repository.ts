import { Gym, Prisma } from "@prisma/client";
import { GymsRepository, type FindManyNearbyParams } from "../gym-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "../../utils/distance-between-coordinate";

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longetude: new Prisma.Decimal(data.longetude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .splice((page - 1) * 20, page * 20);
  }

  async findManyNearBy(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longetude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longetude.toNumber(),
        }
      );

      return distance < 10
    });
  }
}
