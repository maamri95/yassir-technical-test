import {InferSetType} from "../../utils/types";

export const reservationArea = new Set(["main room", "bar"] as const)
export type ReservationArea = InferSetType<typeof reservationArea>