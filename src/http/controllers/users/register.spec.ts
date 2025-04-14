import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";

describe("register e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Deletar o usuário antes do teste
    await prisma.user.deleteMany({
      where: {
        email: "johndoef.4@exemple.com",
      },
    });
  });

  it("should be able to register.", async () => {
    const response = await request(app.server).post("/users").send({
      name: "john doe",
      email: "johndoef.4@exemple.com",
      password: "00010",
    });

    expect(response.statusCode).toEqual(201);
  });
});
