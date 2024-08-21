import { GetReservationsRequest, Reservation } from '@yassir-test/reservation';
import { useQuery } from '@tanstack/react-query';
import { GetReservationsQuery } from '../queries/reservations.query';

export interface UseReservationsViewModelReturn {
  data: Reservation[];
  isFetching: boolean;
}
export type UseReservationsViewModelProps = GetReservationsRequest
export type UseReservationsViewModel = (props?: UseReservationsViewModelProps) => UseReservationsViewModelReturn;
export const useReservationsViewModel: UseReservationsViewModel = (props) => {
  const {data, isFetching} = useQuery(GetReservationsQuery(props));
  return {
    data: data ?? [],
    isFetching: isFetching
  }
}