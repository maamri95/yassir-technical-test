import {
    Reservation,
    ReservationKeys,
    ReservationRepository,
    ReservationsOptions,
    ReservationSort
} from '@yassir-test/reservation';
import {inject, injectable} from "tsyringe";
import {DateProvider} from "@yassir-test/date-provider";
import {ReservationsResponseApiDto} from "./dto/reservations-response-api.dto";
import { Transformer } from '@yassir-test/transformer';
import { ReservationApiDto } from './dto/reservation-api.dto';
import { ReservationApiToReservationTransformer } from './tranformers/reservation-api-to-reservation.transformer';
@injectable()
export class LocalReservationRepository extends ReservationRepository{
    constructor(
        @inject(DateProvider.name) private readonly dateProvider: DateProvider,
        @inject(ReservationApiToReservationTransformer.name) private readonly reservationTransformer: Transformer<ReservationApiDto, Reservation>,
        @inject("LocalReservationData") private readonly apiReservations: ReservationsResponseApiDto,
        @inject("LocalReservationTimeout") private readonly timeout: number
    ) {
        super();
    }
    async getReservations(options?: ReservationsOptions): Promise<Reservation[]> {
        await new Promise(resolve => setTimeout(resolve, this.timeout));
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
        if (options.firstName) {
            response = this.filterByFirstName(response, options.firstName);
        }
        if (options.lastName) {
            response = this.filterByLastName(response, options.lastName);
        }
        if (options.sort) {
            response = this.sortReservations(response, options.sort);
        }
        return response;
    }

    private filterByDate(reservations: Reservation[], date: Date): Reservation[] {
        return reservations.filter(reservation => this.dateProvider.isSameDay(date, reservation.start));
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

    private filterByFirstName(reservations: Reservation[], firstName=""): Reservation[] {
        return reservations.filter(reservation => reservation
          .customer
          .firstName
          .trim()
          .toLowerCase()
          .includes(firstName.trim().toLowerCase())
        );
    }
    private filterByLastName(reservations: Reservation[], lastName=""): Reservation[] {
        return reservations.filter(reservation => reservation
          .customer
          .lastName
          .trim()
          .toLowerCase()
          .includes(lastName
            .trim()
            .toLowerCase()
          ));
    }

    private sortReservations(response: Reservation[], sort: ReservationSort) {
        const sortKey: ReservationKeys = sort.replace('-', '') as ReservationKeys;
        if (sortKey === 'firstName' || sortKey === 'lastName') {
            if (sort.startsWith('-')) {
                return response.sort((a, b) => a.customer[sortKey] > b.customer[sortKey] ? -1 : 1);
            }
            return response.sort((a, b) => a.customer[sortKey] > b.customer[sortKey] ? 1 : -1);
        }
        if (sort.startsWith('-')) {
            return response.sort((a, b) => a[sortKey] > b[sortKey] ? -1 : 1);
        }
        return response.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
    }
}