import "reflect-metadata";
import { beforeAll, describe } from 'vitest';
import { container } from 'tsyringe';
import { ReservationApiToReservationTransformer } from './reservation-api-to-reservation.transformer';

describe("ReservationApiToReservationTransformer", () => {
    let reservationApiToReservationTransformer: ReservationApiToReservationTransformer;
    beforeAll(() => {
        reservationApiToReservationTransformer = container.resolve(ReservationApiToReservationTransformer);
    });

    it('should use case exist', () => {
        expect(reservationApiToReservationTransformer).toBeDefined();
    });

    it('should transform correctly data', () => {
        // Given
        const data = {
            id: 1,
            businessDate: "06.08.2018",
            status: "CHECKED OUT",
            shift: "BREAKFAST",
            start: "2018-08-06T08:00:00Z",
            end: "2018-08-06T09:00:00Z",
            quantity: 1,
            customer: {
                firstName: "Yuri",
                lastName: "Burchell"
            },
            area: "BAR",
            guestNotes: "Likes the blue cheese burguer"
        };
        // When
        const result = reservationApiToReservationTransformer.transform(data);

        // Then
        const expectedResult = {
            id: 1,
            businessDate: "06.08.2018",
            status: "checked out",
            shift: "breakfast",
            start: new Date("2018-08-06T08:00:00Z"),
            end: new Date("2018-08-06T09:00:00Z"),
            quantity: 1,
            customer: {
                firstName: "Yuri",
                lastName: "Burchell"
            },
            area: "bar",
            guestNotes: "Likes the blue cheese burguer"
        }
        expect(result).toEqual(expectedResult);
    });
});