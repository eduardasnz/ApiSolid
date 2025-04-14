import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins.repository";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startsOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startsOfTheDay.toDate(), // maior ou igual ao início do dia
          lte: endOfTheDay.toDate(), // maior ou igual ao final do dia
        },
      },
    });

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async countByUser(userId: string) {
    const checkIn = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return checkIn;
  }
}
