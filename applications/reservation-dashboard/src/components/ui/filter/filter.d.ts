import { Column, Table } from '@tanstack/react-table';

export interface FilterProps<TData, TValue=unknown> {
  column: Column<TData, TValue>
  table: Table<TData>
  onChange?: (execChange: () => void) => void
}
