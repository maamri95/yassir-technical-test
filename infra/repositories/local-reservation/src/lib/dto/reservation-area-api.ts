import type {InferSetType} from "../../util/types";

export const reservationAreaApi = new Set(["MAIN ROOM", "BAR"] as const);
export type ReservationAreaApi = InferSetType<typeof reservationAreaApi>;