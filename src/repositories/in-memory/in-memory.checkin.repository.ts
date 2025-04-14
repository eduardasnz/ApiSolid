import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import { CheckInsRepository } from "../check-ins.repository";

export class InMemoryCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      is_validated: data.is_validated ? new Date(data.is_validated) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at).startOf("day");
      const targetDate = dayjs(date).startOf("day");
      const isOnSameDate = checkInDate.isSame(targetDate);

      return checkIn.user_id === userId && checkInDate.isSame(targetDate);
    });

    return checkOnSameDate || null;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .splice((page - 1) * 20, page * 20);
  }

  async countByUser(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length;
  }

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id);
    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkIndex = this.items.findIndex((item) => item.id === checkIn.id);

    if (checkIndex >= 0) {
      this.items[checkIndex] = checkIn;
    }

    return checkIn;
  }
}
