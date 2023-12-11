import { UserDocument } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    user: UserDocument,
    response: Response<any, Record<string, any>>,
  ) {
    // JWT 페이로드
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    // 쿠키 만료일시
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true, // 브라우저(javascript)에서 쿠키를 접근할 수 없도록 제한 합니다.
      expires, // jwt 토큰 만료일시와 같게 쿠키 만료시간을 설정 합니다.
    });
  }
}
