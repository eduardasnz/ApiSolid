import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";
import { prisma } from "../../../lib/prisma";

describe("Nearby Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gym.", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia do condominio",
        description: "uma nova academia",
        phone: "00129931231",
        latitude: -12.707869,
        longetude: -38.2849455,
      });

      console.log("Todas academias no banco:", await prisma.gym.findMany());

    const gym = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia longe do condominio",
        description: "uma nova academia",
        phone: "4445555231",
        latitude: -12.9999999,
        longetude:  -38.9999999
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -12.707869,
        longetude: -38.2849455,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

      console.log("Resposta da API:", response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia do condominio",
      }),
    ]);
    expect(response.body.gyms).toHaveLength(1);
  });
});