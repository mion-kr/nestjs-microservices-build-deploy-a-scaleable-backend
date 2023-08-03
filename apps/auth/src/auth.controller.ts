import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user-decorator';
import { LocalAuthGuards } from './guards/local-auth.guards';
import { UserDocument } from './users/modesl/user.schema';

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
}
