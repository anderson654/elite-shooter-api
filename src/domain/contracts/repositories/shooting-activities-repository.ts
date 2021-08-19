export namespace ShootingActivitiesRepository {
  export type CreateParams = {
    modality: string,
    gun: string,
    place: string,
    shootingRange: string,
    owner: string,
  }
  
  export type UpdateByIdParams = {
    _id: string,
    object: any,
  }
}

export interface ShootingActivitiesRepository {
  findById: (id: string) => Promise<any>
  findOne: (params: any) => Promise<any>
  findAll: (params: any) => Promise<any>
  create: (params: ShootingActivitiesRepository.CreateParams) => Promise<any>
  updateById: (params: ShootingActivitiesRepository.UpdateByIdParams) => Promise<any>
}

