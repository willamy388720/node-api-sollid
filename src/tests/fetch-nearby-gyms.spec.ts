import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsService } from "../services/fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe("Fetch Nearby Gyms Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -3.8282367,
      longitude: -38.5699798,
    });

    await gymsRepository.create({
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -4.4693783,
      longitude: -38.9481143,
    });

    const { gyms } = await sut.execute({
      userLatitude: -3.8282367,
      userLongitude: -38.5699798,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });
});
