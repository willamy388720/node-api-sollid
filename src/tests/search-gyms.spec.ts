import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsService } from "../services/search-gyms";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Fetch User Check-in History Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
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
      latitude: -3.8282367,
      longitude: -38.5699798,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym - ${i}`,
        description: null,
        phone: null,
        latitude: -3.8282367,
        longitude: -38.5699798,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym - 21" }),
      expect.objectContaining({ title: "Javascript Gym - 22" }),
    ]);
  });
});
