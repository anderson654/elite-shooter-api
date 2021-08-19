import { ShootingActivitiesRepository } from "@/domain/contracts/repositories/shooting-activities-repository";
import { ShootingActivitiesService } from "@/domain/contracts/services/shooting-activities-service";

export const createServiceToCreateRepository = (params: ShootingActivitiesService.CreateParams): ShootingActivitiesRepository.CreateParams => ({
  gun: params.gunId,
  modality: params.modality,
  place: params.placeId,
  owner: params.ownerId,
  shootingRange: params.shootingRangeId
});
