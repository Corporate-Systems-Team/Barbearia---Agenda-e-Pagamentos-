"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Barbearia API')
        .setDescription('Documentação da API para a Barbearia')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    console.log('=== INICIANDO SERVIDOR NESTJS ===');
    console.log(`NODE_ENV: ${configService.get('NODE_ENV')}`);
    console.log(`PORT: ${port}`);
    await app.listen(port);
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map