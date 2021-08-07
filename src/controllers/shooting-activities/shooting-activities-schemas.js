const shootingActivitiesSchemas = () => ({

  findById: {
    params: {
      type: 'object',
      additionalProperties: false,
      required: ['id'],
      properties: {
        id: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$'
        }
      }
    }
  },

  findAll: {
    querystring: {
      owner: {
        type: 'string'
      },
      modality: {
        type: 'array'
      },
      year: {
        type: 'string'
      },
      month: {
        type: 'string'
      },
      populate: { type: 'array' },
      limit: {
        type: 'integer'
      }
    }
  }
})

module.exports = shootingActivitiesSchemas
