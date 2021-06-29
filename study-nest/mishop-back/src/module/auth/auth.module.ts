import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ToolsService } from 'src/common/service/tools.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/guard/auth-guard/jwt.strategy';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 注入UserEntity
    JwtModule.register({
      secret: 'mishop-jwt-secret-key', // 加密的key
      signOptions: { expiresIn: '1200s' }, // token过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ToolsService, JwtStrategy],
})
export class AuthModule {}
