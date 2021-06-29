import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false, // 将确保 JWT 没有过期的责任委托给 Passport 模块
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // token取出的位置 - 从头部的BearerToken中获取
      secretOrKey: 'mishop-jwt-secret-key', // 解密的key, 和加密key相同
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
