import {UseCase} from "@yassir-test/use-case";
import {GetReservationsRequest} from "../dto/get-reservations.request";
import {GetReservationsResponse} from "../dto/get-reservations.response";
import {inject, injectable} from "tsyringe";
import {ReservationRepository} from "../repositories/reservation.repository";

@injectable()
export class GetResevationsUseCase extends UseCase<GetReservationsResponse, GetReservationsRequest> {
    constructor(
        @inject(ReservationRepository.name) private readonly reservationRepository: ReservationRepository
    ) {
        super();
    }

    execute(request?: GetReservationsRequest): Promise<GetReservationsResponse> {
        return this.reservationRepository.getReservations(request);
    }
}