// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  // 1. Cria a aplicação NestJS 
  const app = await NestFactory.create(AppModule);

  // 2. Configura o Swagger 
  const config = new DocumentBuilder()
    .setTitle('Barbearia API')
    .setDescription('Documentação da API para a Barbearia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  console.log('=== INICIANDO SERVIDOR NESTJS ===');
  console.log(`NODE_ENV: ${configService.get<string>('NODE_ENV')}`);
  console.log(`PORT: ${port}`);


  await app.listen(port);
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`); 
}


bootstrap();