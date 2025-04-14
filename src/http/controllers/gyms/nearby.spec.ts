import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";

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
        title: "SmartFit",
        description: "uma nova academia",
        phone: "00129931231",
        latitude: -12.707869,
        longetude: -38.2849455,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Lion Gym",
        description: "uma nova academia",
        phone: "4445555231",
        latitude: -12.6922098,
        longetude: -38.3344869,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -12.707869,
        longetude: -38.2849455
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "SmartFit",
      }),
    ]);
  });
});
