const container = require('../../../ioc-container')
const handleAuthorization = require('../../middlewares/handle-authorization')
const controllerAdapter = require('../adapters/controller-adapter')

const makeRoutes = (fastify, io) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: controllerAdapter(container.resolve('indexController').index)
  })

  fastify.route({
    method: 'POST',
    url: '/auth/signin',
    onRequest: function (request, reply, done) {
      console.log('validation')
      done()
    },
    handler: controllerAdapter(container.resolve('authController').signin)
  })

  fastify.route({
    method: 'GET',
    url: '/demos',
    handler: controllerAdapter(container.resolve('demosController').create)
  })

  fastify.route({
    method: 'GET',
    url: '/shooting-activities',
    schema: container.resolve('shootingActivitiesSchemas').findAll,
    handler: controllerAdapter(container.resolve('shootingActivitiesController').findAll)
  })

  fastify.route({
    method: 'GET',
    url: '/shooting-activities/:id',
    schema: container.resolve('shootingActivitiesSchemas').findById,
    handler: controllerAdapter(container.resolve('shootingActivitiesController').findById)
  })

  fastify.route({
    method: 'POST',
    url: '/shooting-activities',
    handler: controllerAdapter(container.resolve('shootingActivitiesController').create)
  })

  fastify.route({
    method: 'GET',
    url: '/sensor-equipments',
    // schema: container.resolve('sensorEquipmentsSchemas').create,
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    handler: controllerAdapter(container.resolve('sensorEquipmentsController').findAll)
  })

  fastify.route({
    method: 'POST',
    url: '/sensor-equipments',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    schema: container.resolve('sensorEquipmentsSchemas').create,
    handler: controllerAdapter(container.resolve('sensorEquipmentsController').create)
  })

  fastify.route({
    method: 'POST',
    url: '/users',
    handler: controllerAdapter(container.resolve('usersController').create)
  })

  fastify.route({
    method: 'GET',
    url: '/guns',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    handler: controllerAdapter(container.resolve('gunsController').findAll)
  })

  fastify.route({
    method: 'POST',
    url: '/guns',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    schema: container.resolve('gunsSchemas').create,
    handler: controllerAdapter(container.resolve('gunsController').create)
  })

  fastify.route({
    method: 'DELETE',
    url: '/guns/:id',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    // schema: container.resolve('gunsSchemas').delete,
    handler: controllerAdapter(container.resolve('gunsController').delete)
  })

  fastify.route({
    method: 'GET',
    url: '/places/:id',
    // schema: container.resolve('placesSchemas').create,
    handler: controllerAdapter(container.resolve('placesController').findById)
  })

  fastify.route({
    method: 'GET',
    url: '/places',
    // schema: container.resolve('placesSchemas').create,
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    handler: controllerAdapter(container.resolve('placesController').findAll)
  })

  fastify.route({
    method: 'POST',
    url: '/places',
    schema: container.resolve('placesSchemas').create,
    handler: controllerAdapter(container.resolve('placesController').create)
  })

  fastify.route({
    method: 'GET',
    url: '/shooting-ranges',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    handler: controllerAdapter(container.resolve('shootingRangesController').findAll)
  })

  fastify.route({
    method: 'GET',
    url: '/shooting-ranges/:id',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    handler: controllerAdapter(container.resolve('shootingRangesController').findById)
  })


  fastify.route({
    method: 'POST',
    url: '/shooting-ranges',
    onRequest: function (request, reply, done) {
      request.authPayload = handleAuthorization(request)
      done()
    },
    handler: controllerAdapter(container.resolve('shootingRangesController').create)
  })

  io.on('connection', container.resolve('socketIoHandlers').connection)


}

module.exports = makeRoutes
