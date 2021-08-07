const sensorEquipmentsController = ({ sensorEquipmentsService }) => ({

  findAll: async (request) => {
    const result = await sensorEquipmentsService.findAll({})

    return {
      code: 200,
      body: result
    }
  },

  create: async (request) => {
    const { code, ownerId } = request.body
    const params = {
      code,
      owner: ownerId
    }

    const result = await sensorEquipmentsService.create(params)

    return {
      code: 200,
      body: result.value
    }
  }
})

module.exports = sensorEquipmentsController
