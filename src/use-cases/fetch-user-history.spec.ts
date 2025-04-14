import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory.checkin.repository";
import { FetchUserHistoryUseCaseUseCase } from "./fetch-user-history.use-case";

let checkinRepository: InMemoryCheckInRepository;
let sut: FetchUserHistoryUseCaseUseCase;

describe("fetch user history check-in use case", () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckInRepository();
    sut = new FetchUserHistoryUseCaseUseCase(checkinRepository);
  });

  it("should be able to check in", async () => {
    
    await checkinRepository.create({
      gym_id: 'gym-110',
      user_id: "user-01"
    })
    
    await checkinRepository.create({
      gym_id: 'gym-112',
      user_id: "user-01"
    })

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-110' }),
      expect.objectContaining({ gym_id: 'gym-112' })
    ])
  });

  it("should be able to fetch check in history", async () => {

    for(let i = 1; i <= 22; i++) {
      await checkinRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01"
      })
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' })
    ])
  })
});
