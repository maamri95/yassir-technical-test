import {ReservationStatus} from "../entities/reservation-status.ts";
import {ReservationShift} from "../entities/reservation-shift.ts";
import {ReservationArea} from "../entities/reservation-area.ts";

interface Request {
    date: Date
    status: ReservationStatus
    shift: ReservationShift
    area: ReservationArea,
    firstName: string
    lastName: string
}

export type GetReservationsRequest = Partial<Request>