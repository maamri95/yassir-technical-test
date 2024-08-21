import { queryOptions } from '@tanstack/react-query';
import { container } from 'tsyringe';
import { GetReservationsRequest, GetResevationsUseCase } from '@yassir-test/reservation';

export type GetReservationsProps = GetReservationsRequest
export const GetReservationsQuery = (props?: GetReservationsProps) => {
  const useCase = container.resolve(GetResevationsUseCase);
  return queryOptions({
    queryKey: ['reservations', props],
    queryFn: async () => {
      return useCase.execute(props);
    },
    placeholderData: []
  })
}