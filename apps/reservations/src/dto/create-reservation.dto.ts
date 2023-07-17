import { PickType } from '@nestjs/mapped-types';
import { ReservationDocument } from '../models/reservation.schema';

export class CreateReservationDto extends PickType(ReservationDocument, [
  'startDate',
  'endDate',
  'placeId',
  'invoiceId',
]) {}
