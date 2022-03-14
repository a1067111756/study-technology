import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from 'src/module/user/entity/user.entity';
import { ToolsService } from 'src/common/service/tools.service';
import { JwtStrategy } from 'src/common/guard/auth-guard/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 注入UserEntity
    JwtModule.register({
      secret: 'mishop-jwt-secret-key', // 加密的key
      signOptions: { expiresIn: '7d' }, // token过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ToolsService, JwtStrategy],
})
export class AuthModule {}
