import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import * as path from 'path';
import { GrpcMetricsInterceptor } from './libs/common/grpc.metrics.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.AUTH_SERVICE_URL}` ,
      package: 'user_service',
      protoPath: path.join(__dirname, '../../src/_proto/auth_service.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  });
  const metriicsInterceptor = app.get(GrpcMetricsInterceptor);
  app.useGlobalInterceptors(metriicsInterceptor)
  await app.listen();
}
bootstrap();
