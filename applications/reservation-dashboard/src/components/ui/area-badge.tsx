import { ReservationArea } from '@yassir-test/reservation';
import { Badge, BadgeProps } from './badge';

export interface AreaBadgeProps {
  status: ReservationArea;
}

export const AreaBadge = (props: AreaBadgeProps) => {
  let variant:BadgeProps['variant'];
  switch (props.status) {
    case 'bar': {
      variant = 'default';
      break;
    }
    case 'main room': {
      variant = 'outline';
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