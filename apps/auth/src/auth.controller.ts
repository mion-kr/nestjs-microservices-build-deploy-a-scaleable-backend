import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user-decorator';
import { LocalAuthGuards } from './guards/local-auth.guards';
import { UserDocument } from './users/modesl/user.schema';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuards)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({passthrough: true})
  ) {}
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
