import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SwaggerConfig } from './common/function/swagger.function';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get( ConfigService )
  const http_port = config.get<string>( 'HTTP_PORT' )
  const microservice_port = config.get<string>( 'MICROSERVICE_PORT' )
  const host = config.get<string>( 'HOST' )

  const microservice = app.connectMicroservice({
    transport: Transport.TCP,
    options: { host, port: microservice_port }
  });

  SwaggerConfig( app )
  
  await app.startAllMicroservices();
  await app.listen(http_port,()=>{
    console.log(`server: ${host}:${http_port}`);
    console.log(`swagger: ${host}:${http_port}/doc`);
    
  });
}


bootstrap();
