const controllerAdapter = (controller) => async (request, reply) => {
  const requiredBody = ['POST', 'PUT', 'PATCH']

  if (requiredBody.includes(request.method) && !request.body) {
    return reply.code(400).send('Request body is missing in the request')
  }

  const response = await controller(request)

  return reply.code(response.code).send(response.body)
}

module.exports = controllerAdapter
