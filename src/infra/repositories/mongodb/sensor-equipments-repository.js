const SensorEquipment = require('../../database/mongodb/models/sensor-equipments')

const sensorEquipmentsRepository = () => ({

  findAll: async (params) => (SensorEquipment.find(params).exec()),

  findOne: async (params) => (SensorEquipment.findOne(params).exec()),

  create: async (params) => ((new SensorEquipment(params)).save())

})

module.exports = sensorEquipmentsRepository
