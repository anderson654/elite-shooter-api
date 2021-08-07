const { cleanObject } = require('../../helper/object')

const placesController = ({ placesService }) => ({

  findById: async (request) => {
    // const { owner } = request.query
    const { id } = request.params

    // const params = cleanObject({ owner })

    const result = await placesService.findById({ id })

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {
    const { owner } = request.query

    const params = cleanObject({ owner })

    const result = await placesService.findAll(params)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { name, ownerId } = request.body
    const params = {
      name,
      owner: ownerId
    }

    const result = await placesService.create(params)

    return {
      code: 200,
      body: result.value
    }
  }
})

module.exports = placesController
