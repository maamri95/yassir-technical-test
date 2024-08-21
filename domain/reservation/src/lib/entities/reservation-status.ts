import {InferSetType} from "../../utils/types";

export const reservationStatus = new Set(["confirmed", "seated", "checked out", "not confirmed"] as const)
export type ReservationStatus = InferSetType<typeof reservationStatus>