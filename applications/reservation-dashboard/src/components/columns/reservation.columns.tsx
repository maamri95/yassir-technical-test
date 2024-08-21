import { ColumnDef } from '@tanstack/react-table';
import { Reservation } from '@yassir-test/reservation';
import { WithHeader } from '../../hoc/with-header';
import { formatDate } from '../../utils/date';
import { StatusBadge } from '../ui/status-badge';
import { ShiftBadge } from '../ui/shift-badge';
import { AreaBadge } from '../ui/area-badge';

export const reservationColumns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "id",
    header: WithHeader("ID"),
  },
  {
    accessorKey: "customer.firstName",
    header: WithHeader("First Name"),
  },
  {
    accessorKey: "customer.lastName",
    header: WithHeader("Last Name"),
  },
  {
    accessorKey: "quantity",
    header: WithHeader("Quantity"),
  },
  {
    accessorKey: "start",
    header: WithHeader("Reservation date"),
    cell: (info) => {
      return `${formatDate(info.row.original.start, "dd/MM/yyyy")} from ${formatDate(info.row.original.start, "HH:mm")} to ${formatDate(info.row.original.end, "HH:mm")}`;
    }
  },
  {
    accessorKey: "status",
    header: WithHeader("Status"),
    cell: (info) => {
      return <StatusBadge status={info.row.original.status} />;
    }
  },
  {
    accessorKey: "shift",
    header: WithHeader("Shift"),
    cell: (info) => {
      return <ShiftBadge status={info.row.original.shift} />;
    }
  },
  {
    accessorKey: "area",
    header: WithHeader("Area"),
    cell: (info) => {
      return <AreaBadge status={info.row.original.area} />;
    }
  },
  {
    accessorKey: "guestNotes",
    header: "Guest Notes",
  }
]