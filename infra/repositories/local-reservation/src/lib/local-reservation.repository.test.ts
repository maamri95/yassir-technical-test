import "reflect-metadata";
import { describe, it, expect, Mocked, beforeEach } from 'vitest';
import { container } from 'tsyringe';
import { Transformer } from '@yassir-test/transformer';
import { DateProvider } from '@yassir-test/date-provider';
import { reservationsMock } from './reservation.mock';
import { LocalReservationRepository } from './local-reservation.repository';
import { ReservationApiToReservationTransformer } from './tranformers/reservation-api-to-reservation.transformer';

describe('Get Reservations', () => {
  let reservationApiToReservationTransformer: Mocked<Transformer>;
  let dateProviderMock: Mocked<DateProvider>;
  let localReservationRepository: LocalReservationRepository;
  beforeEach(() => {
    reservationApiToReservationTransformer = {
      transform: vi.fn(),
    };
    dateProviderMock = {
      isSameDay: vi.fn(),
      format: vi.fn(),
    };
    container.register(ReservationApiToReservationTransformer.name, { useValue: reservationApiToReservationTransformer });
    container.register(DateProvider.name, { useValue: dateProviderMock });
    container.register('LocalReservationData', { useValue: reservationsMock  });
    container.register('LocalReservationTimeout', { useValue: 50 });
    localReservationRepository = container.resolve(LocalReservationRepository);
  });
    it('should use case exist', () => {
        expect(localReservationRepository).toBeDefined();
    });

    it('should have method getReservations', () => {
        expect(localReservationRepository.getReservations).toBeDefined();
    });

  it('should call transformer when getReservations called', async () => {
    await localReservationRepository.getReservations();
    expect(reservationApiToReservationTransformer.transform).toHaveBeenCalled();
  });

  it('should return array of reservations when getReservations called', async () => {
    const result = await localReservationRepository.getReservations();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(reservationsMock.reservations.length);
  });

  it("shouldn't call DateProvider if date option not provided", () => {
    localReservationRepository.getReservations();
    expect(dateProviderMock.isSameDay).not.toHaveBeenCalled();
  });
  describe('Filtering', () => {
    beforeEach(() => {
      container.register(ReservationApiToReservationTransformer.name, ReservationApiToReservationTransformer);
      localReservationRepository = container.resolve(LocalReservationRepository);
    });

    it('should call DateProvider if date option provided', async () => {
      await localReservationRepository.getReservations({ date: new Date() });
      expect(dateProviderMock.isSameDay).toHaveBeenCalled();
    });
  });
});