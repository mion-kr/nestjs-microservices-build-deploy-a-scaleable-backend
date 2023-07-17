import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timestamp: Date; // 데이터 생성일시

  @Prop()
  startDate: Date; // 예약 시작

  @Prop()
  endDate: Date; // 예약 종료

  @Prop()
  userId: string; // 사용자 id

  @Prop()
  placeId: string; // 장소 id

  @Prop()
  invoiceId: string; // 청구서 id
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
