import { join } from 'path';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidatePipe } from './common/pipe/validate.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

import session = require('express-session');
import cookieParser = require('cookie-parser');

async function bootstrap() {
  // 注册应用
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'], // 日志配置
    cors: true, // 跨域配置
  });

  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 配置cookie
  app.use(cookieParser('mishop-cookie'));

  // 配置session
  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
      rolling: true,
    }),
  );

  // 全局拦截器注册
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 全局管道注册
  app.useGlobalPipes(new ValidatePipe());

  // 启动应用
  await app.listen(3000);
}
bootstrap();
