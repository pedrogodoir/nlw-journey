import cors from '@fastify/cors';
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmParticipants } from "./routes/confirm-participant";
import { confirmTrip } from "./routes/confirm-trip";
import { createActivities } from "./routes/create-activity";
import { createInvite } from './routes/create-invite';
import { createLink } from './routes/create-link';
import { createTrip } from "./routes/create-trip";
import { getActivities } from './routes/get-activities';
import { getLinks } from './routes/get-links';
import { getParticipants } from './routes/get-participants';
import { updateTrip } from './routes/update-trip';
import { getTripDetails } from './routes/get-trip-details';
import { getParticipant } from './routes/get-participant';
import { errorHandler } from './error-handler';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler)

app.register(cors, {
  origin: '*',
})

app.register(createTrip)
app.register(createActivities)
app.register(createLink)
app.register(createInvite)

app.register(updateTrip)

app.register(confirmParticipants)
app.register(confirmTrip)

app.register(getActivities)
app.register(getLinks)
app.register(getParticipants)
app.register(getParticipant)
app.register(getTripDetails)

app.listen({ port: 3333 }).then(() => {
  console.log("Server running!")
})