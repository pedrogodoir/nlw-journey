import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { CLientError } from "../errors/client-errors";

export async function getParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId', {
    schema: {
      params: z.object({
        participantId: z.string().uuid()
      }),
    }
  }, async (request) => {
    const { participantId } = request.params

    const participant = await prisma.participant.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        is_confirmed: true,
      },
      where: { id: participantId },
    })

    if (!participant) {
      throw new CLientError("Participant not found")
    }

    return { participant }
  })
}