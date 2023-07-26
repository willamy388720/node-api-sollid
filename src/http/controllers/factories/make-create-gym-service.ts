import { CreateGymService } from "../../../services/create-gym";
import { PrismaGymsRepository } from "../../../repositories/prisma/prisma-gyms-repository";

export function makeCreateGymService() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new CreateGymService(prismaGymsRepository);

  return service;
}
