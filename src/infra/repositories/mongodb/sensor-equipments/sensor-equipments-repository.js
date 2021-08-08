const SensorEquipment = require('../../../database/mongodb/models/sensor-equipments')

const sensorEquipmentsRepository = ({ sensorEquipmentsSanitizer }) => ({

  findAll: async (params) => {
    const query = sensorEquipmentsSanitizer.findAll(params)
    return (SensorEquipment.find(query).exec())
  },

  findOne: async (params) => (SensorEquipment.findOne(params).exec()),

  create: async (params) => ((new SensorEquipment(params)).save())

})

module.exports = sensorEquipmentsRepository
