const fastifyErrorHandler = (fastify) => {
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
}

module.exports = fastifyErrorHandler