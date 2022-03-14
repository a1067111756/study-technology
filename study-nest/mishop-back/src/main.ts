import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import GlobalConfig from './config/global.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 注册应用
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'], // 日志配置
  });

  // 初始化全局配置
  GlobalConfig.install(app);

  // 启动应用
  await app.listen(3000);
}

bootstrap();
