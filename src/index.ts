import { JSendWrapper } from '@untemps/jsend-wrapper'
import Fastify, { FastifyInstance, FastifyReply } from 'fastify'
import fastifyAutoload from 'fastify-autoload'
import path from 'path'

const server: FastifyInstance = Fastify()

const jsend = new JSendWrapper()
server.decorateReply("jsend", function (this: FastifyReply, statusCode: number, body: any, errorCode?: number, errorData?: string) {
    this.status(statusCode).send(
        jsend.wrap(statusCode, body, errorCode, errorData)
    );
});

// routes
server.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes'),
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: function rewrite(folderParent, folderName) {
        if (folderName === 'protected') {
            return false
        }
        return folderName
    }
})

const start = async () => {
    try {
        await server.listen(3000, '0.0.0.0')
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()