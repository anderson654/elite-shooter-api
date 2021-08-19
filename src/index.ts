import * as dotenv from 'dotenv'
dotenv.config()

import './infra/database/mongodb/connection'

import fastify from 'fastify'
import { Server, Socket } from "socket.io";
import fastifyValidatorHandler from './handlers/fastify/fastify-validator-handler'
import fastifyErrorHandler from './handlers/fastify/fastify-error-handler'
import fastifyCors from 'fastify-cors';
import makeRoutes from './infra/routes';

const app = fastify({ logger: true })


app.register(fastifyCors, {})

fastifyValidatorHandler(app)
fastifyErrorHandler(app)

const io = new Server(app.server, {});

// const io = require('socket.io')(fastify.server, {})
makeRoutes(app, io)

// Run the server!
const start = async () => {
  try {
    // await app.listen(3000, '192.168.18.71')
    await app.listen(3000)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
