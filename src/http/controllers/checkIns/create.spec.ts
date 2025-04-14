import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";
import { prisma } from "../../../lib/prisma";

describe("Create CheckIn e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create check in.", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'Academia do teste de checkIn',
        latitude: -12.707869,
        longetude: -38.3050427,
      }
    })

    const response = await request(app.server)
      .post(`/gyms/:${gym.id}/checkins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -12.707869,
        longetude: -38.3050427,
      });

    expect(response.statusCode).toEqual(201);
  });
});
