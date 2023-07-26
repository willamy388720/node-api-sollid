import { SearchGymsService } from "../../../services/search-gyms";
import { PrismaGymsRepository } from "../../../repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsService() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new SearchGymsService(prismaGymsRepository);

  return service;
}
