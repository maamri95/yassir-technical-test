import { Reservation } from '@yassir-test/reservation';
import { useQuery } from '@tanstack/react-query';
import { GetReservationsQuery } from '../queries/reservations.query';
import {
  ColumnFiltersState, OnChangeFn,
  SortingState,
  TableState
} from '@tanstack/react-table';
import { useState } from 'react';
import { debounce } from '../utils/debounce';

export interface UseReservationsViewModelReturn {
  data: Reservation[];
  isFetching: boolean;
  onSortingChange: OnChangeFn<SortingState>;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  onResetTableState: () => void;
  tableState?: Partial<TableState>;
  hasTableState: boolean;
  notifyChange: (execChange: () => void) => void;
}
export type UseReservationsViewModel = () => UseReservationsViewModelReturn;
export const useReservationsViewModel: UseReservationsViewModel = () => {
  const [tableState, setTableState] = useState<Partial<TableState>>()
  const {data, isFetching, refetch} = useQuery(GetReservationsQuery(window.location.search));
  const onResetTableState = () => {
    setTableState(undefined)
    window.history.replaceState(null, "", "")
    refetch({
      cancelRefetch: true
    })
  }
  const onSortingChange: UseReservationsViewModelReturn["onSortingChange"] = (updaterOrValue) => {
    setTableState((state) => {
      const newSortingState = typeof updaterOrValue === "function" ? updaterOrValue(state?.sorting ?? []) : updaterOrValue
      const searchParams = new URLSearchParams(window.location.search)
      newSortingState.forEach((sort) => {
        const key = sort.id.replace(/customer_/, "")
        searchParams.set("sort", `${sort.desc ? "-" : ""}${key}`)
      })
      window.history.replaceState(null, "", `?${searchParams.toString()}`)
      refetch({
        cancelRefetch: true
      })
      return {
        ...state,
        sorting: newSortingState
      }
    })
  }
  const onColumnFiltersChange: UseReservationsViewModelReturn["onColumnFiltersChange"] = (updaterOrValue) => {
    setTableState((state) => {
      const newColumnFiltersState = typeof updaterOrValue === "function" ? updaterOrValue(state?.columnFilters ?? []) : updaterOrValue
      const searchParams = new URLSearchParams(window.location.search)
      if (newColumnFiltersState.length === 0) {
        window.history.replaceState(null, "", "")
        return
      }
      newColumnFiltersState.forEach((filter) => {
        if (filter.id === "start") {
          searchParams.set(`filter[${filter.id}]`, (filter.value as Date).toISOString())
        }else if (!filter.value || filter.value === " ") {
          searchParams.delete(`filter[${filter.id}]`)
        }else {
          searchParams.set(`filter[${filter.id}]`, String(filter.value))
        }
      })
      window.history.replaceState(null, "", `?${searchParams.toString()}`)
      refetch({
        cancelRefetch: true
      })
      return {
        ...state,
        columnFilters: newColumnFiltersState
      }
    })
  }
  return {
    data: data ?? [],
    isFetching: isFetching,
    onSortingChange,
    onColumnFiltersChange,
    tableState: tableState,
    onResetTableState,
    hasTableState: !!tableState,
    notifyChange: debounce((execChange) => {
      execChange()
    }, 500)
  }
}