import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import csrf from 'als-csrf';
import { AuditLogs_Medical } from './entitys/auditLogs_Medical.entity';
async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 app.use(helmet());
 // eslint-disable-next-line @typescript-eslint/no-unsafe-call
 app.use(csrf());
 app.enableCors();
 app.useGlobalPipes(
  new ValidationPipe({
   transform: true,
   whitelist: true,
   forbidNonWhitelisted: true,
   transformOptions: { enableImplicitConversion: true },
  }),
 );
 const config = new DocumentBuilder()
  .setTitle('nest practice')
  .addBearerAuth()
  .build();
 const document = SwaggerModule.createDocument(app, config, {
  extraModels: [AuditLogs_Medical], // مدل‌های اضافی
 });
 SwaggerModule.setup('/documentation', app, document, {
  swaggerOptions: {
   persistAuthorization: true,
  },
 });
 await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
