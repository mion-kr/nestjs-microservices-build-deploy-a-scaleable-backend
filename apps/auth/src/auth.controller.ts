import { CurrentUser, UserDocument } from '@app/common';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuards } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuards)
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response, // nest에서 제공해주는 response 대신 native express response를 사용하고 싶을 때
  ) {
    // 여기서는 쿠키로 JWT 데이터를 응답합니다.
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
