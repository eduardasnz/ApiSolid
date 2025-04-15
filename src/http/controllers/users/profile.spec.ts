import { describe, it, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";

describe("Profile e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    
    const { token } = await createAndAuthenticateUser(app);

    const profile = await request(app.server)
    .get('/me')
    .set('Authorization', `Bearer ${token}`)
    .send();

    expect(profile.statusCode).toEqual(200);
    expect(profile.body.user).toMatchObject({
      email: 'johndoeef.2@gmail.com',
    });    
  });
});
