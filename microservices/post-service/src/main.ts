import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { GrpcMetricsInterceptor } from './libs/common/grpc.metrics.interceptor';
import { CustomLogger } from './libs/common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.GRPC,
    options: {
      url: `${process.env.POST_SERVICE_URL}:${process.env.POST_SERVICE_PORT}`,
      package: 'post_service',
      protoPath: path.join(__dirname, '../src/_proto/post_service.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    },
    bufferLogs: true
  });
  const metriicsInterceptor = app.get(GrpcMetricsInterceptor);
  app.useGlobalInterceptors(metriicsInterceptor)
  app.useLogger(new CustomLogger());
  //app.useGlobalFilters(new GrpcExceptionFilter())
  console.log(`'started on port ${process.env.POST_SERVICE_URL}'`)
  await app.listen();
}
bootstrap();
