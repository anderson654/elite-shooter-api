require('dotenv').config()
require('./infra/database/mongodb/connection')
const _ = require('lodash')
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
const shootingActivitiesService = require('./domain/services/shooting-activities-service')

makeRoutes(fastify)

io.on('connection', function (socket) {
  // console.log(io)
  // console.log(socket.id)

  socket.on('shot', (arg) => {
    console.log(arg)
  })

  socket.on('dashboard:start', (shootingRanges) => {
    console.log('dashboard:start')

    if (shootingRanges && shootingRanges.length > 0) {
      shootingRanges.forEach(shootingRangeId => {
        socket.join(`${shootingRangeId}`)
      })
    }
  })

  socket.on('shootingActivity:start', async (shootingActivity) => {
    console.log('shootingActivity:start')

    await shootingActivitiesService.create()

    socket.shootingActivity = shootingActivity
    socket.join(`${shootingActivity.shootingRangeId}`)

    socket.to(`${shootingActivity.shootingRangeId}`).emit('shootingRange:active', { shootingRangeId: shootingActivity.shootingRangeId })
    console.log('server triggered shootingRange:active')
  })

  socket.on('shootingActivity:end', () => {
    console.log('shootingActivity:end')

    const shootingRangeId = _.get(socket, 'shootingActivity.shootingRangeId', false)

    if (shootingRangeId) {
      socket.to(`${shootingRangeId}`).emit('shootingActivity:end', { shootingRangeId: shootingRangeId })
    }
  })

  socket.on('shootingActivity:shot', (shotData) => {
    console.log('shootingActivity:shot')

    socket.to(`${shotData.shootingRangeId}`).emit('shootingActivity:shot:result', shotData)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
    const shootingRangeId = _.get(socket, 'shootingActivity.shootingRangeId', false)

    console.log(shootingRangeId)

    if (shootingRangeId) {
      console.log('emitting')
      socket.to(`${shootingRangeId}`).emit('socket:disconnect', { shootingRangeId: shootingRangeId })
    }
  })
})

// Criar um arquivo com o socket client e fazer os requests

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
