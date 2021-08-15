import { CreateShootingActivityParams } from "@/domain/contracts/repositories/shooting-activities-repository";
import { CreateParams } from "@/domain/contracts/services/shooting-activities-service";

export const createServiceToCreateRepository = (params: CreateParams): CreateShootingActivityParams => ({
  gun: params.gunId,
  modality: params.modality,
  place: params.placeId,
  owner: params.ownerId,
  shootingRange: params.shootingRangeId
});
