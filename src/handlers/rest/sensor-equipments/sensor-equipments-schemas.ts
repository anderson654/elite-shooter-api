const sensorEquipmentsSchemas = () => ({
  create: {
    body: {
      type: 'object',
      required: ['code', 'placeId'],
      properties: {
        code: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        placeId: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    }
  }
})

export default sensorEquipmentsSchemas
