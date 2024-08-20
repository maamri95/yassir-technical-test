import {ReservationCustomer} from "./reservation-customer";
import {ReservationStatus} from "./reservation-status";
import {ReservationShift} from "./reservation-shift";
import {ReservationArea} from "./reservation-area";

export interface Reservation {
    id: number
    businessDate: string
    status: ReservationStatus
    shift: ReservationShift
    start: Date
    end: Date
    quantity: number
    customer: ReservationCustomer
    area: ReservationArea
    guestNotes: string
}