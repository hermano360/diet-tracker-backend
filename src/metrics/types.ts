export enum ACTIVITY_LEVEL_SCORE {
  MINIMAL = 1.2,
  LIGHT = 1.375,
  MODERATE = 1.55,
  HEAVY = 1.725,
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum STRATEGY {
  "WEIGHT_LOSS" = "WEIGHT_LOSS",
  "MUSCLE_GAIN" = "MUSCLE_GAIN",
  "HYBRID" = "HYBRID",
}

export type UserMetrics = {
  userId: string;
  weight: number;
  height: number;
  activityLevel: ACTIVITY_LEVEL_SCORE;
  gender: GENDER;
  strategy: STRATEGY;
};
