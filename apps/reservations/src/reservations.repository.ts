/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  protected logger: Logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel);
  }
}
