import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
  console.log(`nest服务已启动, 端口号: ${port}`)
}

bootstrap()
