const _ = require('lodash')

const sensorEquipmentsController = ({ sensorEquipmentsService }) => ({

  findAll: async (request) => {
    const { user } = request.authPayload
    const { assign, placeId } = request.query

    const serviceParams = _.pickBy({
      assign: assign && assign === 'true',
      place: placeId,
      owner: user.id
    }, _.identity)

    const result = await sensorEquipmentsService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { user } = request.authPayload
    const { code, type, placeId } = request.body

    const params = _.pickBy({
      code,
      type,
      place: placeId,
      owner: user.id
    }, _.identity)

    const result = await sensorEquipmentsService.create(params)

    return {
      code: 200,
      body: result
    }
  }
})

export default sensorEquipmentsController
