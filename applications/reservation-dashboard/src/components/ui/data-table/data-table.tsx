'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Header,
  SortingState,
  useReactTable,
  OnChangeFn,
  ColumnFiltersState,
  TableState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"
import { DefaultFilter } from '../filter/default-filter';
import { FilterProps } from '../filter/filter';
import { Fragment } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  FilterComponent?: React.ComponentType<FilterProps<TData, TValue>>;
  onSortingChange?: OnChangeFn<SortingState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  tableState?: Partial<TableState>;
  notifyChange?: (execChange: () => void) => void;
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                           FilterComponent=DefaultFilter,
                                           onSortingChange,
                                           onColumnFiltersChange,
                                           tableState = {},
                                           notifyChange
                                         }: DataTableProps<TData, TValue>) {
  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    onSortingChange?.(updaterOrValue)
  }
  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (updaterOrValue) => {
    onColumnFiltersChange?.(updaterOrValue)
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualFiltering: true,
    state: tableState,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange
  })

  return (
    <div className="rounded-md border">
      <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <Fragment key={headerGroup.id}>
                  <TableRow>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="items-start" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                  <TableRow>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead className="items-start py-2" key={header.id}>
                          {header.column.getCanFilter() ? (
                            <div>
                              <FilterComponent column={(header as Header<TData, TValue>).column} table={table} onChange={notifyChange}/>
                            </div>
                          ) : null}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                </Fragment>
              ))}
          </TableHeader>
          <TableBody>
                    {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              {row.getVisibleCells().map((cell) => (
                                  <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>
                              ))}
                            </TableRow>
                          ))
                      ) : (
                            <TableRow>
                              <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                              </TableCell>
                            </TableRow>
                          )
                    }
          </TableBody>
      </Table>
    </div>
  );
}
