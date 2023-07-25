import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { CreateGymService } from "../services/create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Register Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      title: "Gym Cabras",
      description: null,
      phone: null,
      latitude: -3.8282367,
      longitude: -38.5699798,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
