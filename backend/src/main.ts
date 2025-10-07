import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  console.log('=== INICIANDO SERVIDOR NESTJS ===');
  console.log(`NODE_ENV: ${configService.get<string>('NODE_ENV')}`);
  console.log(`PORT: ${port}`);

  await app.listen(port);
  console.log(`Servidor rodando em http://localhost:${port}`);
}
bootstrap();
