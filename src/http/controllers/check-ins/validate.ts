import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInService } from "../factories/make-check-in-service";
import { makeGetValidateCheckInsService } from "../factories/make-validate-check-ins-service";

export async function validateCheckIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInService = makeGetValidateCheckInsService();

  await validateCheckInService.execute({
    checkInId,
  });

  return reply.status(204).send();
}
