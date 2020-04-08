import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { UserSeedService } from './core/seeds/user-seed.service';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8000',
    optionsSuccessStatus: 200,
  });
  app.setGlobalPrefix('api');
  app.get(UserSeedService).seed();

  await app.listen(Number(process.env.SERVER_PORT));
  Logger.log(`Server running on sport ${process.env.SERVER_PORT}`);
}
bootstrap();
