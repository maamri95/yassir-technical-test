import {InferSetType} from "../../../util/types.ts";

export const reservationArea = new Set(["main room", "bar"] as const)
export type ReservationArea = InferSetType<typeof reservationArea>