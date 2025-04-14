import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";

describe("authenticated e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticated.", async () => {
    await request(app.server).post("/users").send({
      name: "john doe 2",
      email: `johndoeef4@gmail.com`,
      password: "00010",
    });

    const response = await request(app.server).post("/sessions").send({
      email: `johndoeef4@gmail.com`,
      password: "00010",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
