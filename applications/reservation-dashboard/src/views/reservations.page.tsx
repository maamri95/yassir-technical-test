import { DataTable } from '../components/ui/data-table/data-table';
import { useReservationsViewModel } from '../view-models/reservations.view-model';
import { reservationColumns } from '../components/columns/reservation.columns';
import { DataTableSkeleton } from '../components/ui/data-table/data-table-skeleton';
import { ReservationFilter } from '../components/ui/filter/reservation-filter';
import { Button } from '../components/ui/button';

export function Reservations() {
  const vm = useReservationsViewModel();
  return (
    <div className="w-full mx-auto px-16">
      <div className="p-4 flex justify-end">
        {
          vm.hasTableState && <Button onClick={vm.onResetTableState} size="sm">Reset List</Button>
        }
      </div>
      {
        vm.isFetching ? <DataTableSkeleton columns={reservationColumns}/> :
          <DataTable
            columns={reservationColumns}
            data={vm.data}
            FilterComponent={ReservationFilter}
            onSortingChange={vm.onSortingChange}
            onColumnFiltersChange={vm.onColumnFiltersChange}
            tableState={vm.tableState}
            notifyChange={vm.notifyChange}
          />
      }
    </div>
  )
}