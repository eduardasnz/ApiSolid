import { describe, it, expect, afterAll, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { prisma } from "../../../lib/prisma";

describe("Register e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await prisma.user.deleteMany({
      where: {
        email: "vanessa@exemple.com",
      },
    });
  });
  
  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "vanessa",
      email: "vanessa@exemple.com",
      password: "101010",
    });

    expect(response.statusCode).toEqual(201);
  });
});
