import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";

describe("Create Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create gym.", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia NODEJS",
        description: "uma nova academia",
        phone: "00129931231",
        latitude: -12.707869,
        longetude: -38.3050427,
      });

    expect(response.statusCode).toEqual(201);
  });
});
