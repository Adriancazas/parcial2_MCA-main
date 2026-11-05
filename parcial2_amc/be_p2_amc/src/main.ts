import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Permite que el frontend (otro puerto) consuma la API
  app.enableCors();

  // Valida automáticamente los DTOs y descarta campos no declarados
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger en http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('Agenda y boletaje de eventos culturales')
    .setDescription('API REST de recintos y eventos culturales')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);
}
bootstrap();
