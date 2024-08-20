import {Reservation} from "../entities/reservation";
import {ReservationsOptions} from "../entities/reservations-options";

export abstract class ReservationRepository {
    abstract getReservations(options: ReservationsOptions): Promise<Reservation[]>
}