import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";
import { prisma } from "../../../lib/prisma";

describe("Search Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.checkIn.deleteMany();
    await prisma.gym.deleteMany();    
  })

  it("should be able to search gym.", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ginásio Perto",
        description: "Um ginásio perto de você",
        phone: "00129931231",
        latitude: -12.707869,
        longetude: -38.2849455,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ginásio Longe",
        description: "Um ginásio bem longe",
        phone: "00129931232",
        latitude: -15.1515151, 
        longetude: -40.1098273, 
      });


    const response = await request(app.server)
    .get("/gyms/search")
    .query({
      q: "Ginásio",
      page: 1
    })
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Ginásio Perto",
      }),
    ]);
  });
});