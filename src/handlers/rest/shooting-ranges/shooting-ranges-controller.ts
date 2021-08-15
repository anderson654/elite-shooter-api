import _ from 'lodash'

const shootingRangesController = ({ shootingRangesService }) => ({

  findById: async (request) => {
    const { id } = request.params

    const serviceParams = {
      id
    }

    const result = await shootingRangesService.findById(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  findAll: async (request) => {
    const { user } = request.authPayload
    const { placeId } = request.query

    const serviceParams = _.pickBy({
      place: placeId,
      owner: user.id
    }, _.identity)

    const result = await shootingRangesService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { user } = request.authPayload
    const { code, type, sensorEquipmentId, placeId } = request.body

    const serviceParams = _.pickBy({
      code,
      type,
      sensorEquipment: sensorEquipmentId,
      place: placeId,
      owner: user.id
    }, _.identity)

    const result = await shootingRangesService.create(serviceParams)

    return {
      code: 200,
      body: result
    }
  }
})

module.exports = shootingRangesController
