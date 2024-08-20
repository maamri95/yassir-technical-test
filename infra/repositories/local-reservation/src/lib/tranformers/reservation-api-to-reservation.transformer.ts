import {ReservationApiDto} from "../dto/reservation-api.dto";
import {Reservation, ReservationStatus, ReservationArea, ReservationShift} from "@yassir-test/reservation";
import {Transformer} from "@yassir-test/transformer";
import {ReservationStatusApi} from "../dto/reservation-status-api";
import {ReservationShiftApi} from "../dto/reservation-shift-api";
import {ReservationAreaApi} from "../dto/reservation-area-api";
import {injectable} from "tsyringe";
@injectable()
export class ReservationApiToReservationTransformer extends Transformer<ReservationApiDto, Reservation> {
    transform(from: ReservationApiDto): Reservation {
        return {
            id: from.id,
            businessDate: from.businessDate,
            status: this.transformStatus(from.status),
            shift: this.transformShift(from.shift),
            start: new Date(from.start),
            end: new Date(from.end),
            quantity: from.quantity,
            customer: {
                firstName: from.customer.firstName,
                lastName: from.customer.lastName,
            },
            area: this.transformArea(from.area),
            guestNotes: from.guestNotes,
        };
    }

    private transformStatus(status: ReservationStatusApi): ReservationStatus {
        return status.toLowerCase() as ReservationStatus;
    }

    private transformShift(shift: ReservationShiftApi): ReservationShift {
        return shift.toLowerCase() as ReservationShift;
    }

    private transformArea(area: ReservationAreaApi): ReservationArea {
        return area.toLowerCase() as ReservationArea;
    }
}