import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { UserSeedService } from './core/seeds/user-seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.SERVER_PORT));
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    optionsSuccessStatus: 200,
  });
  app.setGlobalPrefix('api');
  app.get(UserSeedService).seed();
  Logger.log(`Server running on sport ${process.env.SERVER_PORT}`);
}
bootstrap();
