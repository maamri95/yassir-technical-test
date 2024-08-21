import {ReservationStatus} from "../entities/reservation-status";
import {ReservationShift} from "../entities/reservation-shift";
import {ReservationArea} from "../entities/reservation-area";
import { Reservation } from '../entities/reservation';

interface Request {
    date: Date
    status: ReservationStatus
    shift: ReservationShift
    area: ReservationArea,
    firstName: string
    lastName: string
    sort: ReservationSort
}
export type ReservationSort = `-${ReservationKeys}` | ReservationKeys
export type ReservationKeys = keyof Omit<Reservation, "customer"> | "firstName" | "lastName"
export type GetReservationsRequest = Partial<Request>