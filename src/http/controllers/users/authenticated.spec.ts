import { describe, it, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../../../app";

describe("Authenticated e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticated user", async () => {
    await request(app.server).post("/users").send({
      name: "Olivia",
      email: "olivia1d@exemple.com",
      password: "101010",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "olivia1d@exemple.com",
      password: "101010",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
