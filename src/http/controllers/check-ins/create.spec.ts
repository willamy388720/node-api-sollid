import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticate } from "@/utils/tests/create-and-authenticate";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticate(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Fico forte",
        latitude: -3.8282367,
        longitude: -38.5699798,
      },
    });
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -3.8282367,
        longitude: -38.5699798,
      });

    expect(response.statusCode).toEqual(201);
  });
});
