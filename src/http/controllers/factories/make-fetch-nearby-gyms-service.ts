import { FetchNearbyGymsService } from "../../../services/fetch-nearby-gyms";
import { PrismaGymsRepository } from "../../../repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsService() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new FetchNearbyGymsService(prismaGymsRepository);

  return service;
}
