import type {InferSetType} from "../utils/types";

export const reservationAreaApi = new Set(["MAIN ROOM", "BAR"] as const);
export type ReservationAreaApi = InferSetType<typeof reservationAreaApi>;