import { ReservationShift } from '@yassir-test/reservation';
import { Badge, BadgeProps } from './badge';

export interface ShiftBadgeProps {
  status: ReservationShift;
}

export const ShiftBadge = (props: ShiftBadgeProps) => {
  let variant:BadgeProps['variant'];
  switch (props.status) {
    case 'breakfast': {
      variant = 'default';
      break;
    }
    case 'lunch': {
      variant = 'outline';
      break;
    }
    case 'dinner': {
      variant = 'secondary';
      break;
    }
    default: {
      variant = 'secondary';
    }
  }
  return (
    <Badge variant={variant}>{props.status}</Badge>
  )
};