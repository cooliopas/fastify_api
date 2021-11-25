import Fastify, { FastifyInstance, FastifyReply } from 'fastify'
import { JSENDSuccessSchema } from 'typebox_schemas/lib/schemas/JSENDResponse'
import { HealthcheckSuccessSchema } from './schemas/HealthcheckResponseSuccess'

const fastify: FastifyInstance = Fastify()

fastify.route({
    method: 'GET',
    url: '/healthcheck',
    schema: {
        response: {
            200: JSENDSuccessSchema(HealthcheckSuccessSchema),
        },
    },
    handler: async (_, reply: FastifyReply) => {
        return reply
            .code(200)
            .send({
                status: 'success',
                data: {
                    timestamp: new Date().toISOString()
                }
            })
    }
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        process.exit(1)
    }
}

start()