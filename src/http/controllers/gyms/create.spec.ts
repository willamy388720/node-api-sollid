import { app } from "@/app";
import { createAndAuthenticate } from "@/utils/tests/create-and-authenticate";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticate(app, true);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Fico forte",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
        phone: "11999999999",
        latitude: -3.8282367,
        longitude: -38.5699798,
      });

    expect(response.statusCode).toEqual(201);
  });
});
