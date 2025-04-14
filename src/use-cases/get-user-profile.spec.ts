import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory.user.respository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { GetUserProfileUseCase } from "./get-user-profile.use-case";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "john doe",
      email: "johndoe@exemple.com",
      password_hash: await hash("123456", 6),
      created_at: new Date(),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("john doe");
  });

  it("should not be to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
