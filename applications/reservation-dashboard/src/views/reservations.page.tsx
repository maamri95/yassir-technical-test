import { DataTable } from '../components/ui/data-table/data-table';
import { useReservationsViewModel } from '../view-models/reservations.view-model';
import { reservationColumns } from '../components/columns/reservation.columns';
import { DataTableSkeleton } from '../components/ui/data-table/data-table-skeleton';

export interface ReservationsProps {

}
export function Reservations(props: ReservationsProps) {
  const vm = useReservationsViewModel();
  if (vm.isFetching) {
    return <DataTableSkeleton columns={reservationColumns}/>
  }
  return (
    <DataTable columns={reservationColumns} data={vm.data}/>
  )
}