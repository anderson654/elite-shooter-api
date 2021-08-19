const ResourceAlreadyExists = require('../errors/resource-already-exists-error')

const sensorEquipmentsService = ({ sensorEquipmentsRepository, sanitizer }) => ({

  findAll: async (params) => {
    return sensorEquipmentsRepository.findAll(params)
  },

  create: async (params) => {
    const sensorEquipmentAlreadyExists = await sensorEquipmentsRepository.findOne(params)

    if (sensorEquipmentAlreadyExists) {
      throw new ResourceAlreadyExists('The sensor already exists')
    }

    const sensorEquipment = await sensorEquipmentsRepository.create(params)

    return sensorEquipment
  }

})

export default sensorEquipmentsService
