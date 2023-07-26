import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryService } from "../factories/make-fetch-user-check-ins-history-service";

export async function historyCheckIns(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const historyCheckInsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyCheckInsSchema.parse(request.query);

  const historyCheckInsService = makeFetchUserCheckInsHistoryService();

  const { checkIns } = await historyCheckInsService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
