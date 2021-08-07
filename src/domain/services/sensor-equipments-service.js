const S = require('sanctuary')

const sensorEquipmentsService = ({ sensorEquipmentsRepository, sanitizer }) => ({

  findAll: async (params) => {
    return sensorEquipmentsRepository.findAll(params)
  },

  create: async (params) => {
    const sensorEquipment = await sensorEquipmentsRepository.create(params)

    return S.Left(sensorEquipment.value)
  }

})

module.exports = sensorEquipmentsService
