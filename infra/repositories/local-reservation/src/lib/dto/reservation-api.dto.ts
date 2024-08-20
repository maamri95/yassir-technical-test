import {ReservationCustomerApiDto} from "./reservation-customer-api.dto.ts";
import {ReservationStatusApi} from "./reservation-status-api.ts";
import {ReservationShiftApi} from "./reservation-shift-api.ts";
import {ReservationAreaApi} from "./reservation-area-api.ts";

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