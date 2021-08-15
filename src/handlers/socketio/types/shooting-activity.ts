import { Modality } from "@/domain/contracts/enums/modality";

export type ShootingActivityStartParams = {
  gunId: string;
  modality: Modality;
  placeId: string;
  shootingRangeId: string;
  ownerId: string;
}

export type ShootingActivityShotParams = {
  shootingRangeId: string;
  equipmentId: string;
  value: number
}

export type ShootingActivityEndParams = {
  shootingActivityId: string;
}