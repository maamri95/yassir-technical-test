import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, SelectLabel,
  SelectTrigger,
  SelectValue
} from './select';
import { reservationStatus } from '@yassir-test/reservation';
import { StatusBadge } from './status-badge';

export interface SelectStatusProps {
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string
}
export const StatusSelect = (props: SelectStatusProps) => {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value=" ">
            All
          </SelectItem>
          {
            Array.from(reservationStatus).map((status) => (
              <SelectItem key={status} value={status}>
                <StatusBadge status={status} />
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}