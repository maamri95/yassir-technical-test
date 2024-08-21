import type {InferSetType} from "../utils/types";

export const reservationStatusApi = new Set(["CONFIRMED", "SEATED", "CHECKED OUT", "NOT CONFIRMED"] as const);
export type ReservationStatusApi = InferSetType<typeof reservationStatusApi>;