const Ajv = require('ajv')

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: 'array', // This line
  allErrors: true
})

const fastifyValidatorHandler = (fastify) => {
  fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
    return ajv.compile(schema)
  })
}

export default fastifyValidatorHandler