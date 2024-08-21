import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, SelectLabel,
  SelectTrigger,
  SelectValue
} from './select';
import { reservationShifts, reservationStatus } from '@yassir-test/reservation';
import { ShiftBadge } from './shift-badge';

export interface ShiftSelectProps {
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string
}
export const ShiftSelect = (props: ShiftSelectProps) => {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Shifts</SelectLabel>
          <SelectItem value=" ">
            All
          </SelectItem>
          {
            Array.from(reservationShifts).map((status) => (
              <SelectItem key={status} value={status}>
                <ShiftBadge status={status} />
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}