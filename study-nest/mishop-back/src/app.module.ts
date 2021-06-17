import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
