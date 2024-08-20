import {InferSetType} from "../../../util/types.ts";

export const reservationShifts = new Set(["breakfast", "lunch", "dinner"] as const)
export type ReservationShift = InferSetType<typeof reservationShifts>