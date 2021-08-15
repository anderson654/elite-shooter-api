require('dotenv').config()
require('./infra/database/mongodb/connection')

const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-cors'), {})
require('./handlers/fastify/fastify-validator-handler')(fastify)
require('./handlers/fastify/fastify-error-handler')(fastify)


const io = require('socket.io')(fastify.server, {})
require('./infra/routes')(fastify, io)

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '192.168.18.71')
    // await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
