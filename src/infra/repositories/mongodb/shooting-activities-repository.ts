import { CreateShootingActivityParams, ShootingActivitiesRepository, UpdateByIdParams } from "@/domain/contracts/repositories/shooting-activities-repository"

const ShootingActivity = require('../../database/mongodb/models/shooting-activities')

const shootingActivitiesRepository = (): ShootingActivitiesRepository => ({
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

  findById: async (id: string) => ShootingActivity.findById(id).populate([]).lean().exec(),

  create: async (params: CreateShootingActivityParams) => ((new ShootingActivity(params)).save()),

  findOne: async (params: any) => ShootingActivity.findOne(params).lean().exec(),

  updateById: async ({ _id, object }: UpdateByIdParams) => ShootingActivity.findByIdAndUpdate(_id, object).lean().exec(),

})

module.exports = shootingActivitiesRepository
