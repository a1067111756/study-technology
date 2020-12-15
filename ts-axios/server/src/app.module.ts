import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MethodController } from './method/method.controller';
import { ErrorController } from './error/method.controller';
import { CancelController } from './cancel/cancel.controller';

@Module({
  imports: [],
  controllers: [AppController, MethodController, ErrorController, CancelController],
  providers: [AppService],
})
export class AppModule {}
