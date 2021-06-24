import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ToolsService } from 'src/common/service/tools.service';
import { JwtStrategy } from './jwt.strategy';

import { User } from '../../entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'mishop-jwt-secret-key',
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ToolsService, JwtStrategy],
})
export class AuthModule {}
