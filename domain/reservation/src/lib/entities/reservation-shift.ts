import {InferSetType} from "../../utils/types";

export const reservationShifts = new Set(["breakfast", "lunch", "dinner"] as const)
export type ReservationShift = InferSetType<typeof reservationShifts>