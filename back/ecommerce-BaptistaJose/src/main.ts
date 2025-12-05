import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(LoggerMiddleware);
    const swaggerConfig = new DocumentBuilder()
    .setTitle('My API demo nestjs')
    .setDescription('Esta es una API E-commerce creada con NestJS para ser empleada en la especialización de backend de Henry.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api',app, document)
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
