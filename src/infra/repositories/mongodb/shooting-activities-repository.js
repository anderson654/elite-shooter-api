const ShootingActivity = require('../../database/mongodb/models/shooting-activities')

const shootingActivitiesRepository = () => ({
  findAll: async ({
    filters = {},
    populate = [],
    limit = 100
  }) => ShootingActivity
    .find(filters)
    .populate(populate)
    .sort({ _id: 1 })
    .limit(limit)
    .lean({ virtuals: true })
    .exec(),

  findById: async (id) => ShootingActivity.findById(id).populate([]).lean().exec(),

  create: async (params) => ((new ShootingActivity(params)).save())

})

module.exports = shootingActivitiesRepository
