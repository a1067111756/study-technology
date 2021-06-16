import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ToolsService } from 'src/common/service/tools.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ToolsService],
})
export class AuthModule {}
