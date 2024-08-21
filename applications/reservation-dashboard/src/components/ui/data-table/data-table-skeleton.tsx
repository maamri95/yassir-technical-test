import { ColumnDef } from '@tanstack/react-table';
import { Skeleton } from '../skeleton';
interface DataTableSkeletonProps<TData> {
  columns: ColumnDef<TData>[];
}

export function DataTableSkeleton<TData>(props: DataTableSkeletonProps<TData>) {
  const columns = props.columns.length;
  const rows = 20;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
        <tr>
          {Array(columns)
            .fill(null)
            .map((_, index) => (
              <th key={index} className="px-6 py-3 border-b border-gray-200 text-gray-700 text-left">
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {Array(rows)
          .fill(null)
          .map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array(columns)
                .fill(null)
                .map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 border-b border-gray-200">
                    <Skeleton className="h-4 w-full bg-gray-200" />
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}