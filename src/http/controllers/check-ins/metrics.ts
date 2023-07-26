import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeGetUserMetricsService } from "../factories/make-get-user-metrics-service";

export async function metricsCheckIns(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const metricsCheckInsService = makeGetUserMetricsService();

  const { checkInsCount } = await metricsCheckInsService.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    checkInsCount,
  });
}
