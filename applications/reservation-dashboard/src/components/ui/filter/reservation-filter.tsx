import { FilterProps } from './filter';
import { Reservation } from '@yassir-test/reservation';
import { StatusSelect } from '../status-select';
import { ShiftSelect } from '../shift-select';
import { AreaSelect } from '../area-select';
import { DatePicker } from '../date-picker';
import { Input } from '../input';
import { ChangeEventHandler, useState } from 'react';
type ColumnKey =
  | keyof Omit<Reservation, 'customer'>
  | 'customer_firstName'
  | 'customer_lastName';
export const ReservationFilter = <TData = Reservation, TValue = unknown>(
  props: FilterProps<TData, TValue>,
) => {
  const columnKey = props.column.id as ColumnKey;
  const firstValue = props.table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(props.column.id);
  const columnFilterValue = props.column.getFilterValue();
  console.log({
    column: props.column,
    columnFilterValue,
    firstValue,
    columnKey
  })
  const handleChangeDate = (date?: Date) => {
    props.column.setFilterValue(date);
  };
  if (columnKey === "start") {
    return (
      <DatePicker
        onSelect={handleChangeDate}
        date={columnFilterValue as Date}
      />
    );
  }
  return (
    <ReservationFilterString
      {...props}
      columnFilterValue={columnFilterValue as string}
    />
  );
};

interface ReservationFilterStringProps<TData, TValue>
  extends FilterProps<TData, TValue> {
  columnFilterValue: string;
}

const ReservationFilterString = <TData, TValue>({
  columnFilterValue,
  column,
  onChange,
}: ReservationFilterStringProps<TData, TValue>) => {
  const columnKey = column.id as ColumnKey;
  const [value, setValue] = useState<string>(columnFilterValue);
  const handleChangeSelect = (value: string) => {
    column.setFilterValue((old: string) => value);
  };
  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    onChange?.(() => column.setFilterValue(e.target.value));
  };
  switch (columnKey) {
    case 'status':
      return (
        <StatusSelect
          placeholder="Filter by Status"
          value={columnFilterValue ?? ' '}
          onChange={handleChangeSelect}
        />
      );
    case 'shift':
      return (
        <ShiftSelect
          placeholder="Filter by Shift"
          value={columnFilterValue ?? ' '}
          onChange={handleChangeSelect}
        />
      );
    case 'area':
      return (
        <AreaSelect
          placeholder="Filter by Area"
          value={columnFilterValue ?? ' '}
          onChange={handleChangeSelect}
        />
      );
    case 'customer_firstName':
    case 'customer_lastName':
      return (
        <Input
          type="text"
          value={value}
          onChange={handleChangeInput}
        />
      );
    default:
      return null;
  }
};