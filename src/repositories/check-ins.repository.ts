import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findById(id: string): Promise<CheckIn | null>
  countByUser(userId: string): Promise<number>
}