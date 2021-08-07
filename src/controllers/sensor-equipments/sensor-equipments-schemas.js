const sensorEquipmentsSchemas = () => ({
  create: {
    body: {
      type: 'object',
      required: ['code', 'ownerId'],
      properties: {
        code: {
          type: 'string'
        },
        ownerId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    }
  }
})

module.exports = sensorEquipmentsSchemas
