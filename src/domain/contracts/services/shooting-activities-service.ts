import { ShootingActivity } from "../entities/shooting-activity"
import { Modality } from "../enums/modality"

export type CreateParams = {
  ownerId: string,
  modality: Modality,
  shootingRangeId: string,
  gunId: string,
  placeId: string
}

export type FindAllParams = any

export type FindByIdParams = {
  id: string,
}

export type CloseParams = {
  shootingActivityId: string,
}

export interface ShootingActivitiesService {
  findById: (params: FindByIdParams) => Promise<any | Error>
  findAll: (params: FindAllParams) => Promise<any | Error>
  create: (params: CreateParams) => Promise<ShootingActivity | Error>
  close: (params: CloseParams) => Promise<ShootingActivity | Error>
}
