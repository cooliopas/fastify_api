import fastify from 'fastify';
import { JSendWrapper } from '@untemps/jsend-wrapper'

declare module 'fastify' {
    export interface FastifyReply {
        jsend: (this: FastifyReply, statusCode: number, body: any, errorCode?: number | undefined, errorData?: string | undefined) => void
    }
}

export { }