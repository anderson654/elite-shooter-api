const _ = require('lodash')

const gunsController = ({ gunsService }) => ({

  findAll: async (request) => {
    const { user } = request.authPayload
    const { placeId } = request.query

    const serviceParams = {
      place: placeId,
      owner: user.id
    }

    const result = await gunsService.findAll(serviceParams)

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { user } = request.authPayload
    const { placeId, brand, model, type, caliber, weight } = request.body

    if (user.role === 'admin') {
      if (!placeId) {
        return {
          code: 400,
          body: 'An admin user should send the place id to register a gun'
        }
      }
    }

    const serviceParams = _.pickBy({
      brand,
      model,
      type,
      caliber,
      weight,
      owner: user.id,
      place: placeId
    }, _.identity)

    const result = await gunsService.create(serviceParams)

    return {
      code: 201,
      body: result
    }
  },

  delete: async (request) => {
    const { user } = request.authPayload
    const { id } = request.params

    const serviceParams = {
      gunId: id,
      owner: user.id
    }

    const result = await gunsService.delete(serviceParams)

    return {
      code: 201,
      body: result
    }
  }

})

export default gunsController
