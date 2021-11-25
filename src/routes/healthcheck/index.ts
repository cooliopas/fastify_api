import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { JSENDSuccessSchema } from 'typebox_schemas/lib/schemas/JSENDResponse';
import { HealthcheckSuccessSchema } from '../../schemas/HealthcheckResponseSuccess';

export default async function (fastify: FastifyInstance, opts: any) {

    fastify.get('/', {
        schema: {
            response: {
                200: JSENDSuccessSchema(HealthcheckSuccessSchema),
            },
        },
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            return reply.jsend(200, {
                timestamp: new Date().toISOString()
            })
        }
    });

}