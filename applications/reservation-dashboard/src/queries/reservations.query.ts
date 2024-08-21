import { queryOptions } from '@tanstack/react-query';
import { container } from 'tsyringe';
import { GetReservationsRequest, GetResevationsUseCase } from '@yassir-test/reservation';
import { SearchParamsToRequest } from '../transformer/search-params-to-request';

export const GetReservationsQuery = (props?: string) => {
  const useCase = container.resolve(GetResevationsUseCase);
  const searchParamsToRequest = container.resolve(SearchParamsToRequest);
  return queryOptions({
    queryKey: ['reservations', props],
    queryFn: async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const request = searchParamsToRequest.transform(searchParams);
      return useCase.execute(request);
    },
    placeholderData: []
  })
}