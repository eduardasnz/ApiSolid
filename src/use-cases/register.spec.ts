import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory.user.respository";
import { UserAlreadyExistError } from "./errors/user-already-exists";
import { RegisterUseCase } from "./register.use-case";
import { describe, expect, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("register use case", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  })

  it("should hash user password upon registration", async () => {
  
    const { user } = await sut.execute({
      name: "john doe",
      email: "johndoe@exemple.com",
      password: "123456",
    });

    const isPasswordCorretlyHash = await compare("123456", user.password_hash);

    expect(isPasswordCorretlyHash).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {

    const email = "johndoe@exemple.com";

    await sut.execute({
      name: "john doe",
      email: email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "john doe",
        email: email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  });

  it("should be able to register", async () => {

    const { user } = await sut.execute({
      name: "john doe",
      email: "johndoe@exemple.com",
      password: "123456",
    });

    const isPasswordCorretlyHash = await compare("123456", user.password_hash);

    expect(user.id).toEqual(expect.any(String));
  });
});
