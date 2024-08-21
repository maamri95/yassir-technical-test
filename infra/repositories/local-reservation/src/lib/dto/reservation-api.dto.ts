import {ReservationCustomerApiDto} from "./reservation-customer-api.dto";
import {ReservationStatusApi} from "./reservation-status-api";
import {ReservationShiftApi} from "./reservation-shift-api";
import {ReservationAreaApi} from "./reservation-area-api";

export interface ReservationApiDto {
    id: number
    businessDate: string
    status: ReservationStatusApi
    shift: ReservationShiftApi
    start: string
    end: string
    quantity: number
    customer: ReservationCustomerApiDto
    area: ReservationAreaApi
    guestNotes: string
}