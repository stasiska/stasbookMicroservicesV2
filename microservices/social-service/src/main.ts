import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.SOCIAL_SERVICE_URL}:${process.env.SOCIAL_SERVICE_PORT}`,
      package: 'social_service',
      protoPath: path.join(__dirname, '../src/_proto/social_service.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  });

  console.log(`started on port ${process.env.SOCIAL_SERVICE_URL} ${process.env.SOCIAL_SERVICE_PORT}`)
  await app.listen();
}
bootstrap();
