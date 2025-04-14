import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory.user.respository";
import { AuthenticatedUseCase } from "./authenticated.use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticatedUseCase;

describe("authenticated use case", () => {
  
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticatedUseCase(usersRepository);
  })

  it("should be able to authenticated", async () => {
    await usersRepository.create({
      name: "john doe",
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
      created_at: new Date()
    })

    const { user } = await sut.execute({
      email: "johndoe@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be to authenticated with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@exemple.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  
  it("should not be to authenticated with wrong password", async () => {

    await usersRepository.create({
      name: "john doe",
      email: 'johndoe@exemple.com',
      password_hash: await hash('123456', 6),
      created_at: new Date()
    })

    await expect(() =>
      sut.execute({
        email: "johndoe@exemple.com",
        password: "000000",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
