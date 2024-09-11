import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerConfig } from './common/function/swagger.function';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3001 }
  });

  SwaggerConfig( app )
  
  await app.startAllMicroservices();
  await app.listen(3000,);
}


bootstrap();
