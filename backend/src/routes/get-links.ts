import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";
import { CLientError } from "../errors/client-errors";

export async function getLinks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links', {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
    }
  }, async (request) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { links: true }
    })

    if(!trip) {
      throw new CLientError("Trip not found")
    }

    return { links: trip.links }
  })
}