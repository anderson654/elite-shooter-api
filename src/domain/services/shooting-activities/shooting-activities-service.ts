import { ShootingActivity } from "@/domain/contracts/entities/shooting-activity"
import { ShootingActivitiesRepository } from "@/domain/contracts/repositories/shooting-activities-repository"
import { CloseParams, CreateParams, FindAllParams, FindByIdParams, ShootingActivitiesService } from "@/domain/contracts/services/shooting-activities-service"

import { createServiceToCreateRepository } from "./mappers/create-service-to-create-repository"

const shootingActivitiesService = ({
  shootingActivitiesRepository,
  sanitizer
}: {
  shootingActivitiesRepository: ShootingActivitiesRepository
  sanitizer: any
}): ShootingActivitiesService => ({

  findById: async ({ id }: FindByIdParams) => {
    const shootingActivity = await shootingActivitiesRepository.findById(id)

    const result = {
      ...shootingActivity,
      date: sanitizer.formatDate(shootingActivity.date, 'dd/MM/yyyy')
    }

    return result
  },

  findAll: async (params: FindAllParams) => {
    const shootingActivities = await shootingActivitiesRepository.findAll(params)

    const result = shootingActivities.map((shootingActivity: ShootingActivity) => ({
      ...shootingActivity,
      date: sanitizer.formatDate(shootingActivity.date, 'dd/MM/yyyy')
    }))

    return result
  },

  create: async (params: CreateParams): Promise<ShootingActivity | Error> => {
    const queryOpenShootingActivity = {
      owner: params.ownerId,
      isActive: 1
    }

    const userHaveAnOpenActivity = await shootingActivitiesRepository.findOne(queryOpenShootingActivity)

    if (userHaveAnOpenActivity) {
      throw new Error('It should close the open shooting activity before start another')
    }

    const createShootingActivity = createServiceToCreateRepository(params)
    
    return shootingActivitiesRepository.create(createShootingActivity)
  },

  close: async (params: CloseParams): Promise<ShootingActivity | Error> => {
    const closeShootingActivity = {
      _id: params.shootingActivityId,
      object: {
        isActive: 0
      }
    }

    return await shootingActivitiesRepository.updateById(closeShootingActivity)

  }

})

export default shootingActivitiesService
