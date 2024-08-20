import { Reservation, ReservationRepository, ReservationsOptions } from '@yassir-test/reservation';
import {inject, injectable} from "tsyringe";
import {DateProvider} from "@yassir-test/date-provider";
import {ReservationsResponseApiDto} from "./dto/reservations-response-api.dto";
import { Transformer } from '@yassir-test/transformer';
import { ReservationApiDto } from './dto/reservation-api.dto';
@injectable()
export class LocalReservationRepository extends ReservationRepository{
    constructor(
        @inject(DateProvider.name) private readonly dateProvider: DateProvider,
        @inject(Transformer.name) private readonly reservationTransformer: Transformer<ReservationApiDto, Reservation>,
        @inject("LocalReservationData") private readonly apiReservations: ReservationsResponseApiDto,
    ) {
        super();
    }
    async getReservations(options?: ReservationsOptions): Promise<Reservation[]> {
        let response = this.apiReservations.reservations.map(reservation => this.reservationTransformer.transform(reservation));
        if (!options) {
            return response;
        }
        if (options.date) {
            response = this.filterByDate(response, options.date);
        }
        if (options.area) {
            response = this.filterByArea(response, options.area);
        }
        if (options.status) {
            response = this.filterByStatus(response, options.status);
        }
        if (options.shift) {
            response = this.filterByShift(response, options.shift);
        }
        if (options.firstName || options.lastName) {
            response = this.filterByNames(response, options.firstName, options.lastName);
        }
        return response;
    }

    private filterByDate(reservations: Reservation[], date: Date): Reservation[] {
        return reservations.filter(reservation => this.dateProvider.between(date, reservation.start, reservation.end));
    }

    private filterByStatus(reservations: Reservation[], status: string): Reservation[] {
        return reservations.filter(reservation => reservation.status === status);
    }

    private filterByArea(reservations: Reservation[], area: string): Reservation[] {
        return reservations.filter(reservation => reservation.area === area);
    }

    private filterByShift(reservations: Reservation[], shift: string): Reservation[] {
        return reservations.filter(reservation => reservation.shift === shift);
    }

    private filterByNames(reservations: Reservation[], firstName="", lastName=""): Reservation[] {
        return reservations.filter(reservation => reservation.customer.firstName.includes(firstName) || reservation.customer.lastName.includes(lastName));
    }
}