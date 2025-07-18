import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middleware/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions:{
      enableImplicitConversion: true,
    }
  }))
  app.use(LoggerGlobal)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
