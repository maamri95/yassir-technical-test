import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, SelectLabel,
  SelectTrigger,
  SelectValue
} from './select';
import { reservationArea } from '@yassir-test/reservation';
import { AreaBadge } from './area-badge';

export interface AreaSelectProps {
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string
}
export const AreaSelect = (props: AreaSelectProps) => {
  return (
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Areas</SelectLabel>
          <SelectItem value=" ">
            All
          </SelectItem>
          {
            Array.from(reservationArea).map((status) => (
              <SelectItem key={status} value={status}>
                <AreaBadge status={status} />
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}