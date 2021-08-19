const gunsSchemas = () => ({
  create: {
    body: {
      type: 'object',
      required: ['brand', 'model', 'type'],
      properties: {
        brand: {
          type: 'string'
        },
        model: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    }
  }
})

export default gunsSchemas
