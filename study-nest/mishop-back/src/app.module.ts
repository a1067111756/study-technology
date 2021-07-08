import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthGuard } from './common/guard/auth-guard/jwt.auth.guard';
import { RoleModule } from './module/role/role.module';

@Module({
  imports: [AuthModule, RoleModule, TypeOrmModule.forRoot()],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
