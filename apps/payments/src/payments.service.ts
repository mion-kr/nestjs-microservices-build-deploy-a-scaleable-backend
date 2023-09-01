import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // 100센트 = 1달러
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
    });

    return paymentIntent;
  }
}
