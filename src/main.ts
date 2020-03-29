import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.SERVER_PORT));
  Logger.log(`Server running on port ${process.env.SERVER_PORT}`);
}
bootstrap();
