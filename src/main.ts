import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from './core/config/env';
import { GlobalExceptionFilter } from './core/shared/errors/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API usando NestJS, Prisma')
    .setVersion('1.0')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(env.PORT ?? 3000);
  console.log('🚀 HTTP server running on http://localhost:3000');
  console.log('📄 Docs available at http://localhost:3000/docs');
}
bootstrap();
