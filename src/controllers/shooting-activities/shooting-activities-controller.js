const { cleanObject } = require('../../helper/object')
const { fieldsValidator } = require('../../helper/object-validator')

const shootingActivitiesController = ({ shootingActivitiesService }) => ({

  findById: async (request) => {
    const { id } = request.params

    const serviceParams = {
      id,
      populate: ['gun', 'place', 'shootingRange']
    }

    const result = await shootingActivitiesService.findById(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {
    const {
      // owner,
      modality,
      year,
      month,
      populate = [],
      limit
    } = request.query

    const serviceParams = cleanObject({
      filters: {
        // owner,
        modality,
        year,
        month
      },
      populate,
      limit
    })

    const result = await shootingActivitiesService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { modality, shootingRangeId, ownerId, gunId, placeId } = request.body

    const params = {
      owner: ownerId,
      modality,
      shootingRange: shootingRangeId,
      gun: gunId,
      place: placeId
    }

    const result = await shootingActivitiesService.create(params)

    return {
      code: 200,
      body: result.value
    }
  }
})

module.exports = shootingActivitiesController
