const shootingRangesController = ({ shootingRangesService }) => ({

  findById: async (request) => {
    const { id } = request.params

    const serviceParams = {
      _id: id
    }

    const result = await shootingRangesService.findById(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {
    const result = await shootingRangesService.findAll({})

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { code, type, placeId, ownerId } = request.body
    const params = {
      code,
      type,
      place: placeId,
      owner: ownerId
    }

    const result = await shootingRangesService.create(params)
    
    return {
      code: 200,
      body: result.value
    }
  }
})

module.exports = shootingRangesController
