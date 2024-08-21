import { ReservationStatus } from '@yassir-test/reservation';
import { Badge, BadgeProps } from './badge';

export interface StatusBadgeProps {
  status: ReservationStatus;
}

export const StatusBadge = (props: StatusBadgeProps) => {
  let variant:BadgeProps['variant'];
  switch (props.status) {
    case 'confirmed': {
      variant = 'default';
      break;
    }
    case 'seated': {
      variant = 'outline';
      break;
    }
    case 'not confirmed': {
      variant = 'destructive';
      break;
    }
    case 'checked out': {
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