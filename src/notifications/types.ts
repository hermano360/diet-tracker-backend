export enum VERIFICATION_STATUS {
  "UNVERIFIED" = "UNVERIFIED",
  "VERIFIED" = "VERIFIED",
  "PRIVATE" = "PRIVATE",
}

export type UserNotification = {
  myFitnessPal: string;
  allowNotifications: boolean;
  alertTime: string;
  verificationStatus: "UNVERIFIED" | "VERIFIED" | "PRIVATE";
};
