import type {InferSetType} from "../utils/types";

export const reservationShiftApi = new Set(["BREAKFAST", "LUNCH", "DINNER"] as const);
export type ReservationShiftApi = InferSetType<typeof reservationShiftApi>;