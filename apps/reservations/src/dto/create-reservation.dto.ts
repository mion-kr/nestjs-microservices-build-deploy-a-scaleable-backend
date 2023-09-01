import { CreateChargeDto } from '@app/common';
import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { ReservationDocument } from '../models/reservation.schema';

export class CreateReservationDto extends PickType(ReservationDocument, [
  'startDate',
  'endDate',
]) {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
