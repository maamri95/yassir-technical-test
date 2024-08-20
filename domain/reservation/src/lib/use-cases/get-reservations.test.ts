import "reflect-metadata"
import {beforeAll, describe, Mocked, vi, it, expect} from "vitest";
import {container} from "tsyringe";
import {ReservationRepository} from "../repositories/reservation.repository";
import {GetResevationsUseCase} from "./get-resevations.use-case";

describe("Get Reservations", () => {
    let reservationRepositoryMock: Mocked<ReservationRepository>;
    let getResevationsUseCase: GetResevationsUseCase;
    beforeAll(() => {
        reservationRepositoryMock = {
            getReservations: vi.fn()
        }
        container.register(ReservationRepository.name, {useValue: reservationRepositoryMock});
        getResevationsUseCase = container.resolve(GetResevationsUseCase);
    });

    it('should use case exist', () => {
        expect(getResevationsUseCase).toBeDefined();
    });

    it('should call getReservations from repository', () => {
        // When
        getResevationsUseCase.execute();
        // Then
        expect(reservationRepositoryMock.getReservations).toHaveBeenCalled();
    });

    it('should call getReservations from repository with options', () => {
        // Given
        const date = new Date();
        // When
        getResevationsUseCase.execute({date: date});
        // Then
        expect(reservationRepositoryMock.getReservations).toHaveBeenCalledWith({date: date});
    });
});