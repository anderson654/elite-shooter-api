// Require the framework and instantiate it
require('dotenv').config()
require('./infra/database/mongodb/connection')
const Ajv = require('ajv')
const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-cors'), {})
const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: 'array', // This line
  allErrors: true
})

fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})

fastify.setErrorHandler(function (err, request, reply) {
  if (err.name === 'NotAuthenticated') {
    reply.status(401).send({ code: 401, message: err.message })
  }

  if (err.name === 'ResourceAlreadyExists') {
    reply.status(409).send({ code: 409, message: err.message })
  }

  // Send error response
  reply.status(500).send({ code: 500, message: err.message })
})

const io = require('socket.io')(fastify.server, {

})
const makeRoutes = require('./infra/routes')

makeRoutes(fastify)

io.on('connection', function (socket) {
  console.log(socket.id)

  socket.on('shot', (arg) => {
    console.log(arg)
  })
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '192.168.18.68')
    // await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
