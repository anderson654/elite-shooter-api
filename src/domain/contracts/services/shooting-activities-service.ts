import { ShootingActivity } from "../entities/shooting-activity"
import { Modality } from "../enums/modality"

export namespace ShootingActivitiesService {
  export type CreateParams = {
    ownerId: string,
    modality: Modality,
    shootingRangeId: string,
    gunId: string,
    placeId: string,
  }
  
  export type FindAllParams = any
  
  export type FindByIdParams = {
    id: string,
  }
  
  export type CloseParams = {
    shootingActivityId: string,
  }  
}

export interface ShootingActivitiesService {
  findById: (params: ShootingActivitiesService.FindByIdParams) => Promise<any | Error>
  findAll: (params: ShootingActivitiesService.FindAllParams) => Promise<any | Error>
  create: (params: ShootingActivitiesService.CreateParams) => Promise<ShootingActivity | Error>
  close: (params: ShootingActivitiesService.CloseParams) => Promise<ShootingActivity | Error>
}
