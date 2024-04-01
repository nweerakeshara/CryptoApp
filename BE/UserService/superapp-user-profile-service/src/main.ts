import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DTOValidationException } from './config/dto.validation.exception';
import * as fs from 'fs';

const port = process.env.PORT;

async function bootstrap() {
  const appOptions = {
    cors: true,
  };
  const app = await NestFactory.create(AppModule, appOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new DTOValidationException(errors),
    }),
  );

  // app.setGlobalPrefix(process.env.GLOBAL_PREFIX, { exclude: ['/v2/api-docs'] });
  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('Food app user service')
    .setVersion('1.0')
    .setTermsOfService('Terms of services')
    .setLicense('License of API', 'API license URL')
    .setContact(
      'Stark Centric',
      'http://www.strakcentric.com/',
      'starkcentric@gmail.com',
    )
    .build();
  const options = { ignoreGlobalPrefix: true };
  const document = SwaggerModule.createDocument(app, config, options);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  await app.listen(port);
  Logger.log(`server running on : ${port}`);
  console.log('process.env.NODE_ENV--->', process.env.NODE_ENV);
  console.log('process.env.REDIS_HOST--->', process.env.REDIS_HOST);
}
bootstrap();
