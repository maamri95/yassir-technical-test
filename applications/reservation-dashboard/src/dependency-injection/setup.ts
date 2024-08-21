import { container } from 'tsyringe';
import { ReservationRepository } from '@yassir-test/reservation';
import {
  LocalReservationRepository,
  ReservationApiToReservationTransformer,
  reservationsMock
} from '@yassir-test/local-reservation';
import { DateProvider } from '@yassir-test/date-provider';
import { LuxonDateProvider } from '@yassir-test/luxon-date-provider';

export function dependencyInjectionSetup() {
  container.register('LocalReservationData', { useValue: reservationsMock });
  container.register('LocalReservationTimeout', { useValue: 500 });
  container.register(DateProvider.name, LuxonDateProvider);
  container.register(ReservationRepository.name, LocalReservationRepository);
  container.register(ReservationApiToReservationTransformer.name, ReservationApiToReservationTransformer);
}