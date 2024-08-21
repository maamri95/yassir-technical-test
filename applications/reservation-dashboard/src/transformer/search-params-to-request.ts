import { Transformer } from '@yassir-test/transformer';
import {
  GetReservationsRequest, reservationArea,
  ReservationArea,
  ReservationShift, reservationShifts,
  ReservationSort, reservationStatus,
  ReservationStatus
} from '@yassir-test/reservation';

export class SearchParamsToRequest extends Transformer<URLSearchParams, GetReservationsRequest> {
  transform(from: URLSearchParams): GetReservationsRequest {
    return {
      sort: this.parseSort(from.get('sort')),
      date: this.parseDate(from.get('filter[start]')),
      status: this.parseStatus(from.get('filter[status]')),
      shift: this.parseShift(from.get('filter[shift]')),
      area: this.parseArea(from.get('filter[area]')),
      firstName: from.get('filter[customer_firstName]') ?? undefined,
      lastName: from.get('filter[customer_lastName]') ?? undefined,
    }
  }
  private parseSort(sort: string | null): ReservationSort | undefined {
    if (!sort) return;
    const key = sort.replace(/^-/, '');
    if (this.isKey(key)) {
      return sort as ReservationSort;
    }
  }
  private isKey(key: string): key is ReservationSort {
    return ['start', 'status', 'shift', 'area', 'firstName', 'lastName', 'quantity'].includes(key);
  }
  private parseStatus(status: string | null): ReservationStatus | undefined {
    if (!status) return;
    if (this.isValidStatus(status)) {
      return status as ReservationStatus;
    }
  }
  private parseDate(date: string | null): Date | undefined {
    if (!date) return;
    return new Date(date);
  }
  private parseShift(shift: string | null): ReservationShift | undefined {
    if (!shift) return;
    if (this.isValidShift(shift)) {
      return shift as ReservationShift;
    }
  }
  private parseArea(area: string | null): ReservationArea | undefined {
    if (!area) return;
    if (this.isValidArea(area)) {
      return area as ReservationArea;
    }
  }
  private isValidArea(area: string): area is ReservationArea {
    return reservationArea.has(area as ReservationArea);
  }
  private isValidShift(shift: string): shift is ReservationShift {
    return reservationShifts.has(shift as ReservationShift);
  }
  private isValidStatus(status: string): status is ReservationStatus {
    return reservationStatus.has(status as ReservationStatus);
  }
}