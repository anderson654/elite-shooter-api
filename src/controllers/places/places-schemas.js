const placesSchemas = () => ({
  create: {
    body: {
      type: 'object',
      required: ['name', 'ownerId'],
      properties: {
        name: {
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

module.exports = placesSchemas
