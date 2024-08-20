import {InferSetType} from "../../../util/types.ts";

export const reservationStatus = new Set(["confirmed", "seated", "checked out", "not confirmed"] as const)
export type ReservationStatus = InferSetType<typeof reservationStatus>