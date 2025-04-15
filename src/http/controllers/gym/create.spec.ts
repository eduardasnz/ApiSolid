import { describe, it, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";

describe("Create Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it("should be able to create gym", async () => {
  
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
    .post("/gyms")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Academia Bad Bunny",
      description: "academia do teste create",
      phone: "8199282930",
      latitude: -12.707869,
      longetude: -38.3050427,
    });

    expect(response.statusCode).toEqual(201);
  });
});
