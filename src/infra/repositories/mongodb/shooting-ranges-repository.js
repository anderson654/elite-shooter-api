const ShootingRange = require('../../database/mongodb/models/shooting-ranges')

const shootingRangesRepository = () => ({

  findAll: async (params) => ShootingRange.find(params).exec(),

  findOne: async (params) => ShootingRange.findOne(params).populate(['place', 'sensorEquipment', 'owner']).exec(),

  create: async (params) => (new ShootingRange(params)).save()

})

module.exports = shootingRangesRepository
