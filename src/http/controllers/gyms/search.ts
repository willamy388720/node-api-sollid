import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGymsService } from "../factories/make-search-gyms-service";

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsSchema.parse(request.query);

  const searchGymsService = makeSearchGymsService();

  const { gyms } = await searchGymsService.execute({
    query: q,
    page,
  });

  return reply.status(200).send({
    gyms,
  });
}
