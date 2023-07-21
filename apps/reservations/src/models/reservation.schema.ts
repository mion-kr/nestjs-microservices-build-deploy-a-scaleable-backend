import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timestamp: Date; // 데이터 생성일시

  @IsDate()
  @Type(() => Date) // class-transformer
  @Prop()
  startDate: Date; // 예약 시작

  @IsDate()
  @Type(() => Date) // class-transformer
  @Prop()
  endDate: Date; // 예약 종료

  @Prop()
  userId: string; // 사용자 id

  @IsString()
  @IsNotEmpty()
  @Prop()
  placeId: string; // 장소 id

  @IsString()
  @IsNotEmpty()
  @Prop()
  invoiceId: string; // 청구서 id
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
